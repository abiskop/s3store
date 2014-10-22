
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

require('./interface')(store);
