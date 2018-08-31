"use strict"
/* SHOULD HANDLERS CALL A VIEW TO GET THE (RENDERED) HTML? */
let querystring = require('querystring')

function wall(res){
	console.log("Request handler 'wall' was called")
	/* ROUTING WITH STREAM+PIPE:
	const fs = require('fs')
	let readStream = fs.createReadStream(__dirname + '/index.html', 'utf8')
	readStream.pipe(res)*/

	/* ROUTING WITH fs.readFile()*/
	const fs = require('fs')
	fs.readFile('index.html', 'utf8', function(err, data){
		if (err) throw err
		res.writeHead(200, {"Content-Type": "text/html"})
		res.write(data)
		res.end()
	})
}

function upload(res, path, postData){
	console.log("Request handler 'upload' was called")
	res.writeHead(200, {"Content-Type": "text/plain"})
	res.write( "You've sent:" + querystring.parse(postData)["text"] )
	res.end()
}

function statics(res, path){
	const fs = require('fs')
	console.log("serving static content")
	fs.readFile('main.css', 'utf8', function(err, data){
		if (err) throw err
		res.writeHead(200, {"Content-Type": "text/css"})
		res.write(data)
		res.end()
	})
}

function images(res, path){
	const fs = require('fs')
	console.log("serving an image", path)
	res.writeHead(200, {"Content-Type": "image/jpg", "Cache-Control": "public,max-age=99936000",
		"Last-Modified": "Fri, 31 Aug 2018 10:45:26 GMT"})
	let imgStream = fs.createReadStream('.'+path)
	imgStream.pipe(res)
}

function scripts(res, path){
	const fs = require('fs')
	console.log("serving script content")
	fs.readFile('.'+path, 'utf8', function(err, data){
		if (err) throw err
		res.writeHead(200, {"Content-Type": "text/javascript"})
		res.write(data)
		res.end()
	})	
}

function editor(res){
	const fs = require('fs')
	console.log("serving a new compostion")
	fs.readFile('editor.html', 'utf8', function(err, data){
		if (err) throw err
		res.writeHead(200, {"Content-Type": "text/html"})
		res.write(data)
		res.end()
	})
}


module.exports = {wall:wall, upload:upload, statics:statics, 
	images:images, editor:editor, scripts:scripts,}