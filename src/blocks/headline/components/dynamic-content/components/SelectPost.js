import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import { useSelect } from '@wordpress/data';

const normalizePostTypes = ( posts ) => posts.map( ( post ) => ( { value: post.id, label: post.title.raw } ) );

export default ( { postId, postType, onChange } ) => {
	const { getEntityRecords } = useSelect( ( select ) => select( 'core' ), [] );

	const posts = getEntityRecords( 'postType', postType, { per_page: -1 } ) || [];

	const options = normalizePostTypes( posts );
	const value = options.filter( ( option ) => ( option.value === postId ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post' }
			label={ __( 'Select source post', 'generateblocks' ) }
			placeholder={ __( 'Select source post', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};
