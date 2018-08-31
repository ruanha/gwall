"use strict"

wall.addEventListener('click', (e)=>{
	if ( e.target.className === 'border' ){
		frame.domElement = document.getElementById(e.target.id.split("-")[1])
		frame.id = e.target.id.split("-")[1]
		arrowKeyControl(e)
	}
	else if ( e.target.className === 'placed-print'){
		console.log("lets do this!")
	}
})

function onMouseMove(e){
	frame.domElement.style.top = e.layerY+"px"
	frame.domElement.style.left = e.layerX+"px"
}

function placeFrame(e){
	frame.domElement.parentNode.removeChild(frame.domElement)
	frame.left = e.layerX
	frame.top = e.layerY
	let wall = document.getElementById("wall")
	wall.removeEventListener('mousemove', onMouseMove, false)
	wall.removeEventListener('click', placeFrame, false)
	frame.renderBorder()
	document.addEventListener('keypress', arrowKeyControl)
	frame.domElement = frame.renderFrame()
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

	/*onMouseMove(e){
		console.log("Weeee!")
		this.domElement.style.top = e.layerY+"px"
		this.domElement.style.left = e.layerX+"px"
	},	*/

	/*placeFrame(e){
		this.domElement.parentNode.removeChild(this.domElement)
		this.left = e.layerX
		this.top = e.layerY
		let wall = document.getElementById("wall")
		wall.removeEventListener('mousemove', onMouseMove, false)
		wall.removeEventListener('click', this.placeFrame.bind(this), false)
		this.renderBorder()
		document.addEventListener('keypress', this.arrowKeyControl.bind(this))
		this.renderFrame()
		this.renderPrint()
	},*/

	renderPrint(){
		let placedFrame = document.getElementById(this.id)
		placedFrame.innerHTML = "<img src=images/prints/test.jpg class=placed-print>"
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

	/*arrowKeyControl(e){
		let moveFrame = frame.domElement
		let moveBorder = document.getElementById("border-"+this.id)
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
	}*/
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