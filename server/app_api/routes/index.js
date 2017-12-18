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
const ctrlCategory = require('../controller/categories');

const ctrlBookLog = require('../controller/booklogs');

/* GET home page. */
router.post('/users', ctrlUser.register);

router.post('/users/login', passport.authenticate('local', {
	session: false
}), ctrlUser.afterLogin);
		
router.get('/users', auth, ctrlUser.findAll);
router.post('/users/:userId', auth, ctrlUser.updateUser);
router.post('/users/:userId/enable', auth, ctrlUser.enable);
router.post('/users/:userId/disable', auth, ctrlUser.disable);

router.post('/users/:userId/password', auth, ctrlUser.updatePassword);

router.post('/books', auth, ctrlBook.create);
router.post('/books/:bookId/approve', auth, ctrlBook.approve);
router.post('/books/:bookId/reject', auth, ctrlBook.reject);

router.get('/librarian/books', auth, ctrlBook.librarianFind);
router.get('/books', ctrlBook.find);
router.get('/books/:bookId', ctrlBook.findOne);

router.get('/books/:bookId/viewed', ctrlBook.countView);
router.get('/download/img/:name', ctrlBook.downloadImg);
router.get('/download/demo/:name', ctrlBook.downloadDemo);
router.get('/download/pdf/:name', auth, ctrlBook.downloadPdf);


router.get('/categories', ctrlCategory.find);


//router.get('/books/:bookId/download', ctrlBook.download);

router.get('/books/:bookId/log', auth, ctrlBookLog.findByBook);
module.exports = router;
