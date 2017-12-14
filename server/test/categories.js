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



const _endConnection = (connection, cb) => {
	connection.release();
	cb();
} 

describe('Categories', () => {
	before((done)=> {
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
				})	})

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