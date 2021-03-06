var constants = require('../utils/constants.js');
var clientModel = require('./client.js');
var userModel = require('./user.js');

module.exports = (function () {
    return {
        getModel: getModel
    }

    function getModel(model) {
        switch (model) {
            case constants.MODEL_CLIENT:
                return clientModel;
            case constants.MODEL_USER:
                return userModel;    
        }
    }
}());