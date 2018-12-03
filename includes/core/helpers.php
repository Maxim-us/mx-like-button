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

/*
* Display mx_like_button for posts
*/
function mxmlb_display_mx_like_button_template() {

	$post_type = get_post_type( get_the_ID() );

	$html = '<div class="mx-like-box" id="mx-like-button-' . get_the_ID() . '"  data-post-type="' . $post_type . '">';

	$html .= '<div class="mx-like-place">';

		$html .= '<div class="mx-like-place-faces">';

			$html .= '<span class="mx-like" title="0">like</span>';
			$html .= '<span class="mx-heart" title="0">heart</span>';
			$html .= '<span class="mx-laughter" title="0">laughter</span>';
			$html .= '<span class="mx-wow" title="0">wow</span>';
			$html .= '<span class="mx-sad" title="0">sad</span>';
			$html .= '<span class="mx-angry" title="0">angry</span>';
		
		$html .= '</div>';
		
		$html .= '<div class="mx-like-place-count mx-display-none">0</div>';

	$html .= '</div>';

	$html .= '<button class="mx-like-main-button" data-like-type="like">';
		$html .= '<span>like</span>';
	$html .= '</button>';

	$html .= '<div class="mx-like-other-faces">';
		$html .= '<button class="mx-like-face-like" data-like-type="like">';
			$html .= '<span>like</span>';
		$html .= '</button>';
		$html .= '<button class="mx-like-face-heart" data-like-type="heart">';
			$html .= '<span>heart</span>';
		$html .= '</button>';
		$html .= '<button class="mx-like-face-laughter" data-like-type="laughter">';		
			$html .= '<span>laughter</span>';
		$html .= '</button>';
		$html .= '<button class="mx-like-face-wow" data-like-type="wow">';
			$html .= '<span>wow</span>';
		$html .= '</button>';
		$html .= '<button class="mx-like-face-sad" data-like-type="sad">';
			$html .= '<span>sad</span>';
		$html .= '</button>';
		$html .= '<button class="mx-like-face-angry" data-like-type="angry">';
			$html .= '<span>angry</span>';
		$html .= '</button>';
	$html .= '</div>';

	$html .= '</div>';

	return $html;

}