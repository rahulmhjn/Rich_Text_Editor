let katex = null;
const renderQueue = [];

System.import(/* webpackChunkName: 'katex' */ "katex")
  .then(function methodName(module) {
    katex = module.default;
  })
  .then(() => {
    console.log("Katex loaded, ", renderQueue);
    if (renderQueue.length) {
      const now = Date.now();
      renderQueue.map(([d, expression, baseNode, options]) => {
        if (now - d < 4000) {
          katex.render(expression, baseNode, options);
        }
      });
    }
  });

export default {
  render: (expression, baseNode, options) => {
    if (katex) {
      return katex.render(expression, baseNode, options);
    }

    renderQueue.push([Date.now(), expression, baseNode, options]);
  },
  // parse is only used by this plugin to check syntax validity.
  __parse: (expression, options) => {
    if (katex) {
      return katex.parse(expression, options);
    }
    return null;
  },
};
