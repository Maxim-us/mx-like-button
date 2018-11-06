<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class MXMLBFrontEndMain
{

	public $plugin_name;

	/*
	* MXMLBAdminMain constructor
	*/
	public function __construct()
	{

		$this->plugin_name = MXMLB_PLUGN_BASE_NAME;

		$this->mxmlb_include();

		// test
		// add_action( 'wp_footer', array( $this, 'mxmlb_get_data_of_likes' ) );

	}

	/*
	* Include the necessary basic files for the frontend panel
	*/
	public function mxmlb_include()
	{

		// require database-talk class
		require_once MXMLB_PLUGIN_ABS_PATH . 'includes\frontend\class-database-talk.php';

	}

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
			wp_localize_script( 'mxmlb_script', 'mxmlb_localize', array(

				'mxmlb_object_likes' 		=> $this->mxmlb_get_data_of_likes(),
				'mxmlb_current_user_data' 	=> array( 'id' => get_current_user_id() ),
				'ajaxurl' 					=> admin_url( 'admin-ajax.php' ),
				'mxmlb_nonce' 				=> wp_create_nonce( 'mxmlb_nonce_request' )

			) );

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

	/*
	* Get data of likes
	*/
	public function mxmlb_get_data_of_likes()
	{

		// array(
		// 	1 => array(
		// 		2 => array(
		// 			'typeOfLike' => 'like'
		// 		)
		// 	)
		// )

		$array_likes_data = 0;

		if( count( mxmlb_select_data_likes() ) >= 1 ) {

			// main array
			$array_likes_data = array();

			// each array
			foreach ( mxmlb_select_data_likes() as $key => $value ) {

				// 
				$array_likes_data[$value->post_id] = array();			

				// user ids data
				$user_ids = maybe_unserialize( $value->user_ids );				

				// push user to array
				foreach ( $user_ids as $_key => $_value ) {
					
					$new_user_like = array(

						$_key => array(

							'typeOfLike' => $_value['typeOfLike']

						)

					);

					$array_likes_data[$value->post_id] = $array_likes_data[$value->post_id] + $new_user_like;

				}
			
			}			

		}

		// var_dump( $array_likes_data );

		return $array_likes_data;
	}

}

// Initialize
$initialize_class = new MXMLBFrontEndMain();

// Apply scripts and styles
$initialize_class->mxmlb_register();

// show like button
$initialize_class->mxmlb_show_like_button_hooks();

