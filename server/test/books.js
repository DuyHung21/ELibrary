process.env.NODE_ENV = 'test';

require("./users.js")


const fs = require('fs');
const path = require('path');
const server = require('../app');
const db = require('../app_api/model/db');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const Book = require('../app_api/controller/books');
const BookLog = require('../app_api/controller/booklogs');

const bookuploadDir = path.resolve('../upload');
const bookDest = '/book/file';
const thumbDest = '/book/thumb';
const demoDest = '/book/demo';

chai.use(chaiHttp);
let token;
let userId;

const _startConnection = (cb) => {
	db.getConnection((err, connection) => {
		if (err) {
			console.log("Error in step0: " + err);
		} else {
			cb(connection);
		}
	})
}

const _resetBookDatabase = (cb) => {
	_startConnection((connection)=> {
		_removeForeignKey(connection, (connection)=> {
			_truncateBook(connection, (connection)=> {
				_truncateBooklog(connection, (connection)=> {
					_setForeignKey(connection, (connection)=> {
						_endConnection(connection, cb);
					})
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

const _truncateBook = (connection, cb) => {
	let query = 'TRUNCATE TABLE BOOK;'
	connection.query(query, (err, result, fields) => {
		if (err) {
			console.log("Error at step 2: " + err);
		} else {
			cb(connection);
		}
	})
}

const _truncateBooklog = (connection, cb) => {
	let query = 'TRUNCATE TABLE BOOKLOG;'
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

const _emptyFolder = (path)=> {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach((file, index)=>{
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				_emptyFolder(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
	}
}

describe('Books', () => {
	before((done)=> {
		const uploadDir = path.resolve(__dirname, 'upload')
		_emptyFolder(path.join(uploadDir, bookDest))
		_emptyFolder(path.join(uploadDir, thumbDest))
		_emptyFolder(path.join(uploadDir, demoDest))

		_resetBookDatabase(()=> {

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

	describe('Upload book', ()=> {
		it("It should requires authentication", (done)=> {
			chai.request(server)
				.post('/api/books')
				.set('content-type', 'multipart/form-data')
				.field("name", "test")
				.field("author", "test")
				.field("description", "test")
				.field("category", 1)
				.field("userId", "1")	
				.attach('file', fs.readFileSync(path.resolve('./test/test.pdf')), 'test.pdf')				

				.end((err, res)=> {
					res.should.have.status(401);
					done();
				})
		})
		it("It should upload suceessfully", (done)=> {
			chai.request(server)
				.post('/api/books')
				.set('Authorization', 'Bearer '+ token)
				.set('content-type', 'multipart/form-data')
				.field("name", "test")
				.field("author", "test")
				.field("description", "test")
				.field("category", 1)
				.field("userId", "1")	
				.attach('file', fs.readFileSync(path.resolve('./test/test.pdf')), 'test.pdf')				

				.end((err, res)=> {
					res.should.have.status(201);
					done();
				})
		})

		it ("Booklog should be updated", (done)=> {
			chai.request(server)
				.get('/api/books/1/log')
				.set('Authorization', 'Bearer ' + token)
				.end((err, res)=> {
					res.should.have.status(200);
					expect(res.body.length).to.equal(1);
					done();
				})
		})
	});

	describe('Get all books', ()=> {
		it("It should get suceessfully and return 1 book", (done)=> {
			chai.request(server)
				.get("/api/books")
				.end((err, res)=> {
					res.should.have.status(200);
					done();
				})
		})

	});

	describe('Get one book', ()=> {
		it("It should get suceessfully", (done)=> {
			chai.request(server)
				.get('/api/books/1')
				.end((err, res)=> {
					res.should.have.status(200);
					done();
				})
		})

		it ("Book should be viewed", (done)=> {
			chai.request(server)
				.get('/api/books/1/viewed')
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property("COUNT");
					expect(res.body.COUNT).to.equal(1);
					done();
				})
		})

		it ("It should get image successfully", (done)=> {
			chai.request(server)
				.get('/api/books/1')
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('FIRST_PAGE_URL');
					chai.request(server)
						.get(res.body.FIRST_PAGE_URL)
						.end((err, res)=> {
							res.should.have.status(200);
							done()
						})
				})
		})

		it ("It should get demo suceessfully", (done)=> {
			chai.request(server)
				.get('/api/books/1')
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('DEMO_URL');					
					chai.request(server)
						.get(res.body.DEMO_URL)
						.set('Authorization', 'Bearer '+ token)						
						.end((err, res)=> {
							res.should.have.status(200);
							done()
						})
				})
		})


		it ("It should require authentication to get book", (done)=> {
			chai.request(server)
				.get('/api/books/1')
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('BOOK_URL');					
					chai.request(server)
						.get(res.body.BOOK_URL)
						.end((err, res)=> {
							res.should.have.status(401);
							done()
						})
				})
		})


		it ("It should get pdf suceessfully", (done)=> {
			chai.request(server)
				.get('/api/books/1')
				.end((err, res)=> {
					res.should.have.status(200);
					res.body.should.have.property('BOOK_URL');					
					chai.request(server)
						.get(res.body.BOOK_URL)
						.set('Authorization', 'Bearer '+ token)						
						.end((err, res)=> {
							res.should.have.status(200);
							done()
						})
				})
		})



	})

})


