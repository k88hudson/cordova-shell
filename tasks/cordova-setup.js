var fs = require('fs-extra');
var async = require('async');
var doExec = require('./utils').doExec;
var colors = require('colors');

console.log('Starting build...'.magentaBg);

fs.removeSync('./platforms');
fs.removeSync('./plugins');

async.series([
    doExec('cordova platform add android'),
    doExec('cordova plugin add org.apache.cordova.contacts')
], function (err) {
    if (err) return console.log('Finished build with errors.'.redBg);
    console.log('Finished build without errors'.magentaBg);
});
