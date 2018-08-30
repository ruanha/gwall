"use strict"

let activeMenu = {
	bool:false,
	id:"",
	obj:{},
	reset(){
		this.bool = false
		this.id = ""
		this.obj = {}
	},
	set(id, obj){
		this.bool = true
		this.id = id
		this.obj = obj
	},
	removeFromDOM(){
		let domMenuToRemove = document.getElementById(this.id)
		domMenuToRemove.parentNode.removeChild(domMenuToRemove)
	}
}

let activeFrame = {
	width:0,
	height:0,
	border:0,
	color:"black",
	floats:false,
	adjusting:false,
	frame:undefined, //set the frame div here
	print:undefined, //set to default print
}

function tempFunc(){
	let message = document.getElementById("begin-message")//.parentNode.removeChild(document.getElementById("begin-message"))
	document.removeEventListener('click', tempFunc)
	activeMenu.set("begin-message", message)
	choiceStock()

} 
document.addEventListener('click', tempFunc)

// LISTEN FOR CLICK EVENT EVERYWHERE
document.addEventListener('click',(e)=>{
	console.log("something clicked...")
	console.log(e.target.className)
	if ( activeFrame.adjusting ){
		activeFrame.adjusting = false
		console.log("remove eventListener on frame")
		document.removeEventListener('keypress', arrowKeyFrameControl)
	}
	else if ( activeMenu.bool && (e.target.className !== "mouse-menu-item" && 
				e.target.className !== "mouse-menu-header" &&
				e.target.className !== "print-choice-image" ) ){
		//there is an active menu, you didn't click on it, i'm closing it. make up your damn mind!
		console.log("closing active menu")
		activeMenu.removeFromDOM()
		activeMenu.reset()
	}
	else if ( e.target.id === "wall" || e.target.id === "background") {
		// you clicked on the wall/background image
		console.log("wall actions")

		if ( activeFrame.floats ){
			// place a frame?
			console.log("placing frame")
			placeFrame(e)
		}
		else {
			// open wall menu
			console.log("wall mouse menu")
			wallMouseMenu(e)
		}
	}
	else if ( e.target.className === "placed-print" ){
		console.log("wall print activated")
		// activate print: you can move and resize it

		// open panel options for print
		let buttons = {"insert":[insertPrint, e.target.id]}
		panel.addButtons(buttons)

	}
	else if ( activeMenu.bool && e.target.className === "mouse-menu-item" ) {
		//there is an active menu and you clicked on an active field in it, good job!
		console.log("menu item clicked")
		// 1) find which was clicked, 2) find its associated function in activeMenu.events
		let callFunction = activeMenu.obj.events[e.target.innerHTML][0]
		let variables = activeMenu.obj.events[e.target.innerHTML].slice(1)
		callFunction(...variables)
	}
	else if ( e.target.className === 'panel-button' ){
		//clicked panel button
		console.log("clicked panel button")
		let callFunction = panel.panelButtons[e.target.innerHTML][0]
		let variables = panel.panelButtons[e.target.innerHTML].slice(1)
		callFunction(...variables)
	}
	else if ( e.target.className === 'print-choice-image' ){
		console.log("insert print in active frame")
		console.log(e.target)
		activeMenu.obj.style.visibility = "hidden"
		activeMenu.reset()
	}
	else if ( e.target.className === 'border' && !activeFrame.adjusting){
		activeFrame.adjusting = true
		let frameId = e.target.id.split("-")[1]
		activeFrame.id = frameId
		document.addEventListener('keypress', arrowKeyFrameControl)
	}
	else {
		console.log("i have no idea how you did that...")
	}
})