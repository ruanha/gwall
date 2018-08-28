"use strict"
const http = require('http')
const url = require('url')
const port = 3000

function start(route, handle){
	/*console.log("This only gets called when the app initializes and \
	 starts the server. On every http request the server recieves, it \
	 calls the Request Handler function.")*/

	function requestHandler(request, response){
		let postData =""
		let pathname = url.parse(request.url).pathname
		console.log("Request for "+pathname+" recieved.")

		request.setEncoding('utf8')

		request.addListener('data', (postDataChunk)=>{
			postData += postDataChunk
			console.log("Recieved POST data chunk '"+
				postDataChunk+"'.")
		})

		request.addListener('end', ()=>{
			route(handle, pathname, response, postData)
		})
	}

	http.createServer(requestHandler).listen(port)
	console.log("Server started on port:", port)
}

exports.start = start