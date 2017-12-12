"use strict";

const fs = require('fs');
const db = require('../model/db');
const booklogCtrl = require('./booklogs.js');
const multer = require('multer');
const gm = require('gm');
const path = require('path');
const PDFDocument = require('pdfkit');


let uploadFolderName;
let uploadFolderDir;
const baseDir = path.resolve(__dirname, '..', '..')
if (process.env.NODE_ENV == 'test') {
	uploadFolderName = process.env.upload_dir_test;
} else {
	uploadFolderName = process.env.upload_dir_dev;
}

uploadFolderDir = path.join(baseDir, uploadFolderName);

const bookDest = '/book/file/';
const thumbDest = '/book/thumb/';
const demoDest = '/book/demo/';

const GUESS = require('./enums.js').USER_GUESS

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(uploadFolderDir, bookDest));
	},
	filename: (req, file, cb) => {
		const filename = file.originalname.replace(/.pdf$/, "");
		//cb(null, filename + '_' + Date.now() + '.pdf');
		cb(null, "file" + '_' + Date.now() + '.pdf');

	}
});
const upload = multer({storage: storage}).single('file');



const find = (req, res) => {
	const userId = req.query.userId;
	if (!userId) {
		let queryStatement = 'Select * from BOOK';
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
	} else {
		let queryStatement = 'SELECT * from BOOK where userId = ?';
		db.getConnection((err, connection) => {
			connection.query(queryStatement,[userId], (error, results, fields) => {
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
	upload(req, res, (up_err) => {
		if (up_err) {
			res.status(500).json(up_err);
			return;
		} 

		const filename = req.file.filename.replace(/.pdf$/, '');
		_saveThumb(filename,(thum_err) => {
			if (thum_err) {
				console.log(thum_err);
				res.status(500).json(thum_err);
				return;
			}

			let queryStatement = "INSERT INTO BOOK(BOOK_NAME,BOOK_AUTHOR,BOOK_DESCRIPTION,CATEGORY_ID,FIRST_PAGE_URL,DEMO_URL,BOOK_URL) "
							+ "VALUES (?,?,?,?,?,?,?)";

			db.getConnection((err, connection) => {
				connection.query(queryStatement, [
					req.body.name,
					req.body.author,
					req.body.description,
					req.body.category,
					'/api/download/img/' + filename + '.jpeg',
					'/api/download/demo/'+ filename + '.pdf',
					'/api/download/pdf/' + filename + '.pdf'
	 				], (error, results, fields) => {
	 					connection.release();
	 					if (error) {
	 						console.log(error)
	 						res.status(400).json(error)
	 					} else {
	 						res.status(201).json("Success");
	 						booklogCtrl.createUploadedLog(results.insertId, req.body.userId);
	 					}
	 			})
			});
		})
	})
}

const countView = (req, res)=> {
	console.log("Hi");
	booklogCtrl.countViewedLog(req.params.bookId, (error, result)=> {
		if (error) {
			res.status(400).json(error)
		} else {
			res.status(200).json(result)
		}
	})
}

const changeStatus = (req, res)=> {
	
}

const downloadImg = (req, res) => {
	const img_name = req.params.name
	const pathToThumb = path.join(uploadFolderDir, thumbDest, img_name);

	fs.readFile(pathToThumb, (err, data)=>{
		if (err) {
			res.status(500).json(err)
		} else {
			res.contentType("application/jpeg")
			res.status(200)
			res.send(data)
		}
	})

}

const downloadPdf = (req, res) => {
	const pdf_name = req.params.name

	const pathToFile = path.join(uploadFolderDir, bookDest, pdf_name);
	fs.readFile(pathToFile, (err, data)=>{
		if (err) {
			res.status(500).json(err)
		} else {
			res.contentType("application/pdf")
			res.status(200)
			res.send(data)
		}
	})

}

const downloadDemo= (req, res) => {
	console.log("Donwloand Demo")
	const pdf_name = req.params.name

	const pathToFile = path.join(uploadFolderDir, demoDest, pdf_name);
	fs.readFile(pathToFile, (err, data)=>{
		if (err) {
			res.status(500).json(err)
		} else {
			res.contentType("application/pdf")
			res.status(200)
			res.send(data)
			//booklogCtrl.createViewedLog(, req.body.userId);

		}
	})

}




const _saveThumb = (bookName, cb) => {
	const pathToFile = path.join(uploadFolderDir, bookDest, bookName + '.pdf');
	const pathToThumb = path.join(uploadFolderDir, thumbDest, bookName + '.jpeg');

	gm(pathToFile).write(pathToThumb, (err) => {
		if (!err) _saveDemo(bookName, pathToThumb, cb);
		else cb(err);
	})
};

const _saveDemo = (bookName, thumbDir, cb) => {
	const doc = new PDFDocument();
	doc.pipe(fs.createWriteStream(path.join(uploadFolderDir, demoDest, bookName + '.pdf')))
	doc.image(thumbDir, 842, 595)
	doc.save()
	doc.end()
	cb()

}





module.exports = {
	find: find,
	findOne: findOne,
	create: create,
	countView,
	downloadImg,
	downloadPdf,
	downloadDemo
}