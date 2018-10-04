jQuery( document ).ready( function( $ ){

	$( '#mxmlb_form_update' ).on( 'submit', function( e ){

		e.preventDefault();

		var nonce = $( this ).find( '#mxmlb_wpnonce' ).val();

		var someString = $( '#mxmlb_some_string' ).val();

		var data = {

			'action': 'mxmlb_update',
			'nonce': nonce,
			'mxmlb_some_string': someString

		};

		jQuery.post( ajaxurl, data, function( response ){

			console.log( response );

		} );

	} );

} );