function AppConfig(path) {
    this.config = require(path);
}

AppConfig.prototype.get = function(parameter) {
    return this.config[parameter] || 'not found';
}

module.exports = AppConfig;
