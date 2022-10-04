import { __ } from '@wordpress/i18n';

const defaultContext = {
	id: '',
	supports: {
		responsiveTabs: false,
		settingsPanel: {
			enabled: false,
			label: __( 'Settings', 'generateblocks' ),
			icon: 'wrench',
		},
		layout: {
			enabled: false,
			display: false,
			flexDirection: false,
			flexWrap: false,
			alignItems: false,
			justifyContent: false,
		},
		typography: {
			enabled: false,
			fontWeight: false,
			textTransform: false,
			fontSize: false,
			lineHeight: false,
			letterSpacing: false,
			fontFamily: false,
		},
		spacing: {
			enabled: false,
			inlineWidth: false,
			stackVertically: false,
			fillHorizontalSpace: false,
			dimensions: [],
		},
		colors: {
			enabled: false,
			elements: [],
		},
		backgroundGradient: {
			enabled: false,
		},
		icon: {
			enabled: false,
			location: [],
		},
		htmlTags: {
			enabled: false,
			tags: [],
		},
	},
};

export default defaultContext;
