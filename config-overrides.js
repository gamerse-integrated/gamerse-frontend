const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
  alias({
    "@components": "src/components",
    "@auth": "src/components/auth",
    "@config": "src/config",
    "@fonts": "src/fonts",
    "@main": "src/components/main",
    "@redux": "src/redux",
    "@shared": "src/components/shared",
    "@src": "src",
  })(config);

  return config;
};
