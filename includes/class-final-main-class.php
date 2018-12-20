<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

final class MXMLBMXLikeButton
{

	/*
	* MXMLBMXLikeButton constructor
	*/
	public function __construct()
	{

		$this->define_constants();		
		
		add_action( 'init', array( $this, 'mxmlb_include' ) );

	}

	/*
	* Define MXMLB constants
	*/
	public function define_constants()
	{

		$this->mxmlb_define( 'MXMLB_TABLE_SLUGS', array( 'mx_like_options', 'mx_like_store' ) );

		// include php files
		$this->mxmlb_define( 'MXMLB_PLUGIN_ABS_PATH', dirname( MXMLB_PLUGIN_PATH ) . '/' );

		// version
		$this->mxmlb_define( 'MXMLB_PLUGIN_VERSION', '1.1' ); // Must be replaced before production on for example '1.1'


	}

	/*
	* Incude required core files
	*/
	public function mxmlb_include()
	{
	
		// Helpers
		require_once MXMLB_PLUGIN_ABS_PATH . 'includes/core/helpers.php';

		
		// check, if current user is login
		if( is_user_logged_in() ) {

			// Part of the Frontend
			require_once MXMLB_PLUGIN_ABS_PATH . 'includes/frontend/class-frontend-main.php';

		}

		// Part of the Administrator
		require_once MXMLB_PLUGIN_ABS_PATH . 'includes/admin/class-admin-main.php';

		/*
		* CPT class
		* If you do not need CPT, delete the line below
		*/
		// require_once MXMLB_PLUGIN_ABS_PATH . 'includes/admin/class-cpt-talk.php';

	}

	// Define function
	private function mxmlb_define( $mame, $value )
	{

		if( ! defined( $mame ) )
		{

			// if $value is array
			if( is_array( $value ) ) {

				define( $mame, serialize( $value ) );

			} else {

				define( $mame, $value );

			}			

		}

	}

	public function mxmlb_basic_pugin_function()
	{
		// Basis functions
		require_once MXMLB_PLUGIN_ABS_PATH . 'includes/class-basis-plugin-class.php';

	}


}