<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class MXMLBDataBaseTalk
{

	/*
	* MXMLBDataBaseTalk constructor
	*/
	public function __construct()
	{

		$this->mxmlb_observe_uploading_image();

	}

	/*
	* Observe function
	*/
	public function mxmlb_observe_uploading_image()
	{

		add_action( 'wp_ajax_mxmlb_upload_img_for_like', array( $this, 'prepare_uploading_image' ) );

	}

	/*
	* Prepare for data updates
	*/
	public function prepare_uploading_image()
	{
		
		// Checked POST nonce is not empty
		if( empty( $_POST['nonce'] ) ) wp_die( '0' );

		// Checked or nonce match
		if( wp_verify_nonce( $_POST['nonce'], 'mxmlb_admin_nonce_request' ) ){

			// save image path
			$this->uploading_image_path( $_POST );

		}

		wp_die();

	}

		// Update data
		public function uploading_image_path( $_post_ )
		{

			global $wpdb;

			$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[0];

			$upload_images_serialize = mxmlb_like_options( '_upload_images' )->mx_like_option_value;

			// options
			$upload_images_array = maybe_unserialize( $upload_images_serialize );

			// $_POST
			// type of like
			$type_of_like = $_post_['type_of_like'];

			// $_FILE
			$_file_ = $_FILES['file'];

			// upload file
			if ( ! function_exists( 'wp_handle_upload' ) ) {

				require_once( ABSPATH . 'wp-admin/includes/file.php' );

			}
		
			$overrides = array(
				'test_form' => false,
				'unique_filename_callback' => array( $this, 'mx_change_img_name' ) 
			);

			$movefile = wp_handle_upload( $_file_, $overrides );

			if ( $movefile && empty($movefile['error']) ) {				

				$img_url = $movefile['url'];

				// cut path into format /wp-content/uploads/2018/11/1542189679.png"
				$matches = array();

				preg_match('/(\wp-content\/.*)/', $img_url, $matches);

				$cut_img_url = $matches[0];

				// update array
				foreach ( $upload_images_array as $key => $value ) {

					if( $type_of_like == $key ) {

						$upload_images_array[$key] = $cut_img_url;

					}
					
				}

				$upload_images_array = serialize( $upload_images_array );

				$wpdb->update(

					$table_name, 
					array(
						'mx_like_option_value' => $upload_images_array,
					), 
					array( 'mx_like_option_name' => '_upload_images' ), 
					array( 
						'%s'
					)

				);

				echo 1;

			} else {

				var_dump( $movefile );

			}			

		}

		// change img name
		public function mx_change_img_name( $dir, $name, $ext ) {

			$new_name = time();

			return $new_name.$ext;

		}

}

// New instance
new MXMLBDataBaseTalk();