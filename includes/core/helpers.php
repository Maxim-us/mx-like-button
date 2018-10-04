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
* Select data
*/
function mxmlb_select_script() {

	global $wpdb;

	$table_name = $wpdb->prefix . MXMLB_TABLE_SLUGS[0];

	$get_scripts_string = $wpdb->get_row( "SELECT option1 FROM $table_name WHERE id = 1" );

	return $get_scripts_string->option1;

}