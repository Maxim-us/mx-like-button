<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class MXMLBFrontEndMain
{

	/*
	* Registration of styles and scripts
	*/
	public function mxmlb_register()
	{

		add_action( 'wp_enqueue_scripts', array( $this, 'mxmlb_enqueue' ) );

	}

		public function mxmlb_enqueue()
		{

			wp_enqueue_style( 'mxmlb_font_awesome', MXMLB_PLUGIN_URL . 'assets/font-awesome-4.6.3/css/font-awesome.min.css' );

			wp_enqueue_style( 'mxmlb_style', MXMLB_PLUGIN_URL . 'includes/frontend/assets/css/style.css', array( 'mxmlb_font_awesome' ), MXMLB_PLUGIN_VERSION, 'all' );

			wp_enqueue_script( 'mxmlb_script', MXMLB_PLUGIN_URL . 'includes/frontend/assets/js/script.js', array( 'jquery' ), MXMLB_PLUGIN_VERSION, false );

			// localize like object
			wp_localize_script( 'mxmlb_script', 'mxmlb_object_likes', 'dummy' );

			// localize current user data
			wp_localize_script( 'mxmlb_script', 'mxmlb_current_user_data', array( 'id' => get_current_user_id() ) );


		}

	/*
	* Hooks. Creation like button
	*/
	public function mxmlb_show_like_button_hooks()
	{

		add_action( 'bp_activity_entry_meta', array( $this, 'mxmlb_show_like_button_activity' ) );

	}

		public function mxmlb_show_like_button_activity()
		{

			mxmlb_include_template_frontend( 'mx-like-box.php' );

		}

}

// Initialize
$initialize_class = new MXMLBFrontEndMain();

// Apply scripts and styles
$initialize_class->mxmlb_register();

// show like button
$initialize_class->mxmlb_show_like_button_hooks();

