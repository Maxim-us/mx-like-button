jQuery( document ).ready( function( $ ){

	$( '.mxmlb_form_upload_like_img' ).on( 'submit', function( e ){

		e.preventDefault();		

		if( $( this ).find( '.lb_upload_img' ).val() !== '' ) {

			var files = $( this ).find( '.lb_upload_img' ).prop('files')[0]['name'];

			var type_of_like = $( this ).find( '.lb_upload_img' ).attr( 'data-type-like' );


			var data = new FormData();

			data.append( 'action', 'mxmlb_upload_img_for_like' );

			data.append( 'nonce', mxmlb_admin_localize.mxmlb_admin_nonce );

			data.append( 'mxmlb_upload_img', files );

			data.append( 'type_of_like', type_of_like );

			data.append( 'file', $( this ).find( '.lb_upload_img' ).prop('files')[0] );

			mxmlb_upload_new_image( data, $( this ) );

		}	

	} );

	// remove image that was uploaded
	$( '.mx-btn-remove' ).on( 'click', function() {

		var type_of_like = $( this ).attr( 'data-type-like' );

		// data
		var data = {

			'action'		: 'mxmlb_remove_image_from_database',
			'nonce'			: mxmlb_admin_localize.mxmlb_admin_nonce,
			'type_of_like' 	: type_of_like

		};

		mxmlb_remove_image( data );

	} );

} );

// upload new image
function mxmlb_upload_new_image( data, form ) {

	jQuery.ajax( {

        type: 'POST',
        url: mxmlb_admin_localize.ajaxurl,
        data: data,
        contentType: false,
        processData: false,
        success: function( response ){

        	console.log( response );

            if( parseInt( response ) === 1 ) {

            	mxmlb_success_uploading_img( form )

            }

        }

    } );

}

// success uploading of img
function mxmlb_success_uploading_img( form ) {

	form.find( '.lb_upload_img' ).val( '' );

}

// remove image
function mxmlb_remove_image( data ) {

	console.log( data );

	// jQuery.post( mxmlb_admin_localize.ajaxurl, data, function( response ) {

	// 	console.log( response );

	// } );

}