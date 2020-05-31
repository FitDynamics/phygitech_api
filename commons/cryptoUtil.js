const config = require("../config/config");
const CryptoJS = require('crypto-js');

function cryptoUtil () {
}

    cryptoUtil.prototype.encryptField = function(stringToDecript) {
        return new Promise((resolve,reject) => {
            if(!stringToDecript) {
               return reject({message: " error no string sent ! "})
            }
            var encrypted = CryptoJS.AES.encrypt(stringToDecript, config.secretCryptoKey);
            resolve(encrypted);
        })
    }

    cryptoUtil.prototype.decryptField = function(stringToDecript) {
    return new Promise((resolve,reject) => {
        if(!stringToDecript) { return reject({message: "field doesn't exist"}) }
        var decrypted = CryptoJS.AES.decrypt(stringToDecript, config.secretCryptoKey);
        resolve(decrypted.toString(CryptoJS.enc.Utf8));
    })
}


module.exports = cryptoUtil;