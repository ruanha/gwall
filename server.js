"use strict"
const http = require('http')
let url = require('url')
const port = 3000

function start(route){
	function onRequest(req, res){
		let pathname = url.parse(req.url).pathname
		console.log("Request recieved for: ", pathname)

		route(pathname)

		res.writeHead(200, {"Content-Type": "text/plain"})
		res.write("Hello")
		res.end()
	}
	http.createServer(onRequest).listen(port)
	console.log("Server started!")
}

exports.start = start