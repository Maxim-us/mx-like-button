<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

/*
* Require template for admin panel
*/
function mxmlb_require_template_admin( $file ) {

	require_once MXMLB_PLUGIN_ABS_PATH . 'includes\admin\templates\\' . $file;

}

/*
* Require template for frontend part
*/
function mxmlb_include_template_frontend( $file ) {

	include MXMLB_PLUGIN_ABS_PATH . 'includes\frontend\templates\\' . $file;

}

/*
* Select data likes
*/
function mxmlb_select_data_likes() {

	global $wpdb;

	$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[1];

	$get_data_likes = $wpdb->get_results( "SELECT id, post_id, user_ids FROM $table_name ORDER BY id ASC" );

	return $get_data_likes;

}

/*
* Select data likes by post id
*/
function mxmlb_select_data_likes_by_post_id( $post_id ) {

	global $wpdb;

	$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[1];

	$get_data_likes = $wpdb->get_row( "SELECT user_ids FROM $table_name WHERE post_id = $post_id"  );

	return $get_data_likes;

}

/*
* Select data like options
*/
function mxmlb_like_options( $option_name ) {

	global $wpdb;

	$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[0];

	$option_value = $wpdb->get_row( "SELECT mx_like_option_value FROM $table_name WHERE mx_like_option_name = '$option_name'" );

	return $option_value;

}