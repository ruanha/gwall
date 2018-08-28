"use strict"

function route(handle, pathname, res, postData){
	console.log("About to route a request for ", pathname)
	let requestedHandler = undefined
	for (let key in handle){
		if (handle[key].regex.test(pathname)){
			requestedHandler = handle[key].handler
			break
		}
	}

	if (typeof requestedHandler === 'function'){
		requestedHandler(res, pathname, postData)
	}
	else {
		console.log("No request handler found for ", pathname)
		res.writeHead(404, {"Content-Type": "text/plain"})
		res.write("404 Not found")
		res.end()
	}
}

exports.route = route