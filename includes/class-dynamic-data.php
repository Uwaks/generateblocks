<?php
/**
 * Handles option changes on plugin updates.
 *
 * @package GenerateBlocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Process option updates if necessary.
 */
class GenerateBlocks_Dynamic_Data {
	/**
	 * Class instance.
	 *
	 * @access private
	 * @var $instance Class instance.
	 */
	private static $instance;

	/**
	 * Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Get the requested dynamic content.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_content( $attributes ) {
		if ( isset( $attributes['dynamicContentType'] ) ) {
			switch ( $attributes['dynamicContentType'] ) {
				case 'title':
					return self::get_post_title( $attributes );

				case 'post-date':
					return self::get_post_title( $attributes );

				case 'post-author':
					return self::get_post_author_name( $attributes );

				case 'post-meta':
					return self::get_post_meta( $attributes );
			}
		}
	}

	/**
	 * Get the requested post title.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_title( $attributes ) {
		$post_title = get_the_title( self::get_source_id( $attributes ) );

		if ( ! in_the_loop() ) {
			if ( is_tax() || is_category() || is_tag() ) {
				$post_title = get_queried_object()->name;
			} elseif ( is_post_type_archive() ) {
				$post_title = post_type_archive_title( '', false );
			} elseif ( is_archive() && function_exists( 'get_the_archive_title' ) ) {
				$post_title = get_the_archive_title();
			} elseif ( is_home() ) {
				$page_for_posts = get_option( 'page_for_posts' );

				if ( ! empty( $page_for_posts ) ) {
					$post_title = get_the_title( $page_for_posts );
				} else {
					$post_title = __( 'Blog', 'generateblocks' );
				}
			}
		}

		return $post_title;
	}

	/**
	 * Get the requested post date.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_date( $attributes ) {
		return get_the_date( '', self::get_source_id( $attributes ) );
	}

	/**
	 * Get the requested post author name.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_author_name( $attributes ) {
		$author_id = get_post_field( 'post_author', self::get_source_id( $attributes ) );

		if ( isset( $author_id ) ) {
			return get_the_author_meta( 'display_name', $author_id );
		}
	}

	/**
	 * Get the requested post meta.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_post_meta( $attributes ) {
		if ( isset( $attributes['metaFieldName'] ) ) {
			return get_post_meta( self::get_source_id( $attributes ), $attributes['metaFieldName'], true );
		}
	}

	/**
	 * Get our source ID.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_source_id( $attributes ) {
		if ( ! isset( $attributes['dynamicSource'] ) ) {
			return;
		}

		if ( 'current-post' !== $attributes['dynamicSource'] && isset( $attributes['postId'] ) ) {
			return absint( $attributes['postId'] );
		}

		return get_the_ID();
	}
}

GenerateBlocks_Dynamic_Data::get_instance();
