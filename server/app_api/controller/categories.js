'use strict';

const db = require('../model/db');

const find = (req, res)=> {
	db.getConnection((err, connection) => {
		let queryStatement = "SELECT * FROM CATEGORY"
		connection.query(queryStatement, (error, results, fields) => {
			connection.release();
			if (error) {
	    		res
	    			.status(400)
	    			.json(error)
	    	} else {
	    		res
	    			.status(200)
	    			.json({
	    				categories: results
	    			})
	    	}
		})
	})
}

module.exports = {
	find: find,
}