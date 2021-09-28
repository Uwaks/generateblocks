import PanelArea from '../panel-area';
import AdvancedSelect from '../advanced-select';
import { __ } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';

export default () => {
	return (
		<PanelArea
			title={ 'Dynamic Data' }
			id={ 'dynamicData' }
			showPanel={ true }
		>
			<ToggleControl
				label={ __( 'Use dynamic data', 'generateblocks' ) }
				checked={ true }
				// onChange={}
			/>

			<AdvancedSelect
				options={ [
					{ value: 'current_post', label: 'Current post' },
					{ value: 'post_type', label: 'Post type' },
					{ value: 'taxonomy', label: 'Taxonomy' },
				] }
				placeholder={ 'Select source' }
			/>

			<div style={ { marginTop: '12px' } }>
				<AdvancedSelect
					options={ [
						{ value: 'post', label: 'Post' },
						{ value: 'page', label: 'Page' },
						{ value: 'product', label: 'Product' },
					] }
					placeholder={ 'Post type' }
				/>
			</div>
		</PanelArea>

	);
};
