const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: "99q11dnXLVAAAAAAAAAAPCma9Ay35BAS94baoiW_7pOJZNDXhbyAukg9fNg-Vky1" });
const fs = require('fs');



	dbx.filesDownload({path: "/test/thumb/file_1513480080641.jpeg"})
		.then((data)=> {
			console.log(data.fileBinary)
			let buf = new Buffer(data.fileBinary, 'binary');
			fs.writeFileSync('tst.jpeg', buf);
		})
		.catch((err)=> {
			console.log(err);

		})
