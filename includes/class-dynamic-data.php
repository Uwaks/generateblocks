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

				case 'comments-number':
					return self::get_comments_number( $attributes );

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
		$link_type = isset( $attributes['dynamicLinkType'] ) ? $attributes['dynamicLinkType'] : '';

		if ( is_wp_error( $terms ) ) {
			return;
		}

		$term_items = array();

		foreach ( (array) $terms as $term ) {
			if ( ! isset( $term->name ) ) {
				continue;
			}

			if ( 'term-archives' === $link_type ) {
				$term_link = get_term_link( $term, $taxonomy );

				if ( ! is_wp_error( $term_link ) ) {
					$term_items[] = sprintf(
						'<span class="post-term-item term-%3$s"><a href="%1$s">%2$s</a></span>',
						esc_url( get_term_link( $term, $taxonomy ) ),
						$term->name,
						$term->slug
					);
				}
			} else {
				$term_items[] = sprintf(
					'<span class="post-term-item term-%2$s">%1$s</span>',
					$term->name,
					$term->slug
				);
			}
		}

		if ( empty( $term_items ) ) {
			return '';
		}

		$sep = isset( $attributes['termSeparator'] ) ? $attributes['termSeparator'] : ', ';
		$term_output = implode( $sep, $term_items );

		return $term_output;
	}

	/**
	 * Get the number of comments.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_comments_number( $attributes ) {
		$id = self::get_source_id( $attributes );

		if ( ! $id ) {
			return;
		}

		if ( ! post_password_required( $id ) && ( comments_open( $id ) || get_comments_number( $id ) ) ) {
			if ( ! isset( $attributes['noCommentsText'] ) ) {
				$attributes['noCommentsText'] = __( 'No comments', 'generateblocks' );
			}

			if ( '' === $attributes['noCommentsText'] && get_comments_number( $id ) < 1 ) {
				return '';
			}

			$comments_text = get_comments_number_text(
				$attributes['noCommentsText'],
				! empty( $attributes['singleCommentText'] ) ? $attributes['singleCommentText'] : __( '1 comment', 'generateblocks' ),
				! empty( $attributes['multipleCommentsText'] ) ? $attributes['multipleCommentsText'] : __( '% comments', 'generateblocks' )
			);

			return $comments_text;
		} else {
			return '';
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

	/**
	 * Get our dynamic URL.
	 *
	 * @param array $attributes The block attributes.
	 */
	public static function get_dynamic_url( $attributes ) {
		$id = self::get_source_id( $attributes );
		$author_id = get_post_field( 'post_author', $id );
		$link_type = isset( $attributes['dynamicLinkType'] ) ? $attributes['dynamicLinkType'] : '';
		$url = '';

		if ( 'single-post' === $link_type ) {
			$url = get_permalink( $id );
		}

		if ( isset( $attributes['linkMetaFieldName'] ) ) {
			if ( 'post-meta' === $link_type ) {
				$url = get_post_meta( $id, $attributes['linkMetaFieldName'], true );
			}

			if ( 'user-meta' === $link_type ) {
				$url = self::get_user_data( $author_id, $attributes['linkMetaFieldName'] );
			}

			if ( 'term-meta' === $link_type ) {
				$url = get_term_meta( get_queried_object_id(), $attributes['linkMetaFieldName'], true );
			}
		}

		if ( 'author-archives' === $link_type ) {
			$url = get_author_posts_url( $author_id );
		}

		if ( 'comments-area' === $link_type ) {
			$url = get_comments_link( $id );
		}

		if ( 'next-posts' === $link_type ) {
			global $paged, $wp_query;

			$max_page = 0;

			if ( ! $max_page ) {
				$max_page = $wp_query->max_num_pages;
			}

			$paged_num = isset( $paged ) && $paged ? $paged : 1;
			$nextpage = (int) $paged_num + 1;

			if ( ! is_single() && ( $nextpage <= $max_page ) ) {
				$url = next_posts( $max_page, false );
			}
		}

		if ( 'previous-posts' === $link_type ) {
			global $paged;

			if ( ! is_single() && (int) $paged > 1 ) {
				$url = previous_posts( false );
			}
		}

		return $url;
	}

	/**
	 * Get user data.
	 *
	 * @param int    $author_id The ID of the user.
	 * @param string $field The field to look up.
	 */
	public static function get_user_data( $author_id, $field ) {
		$data = get_user_meta( $author_id, $field, true );

		if ( ! $data ) {
			$user_data_names = array(
				'user_nicename',
				'user_email',
				'user_url',
				'display_name',
			);

			if ( in_array( $field, $user_data_names ) ) {
				$user_data = get_userdata( $author_id );

				if ( $user_data ) {
					switch ( $field ) {
						case 'user_nicename':
							$data = $user_data->user_nicename;
							break;

						case 'user_email':
							$data = $user_data->user_email;
							break;

						case 'user_url':
							$data = $user_data->user_url;
							break;

						case 'display_name':
							$data = $user_data->display_name;
							break;
					}
				}
			}
		}

		return $data;
	}
}

GenerateBlocks_Dynamic_Data::get_instance();
