"use strict"

function start(res){
	console.log("Request handler 'start' was called")
	res.writeHead(200, {"Content-Type": "text/plain"})
	res.write("start handler puts content here")
	res.end()
}

function upload(res){
	console.log("Request handler 'upload' was called")
	res.writeHead(200, {"Content-Type": "text/plain"})
	res.write("upload handler puts content here")
	res.end()
}

module.exports = {start:start, upload:upload}