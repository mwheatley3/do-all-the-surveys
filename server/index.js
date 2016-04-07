var express = require('express');
var app = express();
var port = process.env.PORT || 4000;
var db = require('./models/index.js');

// configure our server with all the middleware and routing

require('./middleware.js')(app, express);

// Start the server!
app.listen(port);
console.log("Listening on port", port);