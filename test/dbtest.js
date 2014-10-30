var should = require('chai').should();
var mamedb = require('../modules/db');

describe('MameDB', function() {
    before(function(){
        mamedb.setTest(true);
    });

    it('setRose(10) should work properly', function(done){
        mamedb.setRose(10);
        done();
    });

    it('getRose() should returen 10', function(done){
        mamedb.getRose(function (res){
            parseInt(res).should.equal(10);
            done();
        });
    });

    it('setAllScore() should work properly', function(done){
        mamedb.setAllScore('me', {morality:5, intelligence:5, shape:5, look:5, career:5});
        mamedb.getAllScore('me', function(score){
            console.log(score);
            done();
        });
    });

    it('getAllScore() should work properly', function(done){
        mamedb.setAllScore('me', {morality:3, intelligence:3, shape:3, look:3, career:3});
        mamedb.getAllScore('me', function(score){
            console.log(score);
            done();
        });
    });
});


