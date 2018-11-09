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

			// var_dump( $table_name );

			// $wpdb->update(

			// 	$table_name, 
			// 	array(
			// 		'option1' => $clean_string,
			// 	), 
			// 	array( 'id' => 1 ), 
			// 	array( 
			// 		'%s'
			// 	)

			// );

		}

}

// New instance
new MXMLBDataBaseTalk();