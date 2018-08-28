"use strict"

// Set adventlisteners on panel-buttons
let menuButtons = document.getElementsByClassName("panel-button")

for (let i=0; i<menuButtons.length; i++){
	let button = menuButtons[i]
	let menu = document.getElementById(button.attributes.menu.value)
	button.addEventListener('click', ()=>{
		menu.style.visibility = (menu.style.visibility == 'hidden')?'visible':'hidden'
	})
}

let chooseBackgroundButtons = document.getElementsByClassName("menu-choice-background-image")

for (let i=0; i<chooseBackgroundButtons.length; i++){
	let button = chooseBackgroundButtons[i]
	let background = document.getElementById("background")
	button.addEventListener('click', ()=>{
		background.src = button.attributes.src.value
		button.parentNode.parentNode.style.visibility = "hidden"

	})
}

let comp = document.getElementsByClassName("frames")[0]
comp.addEventListener('click', (e)=>{
	console.log(e)
})

let frame1 = {
	x:57,
	y:108,
	width:54,
	height:77,
	img:false,
	border:2,
	color:"black",
}

let wall = document.getElementById("wall")
let innerFrame = document.createElement("div")
let outerFrame = document.createElement("div")

innerFrame.setAttribute("class", "frame")
innerFrame.setAttribute("id", "frame1")
innerFrame.style.left = frame1.x+"px"
innerFrame.style.top = frame1.y+"px"
innerFrame.style.width = frame1.width+"px"
innerFrame.style.height = frame1.height+"px"

innerFrame.addEventListener('oncontextmenu', ()=>{
	console.log("wow")
})

outerFrame.style.background = frame1.color
outerFrame.style.left = (frame1.x-frame1.border)+"px"
outerFrame.style.top = (frame1.y-frame1.border)+"px"
outerFrame.style.width = (frame1.width+frame1.border*2)+"px"
outerFrame.style.height = (frame1.height+frame1.border*2)+"px"
outerFrame.setAttribute("class", "frame")

wall.appendChild(outerFrame)
wall.appendChild(innerFrame)