function wallMouseMenu(e){
	let mouseMenu = document.getElementById("editor-wall-menu")
	if (mouseMenu.style.visibility === "hidden" ){
		mouseMenu.style.visibility = "visible"
		mouseMenu.style.top = e.layerY+"px"
		mouseMenu.style.left = e.layerX+"px"		
	}
	else{
		mouseMenu.style.visibility = "hidden"
	}
}

function onMouseMove(e){
	let frame = document.getElementById("floating-frame")
	frame.style.visibility = "visible"
	frame.style.top = e.layerY+"px"
	frame.style.left = e.layerX+"px"
}

function placeFrame(e){
	let floatingFrame = document.getElementById("floating-frame")
	floatingFrame.parentNode.removeChild(floatingFrame)
	let frame = {left:e.layerX, top:e.layerY,
	 		height:activeFrame.height, width:activeFrame.width}
	frames[frames.length] = frame
	user.floatingFrame = false
	wall.removeEventListener('mousemove', onMouseMove)
	renderFrame(frame)
}

function renderFrame(frame){
	console.log("rendering a frame")
	let placedFrame = document.createElement("div")
	placedFrame.setAttribute("class", "placed-frame")
	placedFrame.style.left = frame.left+"px"
	placedFrame.style.top = frame.top+"px"
	placedFrame.style.width = frame.width+"px"
	placedFrame.style.height = frame.height+"px"
	placedFrame.style.border = "2px solid black"
	wall.appendChild(placedFrame)
	console.log(activeFrame)
}