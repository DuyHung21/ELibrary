'use strict';
const mysql = require('mysql');
let pool;
if (process.env.NODE_ENV === 'test') {
	pool = mysql.createPool({
		connectionLimit : 20,
	  	host     : process.env.db_host_test,
	  	user     : process.env.db_user_test,
	  	password : process.env.db_password_test,
	  	database : process.env.db_database_test
	});
} else if (process.env.NODE_ENV === 'production') {
	pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);	
} else {
	console.log("Dev");
	pool = mysql.createPool({
		connectionLimit : 20,
	  	host     : process.env.db_host_dev,
	  	user     : process.env.db_user_dev,
	  	password : process.env.db_password_dev,
	  	database : process.env.db_database_dev
	});
}

const gracefulShutdown = function (msg, callback) {
	pool.end(function(err) {
		console.log(msg);
		callback();
	})
};

// For nodemon restarts                                 
process.once('SIGUSR2', () => {
	gracefulShutdown('nodemon restart', () => {
		process.kill(process.pid, 'SIGUSR2');
	});
});
// For app termination
process.on('SIGINT', () => {
	gracefulShutdown('app termination', () => {
    	process.exit(0);
  	});
});
// For Heroku app termination
process.on('SIGTERM', () => {
  	gracefulShutdown('Heroku app shutdown', () => {
    	process.exit(0);
  	});
});


module.exports = pool;