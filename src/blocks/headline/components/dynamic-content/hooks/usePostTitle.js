import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

export default ( postType, postId ) => {
	const [ rawTitle = __('No title', 'generateblocks') ] = useEntityProp(
		'postType',
		postType,
		'title',
		postId
	);

	return rawTitle;
};
