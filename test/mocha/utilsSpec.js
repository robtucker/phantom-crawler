var chai = require('chai');
var expect = require('chai').expect;
var utils = require('../../src/shared/utils');

describe('validateUrl', function(){
    it('validates an http url', function(){
        var input = 'http://example.co.uk';
        expect(utils.validateUrl(input)).to.equal(true);
    })
    it('validates an https url', function(){
        var input = 'https://www.example.linkedin.com/profile/view?id=AAMAABXKAGYBqM81RuWmNMEeFPbXB6Q_6UzQDuk&authType=name&authToken=idW2&trk=hp-feed-member-name';
        expect(utils.validateUrl(input)).to.equal(true);
    })
    it('rejects random text', function(){
        var input = 'http.random text';
        expect(utils.validateUrl(input)).to.equal(false);
    })
});