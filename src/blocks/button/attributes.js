export default {
	uniqueId: {
		type: 'number',
		default: '',
	},
	elementId: {
		type: 'string',
		default: '',
	},
	cssClasses: {
		type: 'string',
		default: '',
	},
	url: {
        type: 'string',
        source: 'attribute',
        selector: 'a.gp-button',
        attribute: 'href',
    },
    target: {
        type: 'string',
        source: 'attribute',
        selector: 'a.gp-button',
        attribute: 'target',
    },
    rel: {
        type: 'string',
        source: 'attribute',
        selector: 'a.gp-button',
        attribute: 'rel',
    },
	text: {
		type: 'array',
		source: 'children',
		selector: '.gp-button .button-text',
		default: 'Button',
	},
	backgroundColor: {
        type: 'string',
        default: generatepressDefaults.button.backgroundColor,
    },
	textColor: {
        type: 'string',
        default: generatepressDefaults.button.textColor,
    },
	backgroundColorHover: {
        type: 'string',
        default: generatepressDefaults.button.backgroundColorHover,
    },
	textColorHover: {
        type: 'string',
        default: generatepressDefaults.button.textColorHover,
    },
	borderColor: {
		type: 'string',
		default: generatepressDefaults.button.borderColor,
	},
	borderColorHover: {
		type: 'string',
		default: generatepressDefaults.button.borderColorHover,
	},
	fontSize: {
		type: 'number',
		default: generatepressDefaults.button.fontSize,
	},
	gap: {
		type: 'number',
		default: generatepressDefaults.button.gap,
	},
	borderSizeTop: {
		type: 'number',
		default: generatepressDefaults.button.borderSizeTop,
	},
	borderSizeRight: {
		type: 'number',
		default: generatepressDefaults.button.borderSizeRight,
	},
	borderSizeBottom: {
		type: 'number',
		default: generatepressDefaults.button.borderSizeBottom,
	},
	borderSizeLeft: {
		type: 'number',
		default: generatepressDefaults.button.borderSizeLeft,
	},
	borderRadiusTopRight: {
		type: 'number',
		default: generatepressDefaults.button.borderRadiusTopRight,
	},
	borderRadiusBottomRight: {
		type: 'number',
		default: generatepressDefaults.button.borderRadiusBottomRight,
	},
	borderRadiusBottomLeft: {
		type: 'number',
		default: generatepressDefaults.button.borderRadiusBottomLeft,
	},
	borderRadiusTopLeft: {
		type: 'number',
		default: generatepressDefaults.button.borderRadiusTopLeft,
	},
}
