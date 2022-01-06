module.exports = {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIDs: false,
        },
      },
    },
    {
      name: 'removeAttributesBySelector',
      params: {
        selector: '[data-name]',
        attributes: ['id', 'data-name'],
      },
    },
  ],
};
