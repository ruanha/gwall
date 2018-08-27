"use strict"
const http = require('http')
let url = require('url')
const port = 3000

function start(route, handle){
	function onRequest(req, res){
		let pathname = url.parse(req.url).pathname
		console.log("Request recieved for: ", pathname)

		route(handle, pathname, res)
	}
	http.createServer(onRequest).listen(port)
	console.log("Server started!")
}

exports.start = start