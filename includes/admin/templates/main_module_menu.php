<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

?>

<h1><?php echo __( 'MX Like Button settings', 'mxmlb-domain' ); ?></h1>

<nav class="mxmlb_admin_nav_bar">
	
	<ul>
		<li class="<?php echo $_GET['p'] == 'main' || $_GET['p'] == NULL ? 'mxmlb_active_item_menu' : ''; ?>">
			<a href="admin.php?page=mxmlb-mx-like-button-menu&p=main"><?php echo __( 'Main settings', 'mxmlb-domain' ); ?></a>			
		</li>
		<li class="<?php echo $_GET['p'] == 'change_buttons' ? 'mxmlb_active_item_menu' : ''; ?>">
			<a href="admin.php?page=mxmlb-mx-like-button-menu&p=change_buttons"><?php echo __( 'Change buttons', 'mxmlb-domain' ); ?></a>			
		</li>
	</ul>

</nav>