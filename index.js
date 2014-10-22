
var knox = require('knox');

module.exports = createS3Store;

function createS3Store(options) {
  var namespace = options.namespace;
  var client = knox.createClient(options);

  return {
    writeObject: writeObject,
    readObject: readObject,
    deleteObject: deleteObject,
    readKeys: readKeys
  };

  function writeObject(key, object, cb) {
    var data = JSON.stringify(object);
    var s3Key = createS3Key(key);
    var req = client.put(s3Key, {
      'Content-Length': data.length,
      'Content-Type': 'application/json'
    });
    req.on('response', function (res) {
      if (res.statusCode !== 200) {
        return cb(new Error('bad S3 status ' + res.statusCode));
      }
      cb();
    });
    req.end(data);
  }

  function readObject(key, cb) {
    var s3Key = createS3Key(key);
    client.get(s3Key).on('response', function (res) {
      if (res.statusCode !== 200) {
        return cb(new Error('bad S3 status ' + res.statusCode));
      }
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });
      res.on('end', function () {
        var object = JSON.parse(data);
        cb(null, object);
      });
    }).end();
  }

  function deleteObject(key, cb) {
    var s3Key = createS3Key(key);
    client.del(s3Key).on('response', function (res) {
      if (res.statusCode !== 204) {
        return cb(new Error('bad S3 status ' + res.statusCode));
      }
      cb();
    }).end();
  }

  function readKeys(cb) {
    var prefix = createS3Key('');
    client.list({prefix: prefix}, function (err, data) {
      if (err) return cb(err);
      var keys = data.Contents.map(function (each) {
        var s3Key = each.Key;
        var key = s3Key.slice(prefix.length);
        return key;
      });
      cb(null, keys);
    });
  }

  function createS3Key(key) {
    return namespace + '/' + key;
  }
}
