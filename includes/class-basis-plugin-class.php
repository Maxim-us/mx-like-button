<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;


class MXMLBBasisPluginClass
{

	private static $table_slugs = MXMLB_TABLE_SLUGS;

	public static function activate()
	{

		// set option for rewrite rules CPT
		self::create_option_for_activation();

		// Create table
		global $wpdb;

		// Table names
		foreach ( self::$table_slugs as $table_slug) {

			$table_name = $wpdb->prefix . $table_slug;

			if ( $wpdb->get_var( "SHOW TABLES LIKE '" . $table_name . "'" ) !=  $table_name )
			{

				/*
				* check name of table
				*/
				// check 'mx_like_options' name
				if( $table_slug == 'mx_like_options' )
				{

					$sql = "CREATE TABLE IF NOT EXISTS `$table_name`
					(
						`id` int(11) NOT NULL AUTO_INCREMENT,
						`option1` varchar(40) NOT NULL,
						PRIMARY KEY (`id`)
					) ENGINE=MyISAM DEFAULT CHARSET=$wpdb->charset AUTO_INCREMENT=1;";

					$wpdb->query( $sql );

					// Insert dummy data
					$wpdb->insert(

						$table_name,

						array(
							'option1' => 'Some option',
						)

					);

				} // ... check 'mx_like_options' name

				// check 'mx_like_store' name
				if( $table_slug == 'mx_like_store' )
				{

					$sql = "CREATE TABLE IF NOT EXISTS `$table_name`
					(
						`id` int(11) NOT NULL AUTO_INCREMENT,
						`post_id` int(11) NOT NULL,
						`user_ids` longtext NOT NULL,
						PRIMARY KEY (`id`)
					) ENGINE=MyISAM DEFAULT CHARSET=$wpdb->charset AUTO_INCREMENT=1;";

					$wpdb->query( $sql );

				} // ... check 'mx_like_store' name
				
			}

		}

	}

	public static function deactivate()
	{

		// Rewrite rules
		flush_rewrite_rules();

	}

	/*
	* This function sets the option in the table for CPT rewrite rules
	*/
	public static function create_option_for_activation()
	{

		add_option( 'mxmlb_flush_rewrite_rules', 'go_flush_rewrite_rules' );

	}

}