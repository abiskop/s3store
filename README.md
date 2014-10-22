
#s3store
[![Build Status](https://travis-ci.org/mirkokiefer/s3store.png?branch=master)](https://travis-ci.org/mirkokiefer/s3store)

Use AWS S3 as a database for objects.

##Documentation
###createClient(options)

``` js
var createClient = require('s3store');
var options = {
  key: 'aws_key',
  secret: 'aws_secret',
  bucket: 'mybucket',
  region: 'eu-west-1',
  namespace: 'mydb'
};
var client = createClient(options);
```

###client.writeObject(key, object, cb)
Write an object with the given key.

###client.readObject(key, cb)
Read an object.

###client.deleteObject(key, cb)
Delete an object.

###client.readKeys(cb)
Read all keys.

