import { __ } from '@wordpress/i18n';
import AdvancedSelect from '../../../../../components/advanced-select';
import { useSelect } from '@wordpress/data';

const normalizePostTypes = ( postTypes ) => postTypes
	.filter( ( postType ) => ( postType.viewable ) )
	.reduce( ( result, postType ) => {
		result.push( { value: postType.slug, label: postType.name } );
		return result;
	}, [] );

export default ( { postType, onChange } ) => {
	const { getPostTypes } = useSelect( ( select ) => select( 'core' ), [] );
	const options = normalizePostTypes( getPostTypes() || [] );
	const value = options.filter( ( option ) => ( option.value === postType ) );

	return (
		<AdvancedSelect
			id={ 'gblocks-select-post-type' }
			label={ __( 'Select source post type', 'generateblocks' ) }
			placeholder={ __( 'Select source post type', 'generateblocks' ) }
			options={ options }
			value={ value }
			onChange={ onChange }
		/>
	);
};
