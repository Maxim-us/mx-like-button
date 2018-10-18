jQuery( document ).ready( function( $ ){

	/*
	* mxmlb_object_likes - the object of data
	*/ 
	mxmlb_object_likes = {
		42: {
			2: {
				'typeOfLike': 'angry'
			},
			4: {
				'typeOfLike': 'wow'
			},
			3: {
				'typeOfLike': 'wow'
			}
			
		},
		41: {
			3: {
				'typeOfLike': 'sad'
			},
			2: {
				'typeOfLike': 'wow'
			}
			
		},
		25: {
			3: {
				'typeOfLike': 'sad'
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
	* reading the like object and set the like data
	*/
		// loading page
		mxmlb_wait_for_Element( $, '.activity-list', function() {
			
			$.each( mxmlb_object_likes, function( key, value ) {

				// set count
				var countOfLikes = Object.keys( mxmlb_object_likes[key] ).length

				// count of likes
				mxmlb_set_count_of_likes( $, key, countOfLikes );

				// show according faces
				mxmlb_show_like_faces( $, key );

			} );			

		} );
		

		// change activity stream
		// $( '.activity-list' ).on( 'DOMSubtreeModified', function() {

		// 	$.each( mxmlb_object_likes, function( key, value ) {

		// 		// set count
		// 		var countOfLikes = Object.keys( mxmlb_object_likes[key] ).length

		// 		mxmlb_set_count_of_likes( $, key, countOfLikes );

		// 		alert( 'change' );

		// 	} );

		// } );

	/*
	* click like button
	*/
	$( '#activity-stream' ).on( 'click', '.mx-like-box', function( e ) {

		if( mxmlb_check_click_like_button( e ) === true ) {

			// like data
			var postIdFull = $( this ).attr( 'id' );

			postId = parseInt( postIdFull.slice( 15 ) );

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

						// show face
						mxmlb_show_like_faces( $, newPostId );
					
					// update type of like if user id exists
					} else{

						// cancel like if user click main button again						
						if( $( mxmlb_find_click_like_button( e ) ).hasClass( 'mx-like-main-button' ) ) {

							// console.log( mxmlb_object_likes[newPostId][userId] );

							delete mxmlb_object_likes[newPostId][userId];

							// hide face
							// function mxmlb_show_like_faces( $, postId, likeType );

						// or update like object
						} else {

							mxmlb_object_likes[newPostId][userId] = objLike;

							// show face
							mxmlb_show_like_faces( $, newPostId );

						}

					}					

			 	}			 	
				
				/*
				* get object for particular post and set count, type of likes
				*/
				var countObjects = Object.keys( mxmlb_object_likes[postId] ).length;

				// count function
				mxmlb_set_count_of_likes( $, postId, countObjects );

				// show faces function
				mxmlb_show_like_faces( $, postId );

				/*
				* get the list of like types 
				*/
				// console.log( typeOfLike );

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

// set count of likes
function mxmlb_set_count_of_likes( $, postId, countObj ) {

	// check 0 number
	if( countObj > 0 ) {

		// activation counter
		$( '#' + 'mx-like-button-' + postId ).find( '.mx-like-place-count' ).removeClass( 'mx-display-none' );

	} else {

		// hide counter
		$( '#' + 'mx-like-button-' + postId ).find( '.mx-like-place-count' ).addClass( 'mx-display-none' );

	}	

	// set number
	$( '#' + 'mx-like-button-' + postId ).find( '.mx-like-place-count' ).text( countObj );

}

// show like faces
function mxmlb_show_like_faces( $, postId ) {

	// clear the face table
	$( '#' + 'mx-like-button-' + postId + ' .mx-like-place-faces' )
	.find( 'span' ).removeClass( 'mx-like-active' );

	$.each( mxmlb_object_likes[postId], function( key, value ) {

		$( '#' + 'mx-like-button-' + postId + ' .mx-like-place-faces' )
		.find( '.mx-' + value.typeOfLike ).addClass( 'mx-like-active' );	

	} );

}

// hide face
function mxmlb_hide_like_faces( $, postId, likeType ) {

	


}

// load element
function mxmlb_wait_for_Element ($, selector, callback) {

  if ( $( selector ).length ) {

    callback();

  } else {

    setTimeout( function() {

      mxmlb_wait_for_Element( $, selector, callback );

    }, 100 );

  }

};