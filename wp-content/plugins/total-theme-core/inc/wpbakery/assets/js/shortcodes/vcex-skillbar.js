( function( $ ) {

	'use strict';

	if ( 'function' !== typeof window.vcexSkillbar ) {
		window.vcexSkillbar = function ( $context ) {
			if ( 'undefined' === typeof $.fn.appear ) {
				return;
			}

			$( '.vcex-skillbar', $context ).each( function() {
				var $this = $( this );
				$this.appear( function() {
					$this.find( '.vcex-skillbar-bar' ).animate( {
						width: $( this ).attr( 'data-percent' )
					}, 800 );
				} );
			}, {
				accX : 0,
				accY : 0
			} );

		};
	}

	$( document ).ready( function() {
		window.vcexSkillbar();
	} );

} ) ( jQuery );