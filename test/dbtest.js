var should = require('chai').should();
var mamedb = require('../modules/db.js');

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
});


