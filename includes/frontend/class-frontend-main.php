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

		}

}

// Initialize
$initialize_class = new MXMLBFrontEndMain();

// Apply scripts and styles
$initialize_class->mxmlb_register();