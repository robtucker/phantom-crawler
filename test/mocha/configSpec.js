var chai = require('chai');
var expect = require('chai').expect;
var config = require('../../src/config');

describe('config', function(){
    console.log(config);
    it('exposes default phantom executable path', function(){
        expect(config.phantom.executable).to.be.a('string');
    })
    it('exposes an environment global', function(){
        expect(config.env).to.be.a('string');
    })
    it('exposes an isProd boolean', function(){
        expect(config.isProd).to.be.a('boolean');
    })
});
