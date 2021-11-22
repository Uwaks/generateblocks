import { useEntityProp } from '@wordpress/core-data';
import { __ } from '@wordpress/i18n';

export default ( postType, postId ) => {
	const [
		rawExcerpt,
		setExcerpt,
		{ rendered: renderedExcerpt, protected: isProtected } = {},
	] = useEntityProp( 'postType', postType, 'excerpt', postId );

	if (
		! postType ||
		! postId ||
		isProtected ||
		( ! rawExcerpt && ! renderedExcerpt )
	) {
		return  __( 'No post excerpt found', 'generateblocks' );
	}

	const document = new window.DOMParser().parseFromString( renderedExcerpt, 'text/html' );
	const strippedRenderedExcerpt = document.body.textContent || document.body.innerText || '';

	return rawExcerpt || strippedRenderedExcerpt;
};
