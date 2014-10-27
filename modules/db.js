var debug = require('debug')('MameDB');

if (process.env.REDISTOGO_URL) {
    var rtg   = require("url").parse(process.env.REDISTOGO_URL);
    var redis = require("redis").createClient(rtg.port, rtg.hostname);

    redis.auth(rtg.auth.split(":")[1]);
} else {
    var redis = require("redis").createClient();
}

redis.on("error", function(err){
    console.log("MameDB : " + err);
});

var MameDB = {};

MameDB.config = {
    isTest: false
}

MameDB.key = function(str){
    return str + (MameDB.config.isTest?'-Test':'');
};

MameDB.setTest = function() {
    MameDB.config.isTest = true;
};

MameDB.getRose = function(callback) {
    redis.get(MameDB.key("roseNum"), function(err, res){
        callback(res);
    });
};

MameDB.setRose = function(num) {
    redis.set(MameDB.key("roseNum"), num, function(err, res){
        debug('set ' + MameDB.key("roseNum") + ' to ' + num + '. reply: ', res);
    });
};

MameDB.incrRose = function() {
    redis.incr(MameDB.key("roseNum"), function(err, res){
        debug('add 1 to ' + MameDB.key("roseNum") + '. reply: ', res);
    });
};

module.exports = MameDB;

