import usePostTitle from './usePostTitle';
import usePostExcerpt from './usePostExcerpt';
import usePostDate from './usePostDate';
import { __ } from '@wordpress/i18n';

export default ( context, attributes ) => {
	const { postId, postType } = attributes.dynamicSource ? attributes : context;

	// Not sure if this is the best way to go...
	switch ( attributes.contentType ) {
		case 'post-title':
			return usePostTitle( postType, postId );
		case 'post-excerpt':
			return usePostExcerpt( postType, postId );
		case 'post-date':
			return usePostDate( postType, postId );
		default:
			return __( 'No content found', 'generateblocks' );
	}
};
