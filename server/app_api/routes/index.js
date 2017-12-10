const express = require('express');
const router = express.Router();
const passport = require('passport')
var jwt = require('express-jwt');
var auth = jwt({
	secret: process.env.JWT_SECRET,
	userProperty: 'payload'
});

const ctrlUser = require('../controller/users');
const ctrlBook = require('../controller/books');
const ctrlBookLog = require('../controller/booklogs');

/* GET home page. */
router.post('/users', ctrlUser.register);

router.post('/users/login', passport.authenticate('local', {
	session: false
}), ctrlUser.afterLogin);
		
router.put('/users/:userId', auth, ctrlUser.updateUser)
router.put('/users/:userId/password', auth, ctrlUser.updatePassword)

router.post('/books', auth, ctrlBook.create);

router.get('/books', ctrlBook.find);
router.get('/books/:bookId', ctrlBook.findOne);
router.get('/download/img/:name', ctrlBook.downloadImg);
router.get('/download/pdf/:name', auth, ctrlBook.downloadPdf);


//router.get('/books/:bookId/download', ctrlBook.download);

router.get('/books/:bookId/log', auth, ctrlBookLog.findByBook);
module.exports = router;
