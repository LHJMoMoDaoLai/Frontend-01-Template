var mod = require("../src/add")

// var  assert =require("assert")



var assert = require('assert');
describe('Array', function () {
  describe('#indexOf()', function () {
    it('should return -1 when the value is not present', function () {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});

// const test = require('ava');

// test('foo', t => {
//     if(mod.add(1,2)===3)
// 	    t.pass();
// });
