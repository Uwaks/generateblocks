/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
} from '@wordpress/block-editor';

function QueryEdit() {
	const blockProps = useBlockProps();

	const TEMPLATE = [ [ 'generateblocks/container', {} ] ];

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [ 'generateblocks/container' ] }
				template={ TEMPLATE }
			/>
		</div>
	);
}

export default QueryEdit;
