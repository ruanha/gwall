"use strict"

let user = {
	floatingFrame:false,
}

let activeFrame = {
	width:0,
	height:0,
	width:0,
	height:0,
	border:0,
	color:"black",
	floats:false,
}

let wallEvents = []
/* WALL EVENTS:
click events:
floatingFrame active --> place frame
else if (wall):
open wall mouse menu
else if (frame)
open frame menu
else if (print)
open print menu
*/


const wall = document.getElementById("wall")
wall.addEventListener('click', (e)=>{
	if ( e.target === wall || e.target === document.getElementById("background") ){
		// if wall
		if ( activeFrame.floats ){
			placeFrame(e)
		}
		else{
			wallMouseMenu(e)
		}
	}
	else if ( e.target.className === "placed-frame" ){
		wallPrintMenu()
	}
})

/* MENU EVENTS */
/* STOCK */
let choiceStock = document.getElementById("choice-stock")
choiceStock.addEventListener('click', ()=>{
	//close menu
	let mouseMenu = document.getElementById("editor-wall-menu")
	mouseMenu.style.visibility = "hidden"
	//open stock background menu
	let menuBackground = document.getElementById("menu-background")
	menuBackground.style.visibility = "visible"
})

let chooseBackgroundButtons = document.getElementsByClassName("menu-choice-background-image")
for (let i=0; i<chooseBackgroundButtons.length; i++){
	let button = chooseBackgroundButtons[i]
	let background = document.getElementById("background")
	button.addEventListener('click', ()=>{
		background.src = button.attributes.src.value
		button.parentNode.parentNode.style.visibility = "hidden"

	})
}

/*INSERT FRAMES (HELPER FUNCTIONS CLASS) */
class Frame{
	constructor(width, height){
		this.width = width
		this.height = height
		this.portrait = true
		this.top = 0
		this.left = 0
		this.color = "black"
		this.border = 2
		this.floating = false
	}
}

function setFloatingFrame(activeFrame, e){
	let floatingFrame = document.createElement("div")
	floatingFrame.setAttribute("class", "floating-frame")
	floatingFrame.setAttribute("id", "floating-frame")
	floatingFrame.style.top = e.layerY+"px"
	floatingFrame.style.left = e.layerX+"px"
	floatingFrame.style.width = activeFrame.width+"px"
	floatingFrame.style.height = activeFrame.height+"px"
	floatingFrame.style.border = "1px solid black"
	return floatingFrame
}


/* 15x20 FRAME */
let choice15x20 = document.getElementById("choice-15x20")
choice15x20.addEventListener('click', (e)=>{
	let frame = new Frame (60, 80)
	Object.assign(activeFrame, frame)
	activeFrame.floats = true

	let mouseMenu = document.getElementById("editor-wall-menu")
	mouseMenu.style.visibility = "hidden"
	//make frame div
	wall.appendChild(setFloatingFrame(activeFrame, e))
	//ADD MOUSE MOVE EVENT TO WALL
	wall.addEventListener('mousemove', onMouseMove)
})

/* 20x30 FRAME */
let choice20x30 = document.getElementById("choice-20x30")
choice20x30.addEventListener('click', (e)=>{
	let frame = new Frame (80, 120)
	Object.assign(activeFrame, frame)
	activeFrame.floats = true

	let mouseMenu = document.getElementById("editor-wall-menu")
	mouseMenu.style.visibility = "hidden"
	//make frame div
	wall.appendChild(setFloatingFrame(activeFrame, e))
	//ADD MOUSE MOVE EVENT TO WALL
	wall.addEventListener('mousemove', onMouseMove)
})

/* 30x40 FRAME */
let choice30x40 = document.getElementById("choice-30x40")
choice30x40.addEventListener('click', (e)=>{
	let frame = new Frame (120, 160)
	Object.assign(activeFrame, frame)
	activeFrame.floats = true

	let mouseMenu = document.getElementById("editor-wall-menu")
	mouseMenu.style.visibility = "hidden"
	//make frame div
	wall.appendChild(setFloatingFrame(activeFrame, e))
	//ADD MOUSE MOVE EVENT TO WALL
	wall.addEventListener('mousemove', onMouseMove)
})