<?php
/**
 * Display thumbnails in the dashboard.
 *
 * @package Total WordPress Theme
 * @subpackage Framework
 * @version 5.0.6
 */

namespace TotalTheme;

defined( 'ABSPATH' ) || exit;

final class Dashboard_Thumbnails {

	/**
	 * Our single Dashboard_Thumbnails instance.
	 */
	private static $instance;

	/**
	 * Post types to add thumbnails to.
	 *
	 * @return array
	 */
	public $post_types;

	/**
	 * Disable instantiation.
	 */
	private function __construct() {
		// Private to disabled instantiation.
	}

	/**
	 * Disable the cloning of this class.
	 *
	 * @return void
	 */
	final public function __clone() {
		throw new Exception( 'You\'re doing things wrong.' );
	}

	/**
	 * Disable the wakeup of this class.
	 *
	 * @return void
	 */
	final public function __wakeup() {
		throw new Exception( 'You\'re doing things wrong.' );
	}

	/**
	 * Create or retrieve the instance of Dashboard_Thumbnails.
	 *
	 * @return Dashboard_Thumbnails
	 */
	public static function instance() {
		if ( is_null( static::$instance ) ) {
			static::$instance = new Dashboard_Thumbnails;
			static::$instance->init_hooks();
		}

		return static::$instance;
	}

	/**
	 * Hook into actions and filters.
	 *
	 * @since 5.0.6
	 */
	public function init_hooks() {

		$this->post_types = array(
			'post',
			'page',
			'portfolio',
			'staff',
			'testimonials',
		);

		$this->post_types = apply_filters( 'wpex_dashboard_thumbnails_post_types', $this->post_types );

		if ( ! empty( $this->post_types ) && is_array( $this->post_types ) ) {

			foreach ( $this->post_types as $post_type ) {
				add_filter( 'manage_' . $post_type . '_posts_columns', array( $this, 'add_columns' ) );
			}

			add_action( 'manage_posts_custom_column', array( $this, 'display_columns' ), 10, 2 );

			if ( in_array( 'page', $this->post_types ) ) {
				add_action( 'manage_pages_custom_column', array( $this, 'display_columns' ), 10, 2 );
			}

		}

	}

	/**
	 * Add new admin columns.
	 *
	 * @since 5.0.6
	 */
	public function add_columns( $columns ) {
		$columns['wpex_post_thumbs'] = esc_html__( 'Thumbnail', 'total' );
		return $columns;
	}

	/**
	 * Display custom columns.
	 *
	 * @since 5.0.6
	 */
	public function display_columns( $column_name, $id ) {

		switch ( $column_name ) {
			case 'wpex_post_thumbs':

				if ( has_post_thumbnail( $id ) ) {
					the_post_thumbnail(
						'thumbnail',
						array( 'style' => 'width:80px;height:80px;max-width:100%;' )
					);
				} else {
					echo '&#8212;';
				}

				break;
		}

	}

}
Dashboard_Thumbnails::instance();