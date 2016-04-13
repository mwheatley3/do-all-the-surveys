var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var db = require('./models/index.js');

require('./middleware.js')(app, express);

app.listen(port);
console.log("Listening on port", port);
