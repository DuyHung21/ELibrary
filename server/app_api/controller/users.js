"use strict";

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const db = require('../model/db');
const ROLES = require('./enums').USER_ROLE;
const algorithm = 'sha1';


const validateUser = (username, password, cb) => {
	_findOneByUserName(username, (err, user) => {
		if (err) cb(err);
		else if (!user) cb(null, null);
		else {
			if (!_validPassword(user.USER_PASSWORD, user.USER_SALT, password)) cb(null, null);
			else cb(null, user); 
		}
	})
}

const register = (req, res) => {
	_create(req.body, (error, results)=> {
		    			// Handle error after the release.
    	if (error) {
    		res
    			.status(400)
    			.json(error)
    	} else {
    		const token = _generateJwt({
    			USER_ID: results.insertId,
    			USER_EMAIL: req.body.email,
    			USER_NAME: req.body.username,
    			USER_FULLNAME: req.body.fullname,
   				USER_ADDRESS: req.body.address,
    			USER_PHONE: req.body.phone,
    			USER_ROLE: ROLES.USER
    		}); 
    		res
    			.status(201)
    			.json({
    				"token": token
    			})
    	}

	})
};

const afterLogin = (req, res) => {
	let token = _generateJwt(req.user);
	res.status(200).json({
		"token": token
	});
}

const _generateJwt = (user) => {
	let expiry = new Date();
	let timeLive;
	switch(user.USER_ROLE) {
		case ROLES.ADMIN:
			timeLive = 1;
			break;
		case ROLES.LIBRARIAN:
			timeLive = 7;
			break;
		case ROLES.USER:
			timeLive = 30;
			break;
	}

	expiry.setDate(expiry.getDate() + timeLive);

	return jwt.sign({
		id: user.USER_ID,
		email: user.USER_EMAIL,
		username: user.USER_NAME,
		fullname: user.USER_FULLNAME,
		address: user.USER_ADDRESS,
		phone: user.USER_PHONE,
		role: user.USER_ROLE,
		exp: parseInt(expiry.getTime() / 1000)
	}, process.env.JWT_SECRET);
}

const _create = (user, cb)=> {
	db.getConnection((err, connection) => {
		let queryStatement = 'INSERT INTO ' 
			+ 'USER(USER_NAME,USER_PASSWORD,USER_SALT,USER_EMAIL,USER_FULLNAME,USER_ADDRESS,USER_PHONE, USER_ROLE) '
  			+ 'VALUES (?,?,?,?,?,?,?,?)'
	  	// Use the connection

	  	let password = _setPassword(user.password);

  		connection.query(queryStatement,
  			[user.username, 
  			password.hash,
  			password.salt, 
  			user.email, 
  			user.fullname,
  			user.address,
  			user.phone,
  			user.role?user.role:ROLES.USER], 
  			(error, results, fields) => {
    			// And done with the connection.
    			connection.release();

    			cb(error, results)
    			// Don't use the connection here, it has been returned to the pool.
  			});
	});
}

const _findOneByEmail = (email, cb) => {
	db.getConnection((err, connection) => {
		let queryStatement = "SELECT * from USER where USER_EMAIL = ?";
		connection.query(queryStatement, [email], (error, results, fields) => {
			connection.release();
			cb(error, results);
		})
	})
};

const _findOneByUserName = (username, cb)=> {
	db.getConnection((err, connection) => {
		let queryStatement = "SELECT * from USER where USER_NAME = ?";
		connection.query(queryStatement, [username], (error, results, fields) => {
			connection.release();
			cb(error, results[0]);
		})
	})
}

const updateUser = (req, res) => {
	db.getConnection((err, connection) => {
		let array = []
		let queryStatement = "UPDATE USER SET "
		if (req.body.username) {
			queryStatement += "USER_NAME = ?";
			array.push(req.body.username)
		}
		if (req.body.email) {
			queryStatement += ",USER_EMAIL = ?";
			array.push(req.body.email)
		}
		if (req.body.fullname) {
			queryStatement += ",USER_FULLNAME = ?";
			array.push(req.body.fullname)
		}

		if (req.body.phone) {
			queryStatement += ",USER_PHONE = ? ";
			array.push(req.body.phone)
		}
		queryStatement += " WHERE USER_ID = ?"
		array.push(parseInt(req.params.userId))
		connection.query(queryStatement, 
			array,
			(error, results, fields) => {
				connection.release();
				if (error) {
					res.status(400).json(error)
				} else {
					const token = _generateJwt({
    					USER_ID: req.params.userId,
    					USER_EMAIL: req.body.email,
    					USER_NAME: req.body.username,
    					USER_FULLNAME: req.body.fullname,
    					USER_ADDRESS: req.body.address,
    					USER_PHONE: req.body.phone,
    					USER_ROLE: req.body.role?req.body.role:ROLES.USER
    				}); 

					res.status(200).json({"token": token})
				}
			})

	})
}

const updatePassword = (req, res)=> {
	validateUser(req.body.username, req.body.curPassword, (err, user)=> {
		if (err | !user) {
			res.status(400).json("Old password is correct")
		} else {
			db.getConnection((dbErr, connection)=> {
				let password = _setPassword(req.body.newPassword);
				let statement = "UPDATE USER SET USER_PASSWORD = ?, USER_SALT = ? WHERE USER_ID = ?"
				connection.query(statement, [password.hash, password.salt, req.params.userId], (queryErr, result, fields)=> {
					connection.release()
					if (queryErr) {
						res.status(500).json(queryErr)
					} else {
						const token = _generateJwt({
	    					USER_ID: user.USER_ID,
	    					USER_EMAIL: user.USER_EMAIL,
	    					USER_NAME: user.USER_NAME,
	    					USER_FULLNAME: user.USER_FULLNAME,
	    					USER_ADDRESS: user.USER_ADDRESS,
	    					USER_PHONE: user.USER_PHONE,
	    					USER_ROLE: ROLES.USER

						}) 

						res.status(200).json({"token": token})
					}
				})
			})
		} 
	})
}


const _setPassword =(password)=> {
	let salt =  crypto.randomBytes(16).toString('hex');
	let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, algorithm).toString('hex');

	return {
		salt: salt,
		hash: hash
	}
}

const _validPassword = (hash, salt, password) => {
	let temp = crypto.pbkdf2Sync(password, salt, 1000, 64, algorithm).toString('hex');
	return temp === hash;
}

const librarian_default = {
	username: "librarian",
	password: "librarian",
	email: "librarian@librarian.com",
	fullname: "librarian",
	role: 2
}

const admin_default = {
	username: "admin",
	password: "admin",
	email: "admin@admin.com",
	fullname: "admin",
	role: 1
}

_create(librarian_default, (error, results)=> {})

_create(admin_default, (error, results)=>{})

module.exports = {
	afterLogin,
	register,
	validateUser,
	updateUser,
	updatePassword
};