const db = require('../model/db');
const BOOK_ACTIONS = require('./enums.js').BOOK_ACTIONS;

const _create = (bookId, userId, actionId) => {
	const statement = 'INSERT INTO BOOKLOG(USER_ID,BOOK_ID,ACTION_ID) VALUES (?, ?, ?)'
	db.getConnection((err, connection) => {
		connection.query(statement, [parseInt(userId), bookId, actionId], (error, results, field) => {
			connection.release();
			if (error) {
				console.log(error);
			}
		})
	})
}



const _delete = (bookId, userId, actionId) => {
}

const findOne = (req, res) => {
	const statement = 'SELECT * FROM BOOKLOG where LOG_ID = ?';
	db.getConnection((err, connection) => {
		connection.query(statement, [req.body.logId], (error, results, field) => {
			connection.release();
			if (error) {
				res.status(500).json(error);
			} else {
				res.status(200).json(results);
			}
		})
	})
}

const findByBook = (req, res) => {
	const statement = 'SELECT * FROM BOOKLOG where BOOK_ID = ?';
	db.getConnection((err, connection)=> {
		connection.query(statement, [req.params.bookId], (error, results, field)=> {
			connection.release();
			if (error) {
				res.status(500).json(error);
			} else {
				res.status(200).json(results);
			}
		})
	})
}


const createUploadedLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.UPLOADED);
}

const createDownloadedLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.DOWNLOADED);
}

const createAddedFavoriteLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.ADDED_FAVORITE);
}

const createApprovedLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.APPROVED);
}

const createRejectedLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.REJECTED);
}

const createEditedLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.EDITED);
}

const createViewedLog = (bookId, userId) => {
	_create(bookId, userId, BOOK_ACTIONS.VIEWED);
}




module.exports = {
	createUploadedLog,
	createDownloadedLog,
	createAddedFavoriteLog,
	createApprovedLog,
	createRejectedLog,
	createEditedLog,
	createViewedLog,
	findOne,
	findByBook
}