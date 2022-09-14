import { ToolbarButton, ToolbarGroup, Dropdown, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { cloneBlock } from '@wordpress/blocks';
import { BlockControls, URLInput } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { link, plus } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';

export default ( props ) => {
	const {
		attributes,
		clientId,
		setAttributes,
	} = props;

	const { insertBlocks } = useDispatch( 'core/block-editor' );
	const {
		getBlockParentsByBlockName,
		getBlocksByClientId,
	} = useSelect( ( select ) => select( 'core/block-editor' ), [] );

	const {
		url,
		target,
		relNoFollow,
		relSponsored,
		useDynamicData,
		dynamicLinkType,
	} = attributes;

	const POPOVER_PROPS = {
		className: 'block-editor-block-settings-menu__popover',
		position: 'bottom right',
	};

	const hasDynamicLink = useDynamicData && dynamicLinkType;
	const showAppender = applyFilters( 'generateblocks.editor.showButtonAppender', true, props );
	const showButtonLinkControl = applyFilters( 'generateblocks.editor.showButtonLinkControl', true, props );
	const parentBlockId = getBlockParentsByBlockName( clientId, 'generateblocks/button-container', true )[ 0 ];

	return (
		<>
			<BlockControls>
				<ToolbarGroup>
					{ showAppender && parentBlockId &&
						<ToolbarButton
							className="gblocks-add-new-button"
							icon={ plus }
							label={ __( 'Add Button', 'generateblocks' ) }
							onClick={ () => {
								const thisBlock = getBlocksByClientId( clientId )[ 0 ];

								const clonedBlock = cloneBlock(
									thisBlock,
									{
										uniqueId: '',
									}
								);

								insertBlocks( clonedBlock, undefined, parentBlockId );
							} }
							showTooltip
						/>
					}
				</ToolbarGroup>

				<ToolbarGroup>
					{ ( ! useDynamicData || hasDynamicLink ) && showButtonLinkControl &&
						<Dropdown
							contentClassName="gblocks-button-link-dropdown"
							popoverProps={ POPOVER_PROPS }
							renderToggle={ ( { isOpen, onToggle } ) => (
								<ToolbarButton
									icon={ link }
									label={ ! url ? __( 'Add Link', 'generateblocks' ) : __( 'Change Link', 'generateblocks' ) }
									onClick={ onToggle }
									aria-expanded={ isOpen }
									isPressed={ !! url }
								/>
							) }
							renderContent={ () => (
								<>
									{ ! useDynamicData &&
										<URLInput
											className={ 'gblocks-button-link' }
											value={ url }
											onChange={ ( value ) => {
												setAttributes( {
													url: value,
													hasUrl: !! value,
												} );
											} }
										/>
									}

									{ !! useDynamicData &&
										<div style={ {
											width: '300px',
											'font-style': 'italic',
											'margin-bottom': ( !! dynamicLinkType ? '15px' : '0' ),
										} }>
											{ __( 'This button is using a dynamic link.', 'generateblocks' ) }
										</div>
									}

									{ applyFilters( 'generateblocks.editor.urlInputMoreOptions', '', attributes ) }

									{ ( !! url || hasDynamicLink ) &&
										<>
											<ToggleControl
												label={ __( 'Open link in a new tab', 'generateblocks' ) }
												checked={ target || '' }
												onChange={ ( value ) => {
													setAttributes( {
														target: value,
													} );
												} }
											/>

											<ToggleControl
												label={ __( 'Add rel="nofollow"', 'generateblocks' ) }
												checked={ relNoFollow || '' }
												onChange={ ( value ) => {
													setAttributes( {
														relNoFollow: value,
													} );
												} }
											/>

											<ToggleControl
												label={ __( 'Add rel="sponsored"', 'generateblocks' ) }
												checked={ relSponsored || '' }
												onChange={ ( value ) => {
													setAttributes( {
														relSponsored: value,
													} );
												} }
											/>
										</>
									}
								</>
							) }
						/>
					}
				</ToolbarGroup>
			</BlockControls>
		</>
	);
};
