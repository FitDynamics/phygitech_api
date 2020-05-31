let AppConfig = require('./appConfig')

function setEachAttribute(attribute, appConfig) {
    this[attribute] = appConfig.get(attribute);
}

function setAttributeList(listOfAttributes, appConfig) {
    for (let attribute of listOfAttributes) {
        setEachAttribute.call(this, attribute, appConfig);
    }
}

function DBUtil(listOfAttributes) {
    const appConfig = new AppConfig();
    setAttributeList.call(this, listOfAttributes, appConfig);
}

DBUtil.prototype.connectToDatabase = function () {
}

module.exports = DBUtil;