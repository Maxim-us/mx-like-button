jQuery( document ).ready( function( $ ){

	/*
	* mxmlb_object_likes - the object of data
	*/ 
	mxmlb_object_likes = {
		42: {
			2: {
				'typeOfLike': 'like'
			}
			
		}
		
	};

	/*
	* Show like-button system
	*/
	var setTimeoutShowLikeBox = null;

	var setTimeoutHideLikeBox = null;

	// show like buttons
	$( '#activity-stream' ).on( 'mouseenter', '.mx-like-main-button', function() {

		var _this = $( this );

		setTimeoutShowLikeBox = setTimeout( function() {

			_this.parent().find( '.mx-like-other-faces' ).addClass( 'mx-like-other-faces-active' );

		},800 );

		clearTimeout( setTimeoutHideLikeBox );

	} );

	// hidden like buttons
	$( '#activity-stream' ).on( 'mouseleave', '.mx-like-main-button', function() {

		var _this = $( this );

		setTimeoutHideLikeBox = setTimeout( function() {

			_this.parent().find( '.mx-like-other-faces' ).removeClass( 'mx-like-other-faces-active' );

		},800 );

		clearTimeout( setTimeoutShowLikeBox );

	} );

	/*
	* click event
	*/
	$( '#activity-stream' ).on( 'click', '.mx-like-box', function( e ) {

		if( mxmlb_check_click_like_button( e ) === true ) {

			// like data
			var postId = $( this ).attr( 'id' );

			postId = parseInt( postId.slice( 15 ) );

			// get type of like
			var objLike = {};

			var userId = parseInt( mxmlb_current_user_data.id );

			var typeOfLike = $( mxmlb_find_click_like_button( e ) ).data().likeType;

			objLike.typeOfLike = typeOfLike;

			/*
			* check like|dislike
			*/
			var newPostId = 0;

			$.when( 

				// check new post id
				$.each( mxmlb_object_likes, function( key, value ) {

					var _postId = parseInt( key );

					// find post id
					if( _postId === postId ) {

						newPostId = _postId;

					}
					
				} )

			 ).then( function() {

			 	// if need 'CREATE' new like obj
			 	if( newPostId === 0 ) {

			 		// save like data in object
			 		mxmlb_object_likes[postId] = {};
					mxmlb_object_likes[postId][userId] = objLike;

				// if need 'UPDATE' new like obj
			 	} else {

					// save type of like if user id not exists
					if( mxmlb_object_likes[newPostId][userId] === undefined ) {

						mxmlb_object_likes[newPostId][userId] = objLike;
					
					// update type of like if user id exists
					} else{

						// cancel like if user click main button again						
						if( $( mxmlb_find_click_like_button( e ) ).hasClass( 'mx-like-main-button' ) ) {

							delete mxmlb_object_likes[newPostId][userId];

						// or update like object
						} else {

							mxmlb_object_likes[newPostId][userId] = objLike;

						}

					}					

			 	}			 	
				
				// result
				console.log( mxmlb_object_likes );

			} );

		}

	} );

} );

// check button
function mxmlb_check_click_like_button( e ) {	

	var _nodeName = e.target.nodeName;

	_nodeName = _nodeName.toLowerCase();

	var parentElementNodeName = e.target.parentElement.nodeName;

	parentElementNodeName = parentElementNodeName.toLowerCase();

	if( _nodeName === 'button' || parentElementNodeName === 'button' ) {

		return true;

	}

}

// find button
function mxmlb_find_click_like_button( e ) {

	var _nodeName = e.target.nodeName;

	_nodeName = _nodeName.toLowerCase();

	var parentElementNodeName = e.target.parentElement.nodeName;

	parentElementNodeName = parentElementNodeName.toLowerCase();

	if( _nodeName === 'button' ) {

		return e.target;

	}

	if( parentElementNodeName === 'button' ) {

		return e.target.parentElement;

	}

}