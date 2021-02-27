( function( $ ) {

	'use strict';

	if ( 'function' !== typeof window.vcexNavbarFilterLinks ) {
		window.vcexNavbarFilterLinks = function ( $context ) {

			if ( 'undefined' === typeof $.fn.imagesLoaded || 'undefined' === typeof $.fn.isotope ) {
				return;
			}

			var isRTL = false;

			if ( 'undefined' !== typeof wpexLocalize ) {
				isRTL = wpexLocalize.isRTL;
			}

			// Filter Navs
			$( '.vcex-filter-nav', $context ).each( function() {

				var $nav        = $( this ),
					$filterGrid = $( '#' + $nav.data( 'filter-grid' ) ),
					$grid;

				if ( ! $filterGrid.hasClass( 'wpex-row' ) ) {
					$filterGrid = $filterGrid.find( '.wpex-row' );
				}

				if ( $filterGrid.length ) {

					// Remove isotope class
					$filterGrid.removeClass( 'vcex-isotope-grid' );

					// Run functions after images are loaded for grid
					$filterGrid.imagesLoaded( function() {

						// Create Isotope
						if ( ! $filterGrid.hasClass( 'vcex-navbar-filter-grid' ) ) {

							$filterGrid.addClass( 'vcex-navbar-filter-grid' );

							var activeItems = $nav.data( 'filter' );
							if ( activeItems && ! $nav.find( '[data-filter="' + activeItems + '"]').length ) {
								activeItems = '';
							}

							$grid = $filterGrid.isotope( {
								itemSelector       : '.col',
								transformsEnabled  : true,
								isOriginLeft       : isRTL ? false : true,
								transitionDuration : $nav.data( 'transition-duration' ) ? $nav.data( 'transition-duration' ) + 's' : '0.4s',
								layoutMode         : $nav.data( 'layout-mode' ) ? $nav.data( 'layout-mode' ) : 'masonry',
								filter             : activeItems
							} );

						} else {

							// Add isotope only, the filter grid already
							$grid = $filterGrid.isotope();

						}

						// Loop through filter links for filtering items
						var $filterLinks = $nav.find( 'a' );
						$filterLinks.click( function() {

							// Define link
							var $link = $( this );

							// Filter items
							$grid.isotope( {
								filter : $( this ).attr( 'data-filter' )
							} );

							// Remove all active class
							$filterLinks.removeClass( 'active' );

							// Add active class
							$link.addClass( 'active' );

							// Return false
							return false;

						} );

					} );

				}

			} );

		};

	}

	$( document ).ready( function() {
		window.vcexNavbarFilterLinks();
	} );

	$( window ).on( 'orientationchange', function() {
		window.vcexNavbarFilterLinks();
	} );

} ) ( jQuery );