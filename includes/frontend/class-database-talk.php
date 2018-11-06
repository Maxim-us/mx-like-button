<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class MXMLBDataBaseTalkFrontend
{

	/*
	* MXMLBDataBaseTalkFrontend constructor
	*/
	public function __construct()
	{

		$this->mxmlb_observe_create_like_obj();

	}

	/*
	* Observe function
	*/
	public function mxmlb_observe_create_like_obj()
	{

		// motion like object
		add_action( 'wp_ajax_mxmlb_mounting_like_obj', array( $this, 'prepare_mounting_like_obj' ) );

		// delete like object
		add_action( 'wp_ajax_mxmlb_delete_like_obj', array( $this, 'prepare_delete_like_obj' ) );
		
	}

	/*
	* Prepare for data updates
	*/
	public function prepare_mounting_like_obj()
	{
		
		// Checked POST nonce is not empty
		if( empty( $_POST['nonce'] ) ) wp_die( '0' );

		// Checked or nonce match
		if( wp_verify_nonce( $_POST['nonce'], 'mxmlb_nonce_request' ) ) {

			// db query
			global $wpdb;

			$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[1];

			$post_id = intval( $_POST['mxmlb_object_likes']['post_id'] );

			// if post id is exists
			$post_count = $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM $table_name WHERE post_id = $post_id"  ) );

			if( $post_count == 0 ) {

				// Create data
				$this->crate_like_obj( $_POST['mxmlb_object_likes'] );

			} else {

				// Update data
				$this->update_like_obj( $_POST['mxmlb_object_likes'], $post_id );	

			}			

		}

		wp_die();

	}

		// create data
		public function crate_like_obj( $object_likes )
		{
			
			// db query
			global $wpdb;

			$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[1];

			// check user choise
			$user_ids = array(
				$object_likes['user_ids']['id'] => array( 'typeOfLike' => $object_likes['user_ids']['typeOfLike'] )
			);			

			$user_ids = serialize( $user_ids );

			// insert
			$wpdb->insert(

				$table_name, 
				array(
					'post_id' 	=> $object_likes['post_id'],
					'user_ids' 	=> $user_ids
				),
				array(
					'%d',
					'%s'
				)

			);

		}

		// update data
		public function update_like_obj( $object_likes, $post_id )
		{

			// db query
			global $wpdb;

			$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[1];

			// select data
			$user_ids_row = $wpdb->get_row( "SELECT user_ids FROM $table_name WHERE post_id = $post_id"  );

			// get current user
			$get_current_user_id = intval( $object_likes['user_ids']['id'] );

			// get user_ids from database
			$array_of_user_ids = maybe_unserialize( $user_ids_row->user_ids );

			// key_user_not_exists is using to check if current user are liked this post
			$key_user_not_exists = false;

			// find current user in existing array
			foreach ( $array_of_user_ids as $key => $value) {

				if( $key == $get_current_user_id ) {

					// function of update user choise
					$array_of_user_ids[$key]['typeOfLike'] = $object_likes['user_ids']['typeOfLike'];

					$key_user_not_exists = true;

				}
				
			}

			// add new like to the database
			if( $key_user_not_exists == false ) {				

				$array_of_user_ids[$get_current_user_id] = array(

					'typeOfLike' => $object_likes['user_ids']['typeOfLike']

				);

			}

			// serialize data
			$user_ids = serialize( $array_of_user_ids );

			// update data
			$wpdb->update( 
				$table_name, 
				array( 
					'user_ids' 	=> $user_ids
				), 
				array( 'post_id' => $post_id ),
				array( 
					'%s'
				) 
			);

		}

	/*
	* Prepare for data delete
	*/
	public function prepare_delete_like_obj()
	{

		// Checked POST nonce is not empty
		if( empty( $_POST['nonce'] ) ) wp_die( '0' );

		// Checked or nonce match
		if( wp_verify_nonce( $_POST['nonce'], 'mxmlb_nonce_request' ) ) {
			
			$this->delete_like_obj( $_POST );

		}		

	}

		// delete data
		public function delete_like_obj( $_post_ )
		{

			// post id
			$post_id = $_post_['mxmlb_object_likes']['post_id'];

			// user id
			$user_id = intval( $_post_['mxmlb_object_likes']['user_ids']['id'] );

			// db query
			global $wpdb;

			$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[1];

			// select data
			$user_ids_row = $wpdb->get_row( "SELECT user_ids FROM $table_name WHERE post_id = $post_id"  );

			// get current user
			$get_current_user_id = intval( $_post_['mxmlb_object_likes']['user_ids']['id'] );			

			// get user_ids from database
			$array_of_user_ids = maybe_unserialize( $user_ids_row->user_ids );
			
			// check current user
			if( $user_id == $get_current_user_id ) {

				// delete like object by user id
				unset( $array_of_user_ids[$user_id] );				

				// serialize data
				$user_ids = serialize( $array_of_user_ids );

				if( count( $array_of_user_ids ) == 0 ) {

					// delete row from database
					$wpdb->delete( $table_name,
						array( 'post_id' => $post_id )
					);

				} else {					

					// update like obj
					$wpdb->update( 
						$table_name, 
						array( 
							'user_ids' 	=> $user_ids
						), 
						array( 'post_id' => $post_id ),
						array( 
							'%s'
						) 
					);

				}				

			}

		}

}

// New instance
new MXMLBDataBaseTalkFrontend();