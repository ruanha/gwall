"use strict"

function wallMouseMenu(e){
	let choices = { "insert background":["stock-photo", "upload"],
				"insert frame":["15x20", "20x30", "30x40"]
	}
	let events = { "stock-photo":[choiceStock], "upload":[nothing], "15x20":[frameChoice, 60, 80], 
			"20x30":[frameChoice, 80, 120], "30x40":[frameChoice, 120, 160] }

	let wallMenu = new MouseMenu("editor-wall-menu", choices, events)
	activeMenu.set("editor-wall-menu", wallMenu)
	wallMenu.insertMenu(e.layerY, e.layerX)
}

function nothing(){

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
	let frame = document.getElementsByClassName("placed-frame")	
	photo.insertMenu(frame[0].offsetTop + e.layerY, frame[0].offsetLeft + e.layerX)

}

function clickFrame(e){
	//print menu: insert print, 

}

function dragComposition(e){
	//onmousedown move all frames
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

function setFloatingFrame(activeFrame){
	let floatingFrame = document.createElement("div")
	let wall = document.getElementById("wall")
	floatingFrame.setAttribute("class", "floating-frame")
	floatingFrame.setAttribute("id", "floating-frame")
	floatingFrame.style.top = wall.layerY+"px"
	floatingFrame.style.left = wall.layerX+"px"
	floatingFrame.style.width = activeFrame.width+"px"
	floatingFrame.style.height = activeFrame.height+"px"
	floatingFrame.style.border = "1px solid black"
	return floatingFrame
}

class MouseMenu{
	constructor(id, choices, events){
		this.choices = choices
		this.events = events
		this.id = id
	}
	renderHTML(){
		let html = ""
		//html += '<div class="mouse-menu" id="editor-'+this.name+'-menu">'
		for ( let header in this.choices ){
			html += '<div class="mouse-menu-header">'+header+'</div>'
			for ( let i=0; i< this.choices[header].length; i++ ){
				let name = this.choices[header][i]
				html += '<div class="mouse-menu-item" name="'+name+'" id="choice-'+name+'">'+name+'</div>'
			}
		}
		//html += '</div>'
		return html
	}
	insertMenu(top, left){
		console.log(top, left)
		let wall = document.getElementById("wall")
		let menu = document.createElement("div")
		menu.setAttribute("id", this.id)
		menu.setAttribute("class", "mouse-menu")
		menu.innerHTML = this.renderHTML()
		menu.style.top = top+"px"
		menu.style.left = left+"px"
		menu.style.visibility = "visible"
		wall.appendChild(menu)
	}
}

function frameChoice(width, height){
	/* set the event that fires when a frame is selected
	mouse menu.
	*/
	let frame = new Frame (width, height)
	Object.assign(activeFrame, frame)
	activeFrame.floats = true

	activeMenu.removeFromDOM()
	activeMenu.reset()
	//make frame div
	wall.appendChild(setFloatingFrame(activeFrame))
	//ADD MOUSE MOVE EVENT TO WALL
	wall.addEventListener('mousemove', onMouseMove)
}
function choiceStock(){
	//close menu
	let mouseMenu = document.getElementById("editor-wall-menu")
	//open stock background menu
	let menuBackground = document.getElementById("menu-background")
	menuBackground.style.visibility = "visible"
}


// IF REFACTOR: remove the id="menu-background" div element
// refactor this function to create the menu on click (use MouseMenu function? not sure its poss.)
// detect click with the add.eventListener on doucment in editor.js
let chooseBackgroundButtons = document.getElementsByClassName("menu-choice-background-image")
for (let i=0; i<chooseBackgroundButtons.length; i++){
	let button = chooseBackgroundButtons[i]
	let background = document.getElementById("background")
	button.addEventListener('click', ()=>{
		background.src = button.attributes.src.value
		button.parentNode.parentNode.style.visibility = "hidden"
	})
}