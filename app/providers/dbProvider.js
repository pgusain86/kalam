var mongoose = require('mongoose');
var propertyHolder = require('../utils/propertyHolder.js');
var env = propertyHolder.getProperty('node.env');
const dbUrl = propertyHolder.getProperty(env)['databaseUrl'];
const dbUser = propertyHolder.getProperty(env)['dbUser'];
const dbPassword = propertyHolder.getProperty(env)['dbPwd'];
var connString = 'mongodb://'.concat(dbUser, ':', dbPassword, '@', dbUrl);
module.exports = (function () {
    return {
        connect: connect
    }

    function connect() {
        mongoose.connect(connString);

        mongoose.connection.on('connected', function () {
            console.log('Mongoose default connection open to ' + connString);
        });

        // If the connection throws an error
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });

        // When the connection is disconnected
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });

        // If the Node process ends, close the Mongoose connection 
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
            });
        });
    }



}());