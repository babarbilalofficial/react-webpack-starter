var devConfig = require("./dev.env");
var productionConfig = require("./production.env");
var stagingConfig = require("./staging.env");

var production = process.env.NODE_ENV == 'production' ? true : false;
var staging = process.env.NODE_ENV == 'staging' ? true : false;

module.exports = (production ? productionConfig : staging ? stagingConfig : devConfig);
