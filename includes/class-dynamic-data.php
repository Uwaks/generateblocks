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
					return self::get_post_date( $attributes );

				case 'post-author':
					return self::get_post_author_name( $attributes );

				case 'terms':
					return self::get_terms( $attributes );

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
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return;
		}

		$updated_time = get_the_modified_time( 'U', $id );
		$published_time = get_the_time( 'U', $id ) + 1800;

		$post_date = sprintf(
			'<time class="entry-date published" datetime="%1$s">%2$s</time>',
			esc_attr( get_the_date( 'c', $id ) ),
			esc_html( get_the_date( '', $id ) )
		);

		$is_updated_date = isset( $attributes['dateType'] ) && 'updated' === $attributes['dateType'];

		if ( ! empty( $attributes['dateReplacePublished'] ) || $is_updated_date ) {
			if ( $updated_time > $published_time ) {
				$post_date = sprintf(
					'<time class="entry-date updated-date" datetime="%1$s">%2$s</time>',
					esc_attr( get_the_modified_date( 'c', $id ) ),
					esc_html( get_the_modified_date( '', $id ) )
				);
			} elseif ( $is_updated_date ) {
				// If we're showing the updated date but no updated date exists, don't display anything.
				return '';
			}
		}

		return $post_date;
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
	 * Get a list of terms.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_terms( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return;
		}

		$taxonomy = isset( $attributes['termTaxonomy'] ) ? $attributes['termTaxonomy'] : 'category';
		$terms = get_the_terms( $id, $taxonomy );

		if ( is_wp_error( $terms ) ) {
			return;
		}

		$term_items = array();

		foreach ( (array) $terms as $term ) {
			if ( ! isset( $term->name ) ) {
				continue;
			}

			$term_items[] = sprintf(
				'<span class="post-term-item term-%2$s">%1$s</span>',
				$term->name,
				$term->slug
			);
		}

		if ( empty( $term_items ) ) {
			return '';
		}

		$sep = isset( $attributes['termSeparator'] ) ? $attributes['termSeparator'] : ', ';
		$term_output = implode( $sep, $term_items );

		return $term_output;
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
