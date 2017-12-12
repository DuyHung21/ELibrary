'use strict';

process.env.NODE_ENV = 'test';
const server = require('../app');
const db = require('../app_api/model/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);


const _resetUserDatabase = (cb) => {
	_startConnection((connection)=> {
		_removeForeignKey(connection, (connection)=> {
			_truncateUser(connection, (connection)=> {
				_truncateUserlog(connection, (connection)=> {
					_setForeignKey(connection, (connection)=> {
						_endConnection(connection, cb);
					})
				})
			})
		})
	});
}

const _startConnection = (cb) => {
	db.getConnection((err, connection) => {
		if (err) {
			console.log("Error in step0: " + err);
		} else {
			cb(connection);
		}
	})
}


const _removeForeignKey = function(connection, cb) {
	let query = 'SET FOREIGN_KEY_CHECKS = 0;'
	connection.query(query, (err, result, fields) => {
		if (err) {
			console.log("Error at step 1: " + err);
		} else {
			cb(connection);
		}
	})
}

const _truncateUser = (connection, cb) => {
	let query = 'TRUNCATE TABLE USER;'
	connection.query(query, (err, result, fields) => {
		if (err) {
			console.log("Error at step 2: " + err);
		} else {
			cb(connection);
		}
	})
}

const _truncateUserlog = (connection, cb) => {
	let query = 'TRUNCATE TABLE USERLOG;'
	connection.query(query, (err, result, fields) => {
		if (err) {
			console.log("Error at step 3: " + err);
		} else {
			cb(connection);
		}
	})
}

const _setForeignKey = (connection, cb) => {
	let query = 'SET FOREIGN_KEY_CHECKS = 0;'
	connection.query(query, (err, result, fields) => {
		if (err) {
			console.log("Error at step 4: " + err);
		} else {
			cb(connection);
		}
	})
}

const _endConnection = (connection, cb) => {
	connection.release();
	cb();
} 

describe('User', () => {
	before((done) => {
		//Clear user db
		_resetUserDatabase(() => {
			done();
		})
	})

	describe('Register', () => {
		it ('It should register sucessfully', (done) => {
			let user = {
				username: 'test',
				password: 'test',
				email: 'test@test.com',
				fullname: 'test',
			};

			chai.request(server)
				.post('/api/users')
				.type('form')
				.send(user)
				.end((err, res) => {
					res.should.have.status(201);
					res.body.should.have.property('token');
					done();
				})
		});

		it ('It should throw error due to duplicate username', (done) => {
			let user = {
				username: 'test',
				password: 'test',
				email: 'test@test.com',
				fullname: 'test',
			};

			chai.request(server)
				.post('/api/users')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					done();
				})
		})
	})

	describe('Login', ()=> {
		it ('It should login fail', (done)=> {
			let form = {
				username: 'a',
				password: 'a'
			};

			chai.request(server)
				.post('/api/users/login')
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(401);
					done();
				})
		})

		it ('It should login successfully and retunr token', (done)=> {
			let form = {
				username: 'test',
				password: 'test'
			}

			chai.request(server)
				.post('/api/users/login')
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('token');
					done();
				})
		})

	})

	describe('Change info', () => {
		it ('It shoudl change info successfully', (done)=> {
			let form = {
				username: 'test',
				password: 'test'
			}


			chai.request(server)
				.post('/api/users/login')
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('token');
					let user = {
						username: 'test',
						email: 'test'
					}
					chai.request(server)
						.put('/api/users/1')
						.set('Authorization', 'Bearer ' + res.body.token)
						.type('form')
						.send(user)
						.end((error, res)=> {
							//console.log(error)
							res.should.have.status(200);
							res.body.should.have.property('token');
							done()
						})
				})

		})
	})

	describe('Change password', () => {
		it ('It shoudl change password successfully', (done)=> {
			let form = {
				username: 'test',
				password: 'test'
			}


			chai.request(server)
				.post('/api/users/login')
				.type('form')
				.send(form)
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('token');
					let newPass = {
						username: 'test',
						curPassword: 'test',
						newPassword: 'test'
					}
					chai.request(server)
						.put('/api/users/1/password')
						.set('Authorization', 'Bearer ' + res.body.token)
						.type('form')
						.send(newPass)
						.end((error, res)=> {
							res.should.have.status(200);
							res.body.should.have.property('token');
							done()
						})
				})

		})
	})


	//describe('It should rqui')


})

