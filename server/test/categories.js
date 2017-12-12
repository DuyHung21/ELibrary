'use strict';
require("./users.js")

process.env.NODE_ENV = 'test';
const server = require('../app');
const db = require('../app_api/model/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

chai.use(chaiHttp);

let token

const _startConnection = (cb) => {
	db.getConnection((err, connection) => {
		if (err) {
			console.log("Error in step0: " + err);
		} else {
			cb(connection);
		}
	})
}

const _resetCategoryDatabase = (cb) => {
	_startConnection((connection)=> {
		_removeForeignKey(connection, (connection)=> {
			_truncateCategory(connection, (connection)=> {
				_setForeignKey(connection, (connection)=> {
					_endConnection(connection, cb);
				})
			})
		})
	});
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

const _truncateCategory = (connection, cb) => {
	let query = 'TRUNCATE TABLE CATEGORY;'
	connection.query(query, (err, result, fields) => {
		if (err) {
			console.log("Error at step 2: " + err);
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

describe('Categories', () => {
	before((done)=> {
		_resetCategoryDatabase(()=> {
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
					token = res.body.token;
					done();
				})

		})
	})

	describe("Get Categories", ()=> {
		it("It should get categories successfully", (done)=> {
			chai.request(server)
				.get('/api/categories')
				.end((err, res)=> {
					res.should.have.status(200)
					res.body.should.have.property("categories")
					done()
				})
		})
	})
})