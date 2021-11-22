import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import SelectPostType from '../components/SelectPostType';
import SelectPost from '../components/SelectPost';

export default ( { dynamicSource, postType, postId, setAttributes } ) => {
	return (
		<>
			<ToggleControl
				label={ __( 'Enable dynamic source', 'generateblocks' ) }
				checked={ dynamicSource }
				onChange={ ( value ) => {
					setAttributes( {
						dynamicSource: value,
						postId: '',
						postType: 'post'
					} );
				} }
			/>

			{ dynamicSource &&
				<>
					<SelectPostType
						postType={ postType }
						onChange={ ( option ) => {
							setAttributes( { postType: option.value, postId: '' } );
						} }
					/>
					<SelectPost
						postId={ postId }
						postType={ postType }
						onChange={ ( option ) => {
							setAttributes( { postId: option.value } );
						} }
					/>
				</>
			}
		</>
	);
};
