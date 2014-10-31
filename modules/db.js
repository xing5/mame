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

MameDB.getScore = function(id, name, callback) {
    var val = 0;
    redis.hgetall(MameDB.key(name+'-'+id), function(err, res){
        debug('Value of ' + MameDB.key(name+'-'+id) + ' is ', res);
        if (res) {
            var totalNum = 0;
            var totalVal = 0;
            for (var field in res) {
                totalNum += parseInt(res[field]);
                totalVal += parseInt(field)*parseInt(res[field]);
            }
            val = 1.0*totalVal/totalNum;
        }
        callback(val);
    });
};

MameDB.getAllScore = function(id, callback){
    var score = {morality:0, intelligence:0, shape:0, look:0, career:0};
    MameDB.getScore(id, 'morality', function(m){
        score.morality = m;
        MameDB.getScore(id, 'intelligence', function(i){
            score.intelligence = i;
            MameDB.getScore(id, 'shape', function(s){
                score.shape = s;
                MameDB.getScore(id, 'look', function(l){
                    score.look = l;
                    MameDB.getScore(id, 'career', function(c) {
                        score.career = c;
                        callback(score);
                    });
                });
            });
        });
    });
};


MameDB.setAllScore = function(id, score){
    if (score.hasOwnProperty('morality')) {
        redis.hincrby(this.key('morality-'+id), score.morality, 1);
    }
    if (score.hasOwnProperty('intelligence')) {
        redis.hincrby(this.key('intelligence-'+id), score.intelligence, 1);
    }
    if (score.hasOwnProperty('shape')) {
        redis.hincrby(this.key('shape-'+id), score.shape, 1);
    }
    if (score.hasOwnProperty('look')) {
        redis.hincrby(this.key('look-'+id), score.look, 1);
    }
    if (score.hasOwnProperty('career')) {
        redis.hincrby(this.key('career-'+id), score.career, 1);
    }
};

MameDB.addComment = function(id, comment) {
    redis.zincrby(this.key('comment-'+id), 1, comment);
}

MameDB.getComments = function(id, callback) {
    redis.zrevrange([this.key('comment-'+id), 0, 100, 'WITHSCORES'], function(err, rst) {
        var comments = {};
        if (rst) {
            for (var i = 0; i + 1 < rst.length; i+=2) {
                comments[rst[i]] = rst[i+1];
            }
        }
        callback(comments);
    });
}

MameDB.getLetter = function(password, callback) {
    redis.get(MameDB.key('letter-password'), function(err, res){
        if (password == res) {
            redis.get(MameDB.key('letter-content'), function(err, letter){
                callback({ret:0, data:letter});
            });
        } else {
            callback({ret:-1});
        }
    });
}

module.exports = MameDB;

