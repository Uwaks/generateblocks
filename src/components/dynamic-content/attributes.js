export default {
	hasDynamicContent: {
		type: 'boolean',
		default: false,
	},

	dynamicSource: {
		type: 'string',
		default: 'current-post',
	},

	postType: {
		type: 'string',
		default: '',
	},

	postId: {
		type: 'number',
		default: '',
	},

	dynamicContentType: {
		type: 'string',
		default: '',
	},

	dynamicIcon: {
		type: 'string',
		default: '',
	},

	metaFieldName: {
		type: 'string',
		default: '',
	},

	termTaxonomy: {
		type: 'string',
		default: 'category',
	},

	termSeparator: {
		type: 'string',
		default: ', ',
	},
};
