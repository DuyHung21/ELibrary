"use strict";

const fs = require('fs');
const db = require('../model/db');
const booklogCtrl = require('./booklogs.js');
const multer = require('multer');
const gm = require('gm');
const path = require('path');
const PDFDocument = require('pdfkit');
const BOOK_ACTIONS = require('./enums.js').BOOK_ACTIONS;
const BOOK_STATUS = require('./enums.js').BOOK_STATUS;

const USER_ROLE = require('./enums.js').USER_ROLE;
const Dropbox = require('dropbox');


let uploadFolderName;
let uploadFolderDir;
const baseDir = path.resolve(__dirname, '..', '..')
if (process.env.NODE_ENV == 'test') {
	uploadFolderName = process.env.upload_dir_test;
} else {
	uploadFolderName = process.env.upload_dir_dev;
}

uploadFolderDir = path.join(baseDir, uploadFolderName);

let bookDest = '/book/file/';
let thumbDest = '/book/thumb/';
let demoDest = '/book/demo/';


if (process.env.NODE_ENV == 'test') {
	bookDest = '/test/file/';
	thumbDest = '/test/thumb/';
	demoDest = '/test/demo/';
}

const dbx = new Dropbox({ accessToken: process.env.dropbox_accesstoken });


const GUESS = require('./enums.js').USER_GUESS

const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single('file');


const find = (req, res) => {
	const option = req.query;
	if (option.categoryId) {
		let queryStatement = 'SELECT * from BOOK where CATEGORY_ID = ? AND BOOK_STATUS = ? ';
		queryStatement = _addionalOption(queryStatement, option)
		db.getConnection((err, connection) => {
			connection.query(queryStatement,[option.categoryId, BOOK_STATUS.APPROVED], (error, results, fields) => {
				connection.release();
				if (error) {
	    			res
	    				.status(400)
	    				.json(error)
	    		} else {
	    			res
	    				.status(200)
	    				.json(results)
	    		}

			})
		})
		
	} else if (option.userId) {
		let target = option.action;
		let queryStatement = "SELECT * FROM BOOK " +
								"INNER JOIN BOOKLOG " +
								"ON BOOK.BOOK_ID = BOOKLOG.BOOK_ID " +
								"where USER_ID = ? " +
								"and ACTION_ID = ? "
		let ACTION_ID;
		if (target == "downloaded") ACTION_ID = BOOK_ACTIONS.DOWNLOADED;
		else if (target == "uploaded") ACTION_ID = BOOK_ACTIONS.UPLOADED;
		else {
			res.status(400).json("Bad request");
			return;
		}
		queryStatement = _addionalOption(queryStatement, option)
		db.getConnection((err, connection) => {
			connection.query(queryStatement,[option.userId, ACTION_ID], (error, results, fields) => {
				connection.release();
				if (error) {
	    			res
	    				.status(400)
	    				.json(error)
	    		} else {
	    			res
	    				.status(200)
	    				.json(results)
	    		}

			})
		})
	} else if (option.name) {
		let queryStatement = 'SELECT * from BOOK where BOOK_NAME = ? AND BOOK_STATUS = ? ';
		queryStatement = _addionalOption(queryStatement, option)
		db.getConnection((err, connection) => {
			connection.query(queryStatement,[option.name, BOOK_STATUS.APPROVED], (error, results, fields) => {
				connection.release();
				if (error) {
	    			res
	    				.status(400)
	    				.json(error)
	    		} else {
	    			res
	    				.status(200)
	    				.json(results)
	    		}

			})
		})
	} else {
		let queryStatement = 'CREATE TEMPORARY TABLE IF NOT EXISTS VIEWCOUNT AS ' +
								'(SELECT BOOK_ID, COUNT(LOG_ID) as COUNT ' +
								'FROM BOOKLOG ' + 
								'where ACTION_ID= ? '+
								'group by BOOK_ID);' 
							
		db.getConnection((err, connection) => {
			connection.query(queryStatement, [BOOK_ACTIONS.VIEWED], (error, results, fields) => {
				if (error) {
					console.log(error)
			    	res
			    		.status(400)
			    		.json(error)
			    	return 
			    }
				let statement2 = 'SELECT BOOK.*, VIEWCOUNT.COUNT ' + 
							'FROM ' + 
							'BOOK LEFT JOIN VIEWCOUNT ' + 
							'ON BOOK.BOOK_ID = VIEWCOUNT.BOOK_ID ' +
							'WHERE BOOK_STATUS = ? '
				statement2 = _addionalOption(statement2, option);
				connection.query(statement2, [BOOK_STATUS.APPROVED], (error ,results, fields)=> {
					let statement3 = "DROP TABLE VIEWCOUNT"
					connection.query(statement3, (error, results3, fields)=> {
						connection.release();
						if (error) {
							console.log(error);
			    			res
			    				.status(400)
			    				.json(error)
			    		} else {
			    			res
			    				.status(200)
			    				.json(results)
			    		}


					})
				})

			})
		})

	} 
}

const librarianFind = (req, res)=> {
	console.log(req.payload);
	const user = req.payload;
	if (user.role != USER_ROLE.LIBRARIAN) {
		res.status(401).json("Permission required");
		return;
	}
	let queryStatement = 'SELECT * from BOOK';
		// queryStatement = _addionalOption(queryStatement, option)
			db.getConnection((err, connection) => {
				connection.query(queryStatement, (error, results, fields) => {
					connection.release();
					if (error) {
		    			res
		    				.status(400)
		    				.json(error)
		    		} else {
		    			res
		    				.status(200)
		    				.json(results)
		    		}

				})
			})


}

const findOne = (req, res) => {
	let queryStatement = 'SELECT * from BOOK where BOOK_ID = ?';
	let user;
	if (req.headers.authorization) {
		let raw_token = req.headers.authorization.split(" ")[1];
		if (raw_token) {
			let user_info_token = raw_token.split(".")[1];
			if (user_info_token) {
				user = JSON.parse(new Buffer(user_info_token, 'base64').toString('ascii'));
			}
		}
	}
	db.getConnection((err, connection) => {
		connection.query(queryStatement, [req.params.bookId], (error, results, fields) => {
			connection.release();
			if (error) {
				res.status(400).json(error)
			} else {
				booklogCtrl.createViewedLog(req.params.bookId, user?user.id:GUESS.USER_ID);
				res.status(200).json(results[0])
			}
		})
	})
}

const create = (req, res) => {
	_upload(req, res, (err, result)=> {
		if (err) {
			res.status(500).json(err);
		} else {
			res.status(201).json("Success");
		}
	})

}

const countView = (req, res)=> {
	booklogCtrl.countViewedLog(req.params.bookId, (error, result)=> {
		if (error) {
			res.status(400).json(error)
		} else {
			res.status(200).json(result)
		}
	})
}



const downloadImg = (req, res) => {
	const name = req.params.name;
	const link = thumbDest + name;
	dbx.filesDownload({path: link})
		.then((data)=> {
			res.contentType("application/jpeg");
			res.status(200);
			res.send(data);
		})
		.catch((err)=> {
			res.status(500).json(err)

		})
}

const downloadPdf = (req, res) => {
	const name = req.params.name;
	const link = bookDest + name;
	const book_id = req.query.bookId;
	dbx.filesDownload({path: link})
		.then((data)=> {
			booklogCtrl.createDownloadedLog(book_id, req.query.userId);

			res.contentType("application/pdf")
			res.status(200)
			res.send(data)
		})
		.catch((err)=> {
			res.status(500).json(err)

		})
}

const downloadDemo = (req, res) => {
	const name = req.params.name;
	const link = demoDest + name;
	dbx.filesDownload({path: link})
		.then((data)=> {
			res.contentType("application/pdf")
			res.status(200)
			res.send(data)
		})
		.catch((err)=> {
			// console.log(err)
			res.status(500).json(err)

		})
}

const approve = (req, res) => {
	const user = req.payload;
	if (user.role != USER_ROLE.LIBRARIAN) {
		res.status(401).json("Not allowed")
	} else {
		_changeStatus(req.params.bookId, BOOK_STATUS.APPROVED, (err, results)=> {

			if (err) {
				res.status(500).json(err);
				return;
			}

			res.status(200).json("Success");
			booklogCtrl.createApprovedLog(req.params.bookId, user.id);
		})
	}
}

const reject = (req, res)=> {
	const user = req.payload;
	if (user.role != USER_ROLE.LIBRARIAN) {
		res.status(401).json("Not allowed")
	} else {
		_changeStatus(req.params.bookId, BOOK_STATUS.REJECTED, (err, results)=> {
			if (err) {
				res.status(500).json(err);
				return;
			}
			res.status(200).json("Success");
			booklogCtrl.createRejectedLog(req.params.bookId, user.id);
		})
	}
}

const _handleCreateErrors = (fileLinks, cb) => {
	cb("Error", null);
}

const _saveDb = (req, flag, links, cb)=> {
	if (!flag.inFile || !flag.inThumb || !flag.inDemo) return;
	if (!links.file || !links.thumb || !links.demo) {
		_handleCreateErrors(links, cb);
		return;
	};


	let queryStatement = "INSERT INTO BOOK(BOOK_NAME,BOOK_AUTHOR,BOOK_DESCRIPTION,CATEGORY_ID,FIRST_PAGE_URL,DEMO_URL,BOOK_URL) "
		+ "VALUES (?,?,?,?,?,?,?)";

	db.getConnection((err, connection) => {
		connection.query(queryStatement, [
			req.body.name,
			req.body.author,
			req.body.description,
			req.body.category,
			'/api/download/img/' + links.thumb,
			'/api/download/demo/' + links.demo,
			'/api/download/pdf/' + links.file
	 		], (error, results, fields) => {
	 					connection.release();
	 					if (error) {
	 						console.log(error)
	 						_handleCreateErrors(links, cb)
	 					} else {
	 						booklogCtrl.createUploadedLog(results.insertId, req.body.userId);
	 						cb(null, "Success")
	 					}
	 			})
			});
}

const _upload = (req, res, cb) => {
	upload(req, res, (up_err) => {
		let flag = {
			inFile: false,
			inThumb: false,
			inDemo: false
		}

		let links = {
			file: null,
			thumb: null,
			demo: null
		}

		if (up_err) {
			console.log(up_err);
			cb(up_err, null)
			return;
		} 
		const filename = 'file_' + Date.now();

		//console.log(JSON.parse(req.file.buffer.toString()));
		_saveFile(req.file.buffer, filename, (err, res)=> {
			flag.inFile = true;
			if (!err) {
				links.file = res.name;
			} else {
				console.log(err);
			}
			_saveDb(req, flag, links, cb);

		})

		gm(req.file.buffer).toBuffer('jpeg', (err, thumb_buffer)=> {
			if (err) {
				flag.inThumb = true;
				flag.inFile = true;
				_saveDb(req, flag, links, cb);
			} else {
				_saveThumb(thumb_buffer, filename, (err, response)=> {
					flag.inThumb = true;
					if (!err) {
						links.thumb = response.name;
					} else {
						console.log(err);
					}
					_saveDb(req, flag, links, cb);
				})

				_saveDemo(thumb_buffer, filename, (err, response)=> {
					flag.inDemo = true;
					if (!err) {
						links.demo = response.name;
					} else {
						console.log(err);
					}
					_saveDb(req, flag, links, cb);
				})
			}
		})
	})
}

const _saveFile = (book_buffer, bookName, cb)=> {
	dbx.filesUpload({path:bookDest + bookName + ".pdf", contents: book_buffer})
			.then((response)=> {
				cb(null, response)

			})
			.catch((err)=> {
				cb(err, null);
			})
}

const _saveThumb = (img_buff, bookName, cb) => {
		dbx.filesUpload({path: thumbDest + bookName + '.jpeg', contents: img_buff})
			.then((response)=> {
				cb(null, response)
			})
			.catch((err)=> {
				cb(err, null)
			})
};

const _saveDemo = (thumb_buffer, bookName, cb) => {
	const doc = new PDFDocument();
	doc.image(thumb_buffer, 0, 0)
	let buffArr = [];
	doc.on('data', (chunk)=> {
		buffArr.push(chunk);
	})
	doc.on('end', ()=> {
		let buff = Buffer.concat(buffArr);
		dbx.filesUpload({path: demoDest + bookName + ".pdf", contents: buff}).then(response=> {
			cb(null, response)
		}).catch((err)=> {
			cb(err, null)
		})
	})
	doc.end()
}

const _addionalOption = (statement, option)=> {
	if (option.limit) {
		statement += " limit " + option.limit;
	}

	if (option.orderBy) {
		statement += " order by " + option.orderBy
	}
	return statement
}

const _changeStatus = (bookId, statusId, cb)=> {
	let statement = 'UPDATE BOOK SET BOOK_STATUS = ? WHERE BOOK_ID = ?';
	db.getConnection((err, connection)=> {
		connection.query(statement, [statusId, bookId], (error, results, fields)=> {
			cb(error, results);
		})
	})
}


module.exports = {
	find: find,
	findOne: findOne,
	create: create,
	countView,
	downloadImg,
	downloadPdf,
	downloadDemo,
	approve,
	reject,
	librarianFind
}