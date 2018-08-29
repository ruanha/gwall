"use strict"

let user = {
	floatingFrame:false,
}

let activeFrame = {
	width:0,
	height:0,
}
background = {}


let frames = {}

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
	if ( user.floatingFrame ){
		console.log("placing a framed!")
		placeFrame(e)
	}
	else{
		wallMouseMenu(e)
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
/*INSERT FRAMES (HELPER FUNCTIONS) */


/* 10x10 FRAME */
let choice10x10 = document.getElementById("choice-10x10")
choice10x10.addEventListener('click', (e)=>{
	user.floatingFrame = true
	activeFrame = {width:100, height:100, border:2}
	//close menu
	let mouseMenu = document.getElementById("editor-wall-menu")
	mouseMenu.style.visibility = "hidden"
	//make frame div
	let frame = document.createElement("div")
	frame.setAttribute("class", "floating-frame")
	frame.setAttribute("id", "floating-frame")
	frame.style.top = e.layerY+"px"
	frame.style.left = e.layerX+"px"
	frame.style.width = 100+"px"
	frame.style.height = 100+"px"
	frame.style.border = "2px solid black"
	wall.appendChild(frame)
	//ADD MOUSE MOVE EVENT TO WALL
	wall.addEventListener('mousemove', onMouseMove)
})
