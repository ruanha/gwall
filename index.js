"use strict"

let server = require('./server')
let router = require('./router')
let handlers = require('./handlers')

let handle = {
	wall:{handler:handlers.wall, regex:/^\/wall$|^\/$/},
	upload:{handler:handlers.upload, regex:/^\/upload$/},
	css:{handler:handlers.statics, regex:/^\/main.css$/},
	images:{handler:handlers.images, regex:/^[\/images\/+]/},
}
/*
handle['/'] = handlers.wall
handle['/wall'] = handlers.wall
handle['/upload'] = handlers.upload
handle['/main.css'] = handlers.statics
*/

console.log("index says: ", handle)

server.start(router.route, handle)