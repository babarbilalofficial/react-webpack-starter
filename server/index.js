require('babel-register')({
  "ignore": [ /(node_modules)/ ],
  "plugins": ["dynamic-import-node", "transform-react-remove-prop-types"]
});
require('./server');