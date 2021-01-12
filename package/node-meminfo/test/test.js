'use strict';

const expect = require('chai').expect;

const meminfo = require('../index');

describe('get', function() {
  it('should get the data from /proc/meminfo', function() {
    var result = meminfo.get();
    expect(result).to.be.an('object');
  });
});


describe('free', function() {
  it('should get the data from /proc/meminfo and the output format is like the command "free"', function() {
    var result = meminfo.free();
    expect(result).to.be.an('object');
    expect(result.mem).to.be.an('object');
    expect(result.swap).to.be.an('object');
    expect(result.mem.total).to.be.a('number');
    expect(result.mem.used).to.be.a('number');
    expect(result.mem.free).to.be.a('number');
    expect(result.mem.shared).to.be.a('number');
    expect(result.mem.buff).to.be.a('number');
    expect(result.mem.cache).to.be.a('number');
    expect(result.mem.available).to.be.a('number');
    expect(result.swap.total).to.be.a('number');
    expect(result.swap.used).to.be.a('number');
    expect(result.swap.free).to.be.a('number');
  });
});
