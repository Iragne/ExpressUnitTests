Expressjs-unit-tests
===================


Install
-------

```
$npm install expressjs-unit-tests
```


Use in your tests
---

Use this function for run unit tests
unitTests.testGenerate(express_app,PORT, cb);
```

var unitTests = require('expressjs-unit-tests');
var app = require('../server.js').express_app();

unitTests.testGenerate(app,3300, function(){});
```

Use with mocha
---

Use this function for run unit tests
unitTests.testGenerate(express_app,PORT, cb);
```

var unitTests = require('expressjs-unit-tests');
var app = require('../server.js').express_app();
describe('Express untits Tests ', function(){
    unitTests.testGenerate(app,3300, function(){});
});
```









