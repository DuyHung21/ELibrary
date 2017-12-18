const Dropbox = require('dropbox');
const dbx = new Dropbox({ accessToken: "99q11dnXLVAAAAAAAAAAPCma9Ay35BAS94baoiW_7pOJZNDXhbyAukg9fNg-Vky1" });




	dbx.filesDownload({path: "/test/file/file_1513480080641.pdf"})
		.then((data)=> {
			console.log(data.media_info.fileBinary)
		})
		.catch((err)=> {
			res.status(500).json(err)

		})
