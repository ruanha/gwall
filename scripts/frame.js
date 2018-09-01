"use strict"

wall.addEventListener('click', (e)=>{
	if ( e.target.className === 'border' ){
		console.log("click")
		frame.domElement = document.getElementById(e.target.id.split("-")[1])
		frame.id = e.target.id.split("-")[1]
		arrowKeyControl(e)
	}
	else if ( e.target.className === 'placed-print'){
		console.log("implement change of print size")
	}
	else {
		console.log("deactivate active frame/print")
	}
})

let mouseDown = false

wall.addEventListener('mousedown', (e)=>{
	mouseDown = true
	if ( e.target.className === 'border' ){
		setTimeout(()=>{
			if ( mouseDown ){
				console.log(e.which)
				frame.drag = true
				console.log("down")
				frame.domElement = document.getElementById(e.target.id.split("-")[1])
				//frame.id = e.target.id.split("-")[1]
				frame.load(e.target.id.split("-")[1])
				let border = document.getElementById(e.target.id)
				border.parentNode.removeChild(border)
				frame.floatFrame()
			}
		}, 200)

	}	
})

wall.addEventListener('mouseup', (e)=>{
	mouseDown = false
	if ( frame.drag ){
		frame.drag = false
		placeFrame(e)
		console.log("mouse up")
	}
})


function onMouseMove(e){
	frame.domElement.style.top = e.layerY+"px"
	frame.domElement.style.left = e.layerX+"px"
}

function placeFrame(e){
	frame.left = e.layerX
	frame.top = e.layerY
	frame.domElement.parentNode.removeChild(frame.domElement)
	let wall = document.getElementById("wall")
	wall.removeEventListener('mousemove', onMouseMove, false)
	wall.removeEventListener('click', placeFrame, false)
	frame.renderBorder()
	document.addEventListener('keypress', arrowKeyControl)
	frame.domElement = frame.renderFrame()
	frame.save()
	frame.renderPrint()
}

function arrowKeyControl(e){
	let moveFrame = frame.domElement
	let moveBorder = document.getElementById("border-"+frame.id)
	switch(e.keyCode){
		case 37:
			moveFrame.style.left = moveFrame.offsetLeft - 1 + "px"
			moveBorder.style.left = moveBorder.offsetLeft - 1 + "px"
		break
		case 38:
			moveFrame.style.top = moveFrame.offsetTop - 1 + "px"
			moveBorder.style.top = moveBorder.offsetTop - 1 + "px"
		break
		case 39:
			moveFrame.style.left = moveFrame.offsetLeft + 1 + "px"
			moveBorder.style.left = moveBorder.offsetLeft + 1 + "px"
		break
		case 40:
			moveFrame.style.top = moveFrame.offsetTop + 1 + "px"
			moveBorder.style.top = moveBorder.offsetTop + 1 + "px"
		break
	}
}

const protoFrame = {
	counter: 0,
	id:0,
	frames:{},

	load(id){
		this.id = id
		this.widthRatio = this.frames[id].widthRatio
		this.heightRatio = this.frames[id].heightRatio
		this.width = this.frames[id].width
		this.height = this.frames[id].height
		this.border = this.frames[id].border
		this.background = this.frames[id].background
		this.top = this.frames[id].top
		this.left = this.frames[id].left
	},

	save(){
		protoFrame.frames[frame.id] = {}
		protoFrame.frames[frame.id]["widthRatio"] = frame.widthRatio
		protoFrame.frames[frame.id]["heightRatio"] = frame.heightRatio
		protoFrame.frames[frame.id]["width"] = frame.width
		protoFrame.frames[frame.id]["height"] = frame.height
		protoFrame.frames[frame.id]["border"] = frame.border
		protoFrame.frames[frame.id]["background"] = frame.background
		protoFrame.frames[frame.id]["top"] = frame.top
		protoFrame.frames[frame.id]["left"] = frame.left
	},

	floatFrame(){
		this.styleFloatingFrame()
		let wall = document.getElementById("wall")
		let background = document.getElementById("background")
		wall.appendChild(this.domElement)
		wall.addEventListener('mousemove', onMouseMove, false)
		wall.addEventListener('click', placeFrame, false)
	},

	styleFloatingFrame(){
		let wall = document.getElementById("wall")
		this.domElement.setAttribute("class", "floating-frame")
		this.domElement.setAttribute("id", "floating-frame")
		this.domElement.style.top = wall.layerY+"px"
		this.domElement.style.left = wall.layerX+"px"
		this.domElement.style.width = this.width+"px"
		this.domElement.style.height = this.height+"px"
		this.domElement.style.border = "1px dashed black"
	},

	renderPrint(){
		let placedFrame = document.getElementById(this.id)
		placedFrame.innerHTML = '<img src="images/prints/test.jpg" class="placed-print unselectable">'
	},

	renderFrame(){
		let placedFrame = document.createElement("div")
		placedFrame.setAttribute("class", "placed-frame")
		placedFrame.setAttribute("id", this.id)
		placedFrame.style.left = this.left+"px"
		placedFrame.style.top = this.top+"px"
		placedFrame.style.width = this.width+"px"
		placedFrame.style.height = this.height+"px"
		let wall = document.getElementById("wall")
		wall.appendChild(placedFrame)
		return placedFrame
	},

	renderBorder(){
		let outerFrame = document.createElement("div")
		outerFrame.setAttribute("class", "border")
		outerFrame.setAttribute("id", "border-"+this.id)
		outerFrame.style.background = this.background
		outerFrame.style.left = (this.left-this.border)+"px"
		outerFrame.style.top = (this.top-this.border)+"px"
		outerFrame.style.width = (this.width+this.border*2)+"px"
		outerFrame.style.height = (this.height+this.border*2)+"px"
		wall.appendChild(outerFrame)
	},

	delete(){
		document.getElementById(this.id).parentNode.removeChild(document.getElementById(this.id))
		document.getElementById("border-"+this.id).parentNode.removeChild(document.getElementById("border-"+this.id))
	},

	rotate(){
		let tempWidth = this.width
		this.width = this.height
		this.height = tempWidth

		let border = document.getElementById("border-"+activeFrame.id)
		border.parentNode.removeChild(border)
		renderBorder()
	},
}

function frameFactory(width, height){
	let frame = Object.create(protoFrame)
	let domFrame = document.createElement("div")
	domFrame.setAttribute("class", "frame")
	frame.domElement = domFrame
	frame.widthRatio = width
	frame.heightRatio = height
	frame.width = width*4
	frame .height = height*4
	frame.border = 4
	frame.background = "black"
	frame.id = protoFrame.counter
	protoFrame.counter += 1
	return frame
}