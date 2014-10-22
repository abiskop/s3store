
var assert = require('assert');
var createS3Store = require('../index');
var uuid = require('node-uuid').v4;
var credentials = require('./credentials');

var options = {
  key: credentials.key,
  secret: credentials.secret,
  bucket: 's3store-test',
  region: 'eu-west-1',
  namespace: 'test_' + uuid()
};
var store = createS3Store(options);

var key1 = 'abc';
var obj1 = {
  a: 1,
  b: 'c'
};

var key2 = 'def';
var obj2 = {
  d: 2,
  e: 'f'
};

describe('s3store', function () {
  it('should write object1', function (done) {
    store.writeObject(key1, obj1, done);
  });
  it('should read object1', function (done) {
    store.readObject(key1, function (err, obj) {
      assert.deepEqual(obj, obj1);
      done();
    });
  });
  it('should write object2', function (done) {
    store.writeObject(key2, obj2, done);
  });
  it('should read all keys', function (done) {
    store.readKeys(function (err, keys) {
      assert.deepEqual(keys, [key1, key2]);
      done();
    });
  });
  it('should delete object1', function (done) {
    store.deleteObject(key1, done);
  });
  it('should only receive object2\'s key', function (done) {
    store.readKeys(function (err, keys) {
      assert.deepEqual(keys, [key2]);
      done();
    });
  });
  it('should delete object2', function (done) {
    store.deleteObject(key2, done);
  });
});
