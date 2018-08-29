"use strict"

let server = require('./server')
let router = require('./router')
let handlers = require('./handlers')

let handle = {
	wall:{handler:handlers.wall, regex:/^\/wall$|^\/$/},
	upload:{handler:handlers.upload, regex:/^\/upload$/},
	css:{handler:handlers.statics, regex:/^\/main.css$/},
	images:{handler:handlers.images, regex:/^\/images\/[\w]/},
	scripts:{handler:handlers.scripts, regex:/^\/scripts\//},
	editor:{handler:handlers.editor, regex:/^\/editor$/},
}

server.start(router.route, handle)