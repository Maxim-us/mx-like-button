jQuery( document ).ready( function( $ ){

	$( '.mxmlb_form_upload_like_img' ).on( 'submit', function( e ){

		e.preventDefault();

		var upload_img = $( this ).find( '.lb_upload_img' ).val();

		var type_of_like = $( this ).find( '.lb_upload_img' ).attr( 'id' );

		if( upload_img !== '' ) {

			var data = {

				'action'				: 'mxmlb_upload_img_for_like',
				'nonce'					: mxmlb_admin_localize.mxmlb_admin_nonce,
				'mxmlb_upload_img'		: upload_img,
				'type_of_like' 			: type_of_like

			};

			mxmlb_talkig_admin_data( data );

			// console.log( data );

		}		

	} );

} );

// ajax
function mxmlb_talkig_admin_data( data ) {

	jQuery.post( mxmlb_admin_localize.ajaxurl, data, function( response ) {

		console.log( response );

	} );

}