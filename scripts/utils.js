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
	activeFrame.left = e.layerX
	activeFrame.top = e.layerY
	activeFrame.floats = false
	//user.floatingFrame = false
	wall.removeEventListener('mousemove', onMouseMove)
	renderFrame()
	renderPicture()
}

function renderPicture(){
	let placedFrame = document.createElement("div")
	placedFrame.setAttribute("class", "placed-frame")
	placedFrame.style.left = activeFrame.left+"px"
	placedFrame.style.top = activeFrame.top+"px"
	placedFrame.style.width = activeFrame.width+"px"
	placedFrame.style.height = activeFrame.height+"px"
	//placedFrame.style.border = activeFrame.border+"px"+" solid "+activeFrame.color
	wall.appendChild(placedFrame)
}

function renderFrame(){
	let outerFrame = document.createElement("div")
	outerFrame.style.background = activeFrame.color
	outerFrame.style.left = (activeFrame.left-activeFrame.border)+"px"
	outerFrame.style.top = (activeFrame.top-activeFrame.border)+"px"
	outerFrame.style.width = (activeFrame.width+activeFrame.border*2)+"px"
	outerFrame.style.height = (activeFrame.height+activeFrame.border*2)+"px"
	outerFrame.setAttribute("class", "frame")
	wall.appendChild(outerFrame)
}

function wallPrintMenu(e){
	//frame menu: delete, change color, border size
	// arrow key control
	

}

function clickFrame(e){
	//print menu: insert print, 

}

function dragComposition(e){
	//onmousedown move all frames
}