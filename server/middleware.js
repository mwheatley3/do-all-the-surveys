var bodyParser = require('body-parser');
var Path = require('path');

module.exports = function(app, express){

	var userRouter = express.Router();
	var adminRouter = express.Router();
	// var reportRouter = express.Router();

	var assetFolder = Path.resolve(__dirname, '../client/');
	app.use( express.static(assetFolder) );
	app.use( bodyParser.json() );

	app.use('/user', userRouter);
	app.use('/admin', adminRouter);
	// app.use('/api/report', reportRouter);

   // inject our routers into their respective route files
  require('./routers/userRouter.js')(userRouter);
  require('./routers/adminRouter.js')(adminRouter);
  // require('./report/reportRouter.js')(reportRouter);

}