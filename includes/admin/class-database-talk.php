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

		$this->mxmlb_observe_update_data();

	}

	/*
	* Observe function
	*/
	public function mxmlb_observe_update_data()
	{

		add_action( 'wp_ajax_mxmlb_update', array( $this, 'prepare_update_script' ) );

	}

	/*
	* Prepare for data updates
	*/
	public function prepare_update_script()
	{
		
		// Checked POST nonce is not empty
		if( empty( $_POST['nonce'] ) ) wp_die( '0' );

		// Checked or nonce match
		if( wp_verify_nonce( $_POST['nonce'], 'mxmlb_nonce_request' ) ){

			// Update data
			$this->update_script( $_POST['mxmlb_some_string'] );		

		}

		wp_die();

	}

		// Update data
		public function update_script( $string )
		{

			$clean_string = str_replace( '\\', '', esc_html( $string ) );

			global $wpdb;

			$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[0];

			$wpdb->update(

				$table_name, 
				array(
					'option1' => $clean_string,
				), 
				array( 'id' => 1 ), 
				array( 
					'%s'
				)

			);

		}

}

// New instance
new MXMLBDataBaseTalk();