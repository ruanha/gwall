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
	width:0,
	height:0,
	border:0,
	color:"black",
	floats:false,
}
// LISTEN FOR CLICK EVENT EVERYWHERE
document.addEventListener('click',(e)=>{
	console.log("something clicked...")
	if ( activeMenu.bool && (e.target.className !== "mouse-menu-item" && 
				e.target.className !== "mouse-menu-header") ){
		console.log("class name: " + e.target.className)
		//there is an active menu, you didn't click on it, i'm closing it. make up your damn mind!
		console.log("closing active menu")
		activeMenu.removeFromDOM()
		activeMenu.reset()
	}
	else if ( !activeMenu.bool) {
		// okay there is no active menu. Should there be one?
		if ( e.target.id === "wall" || e.target.id === "background" ){
			if ( activeFrame.floats ){
				// place a frame?
				console.log("placing frame")
				placeFrame(e)
			}
			else if ( e.target.className === "placed-frame" ){
				console.log("wall print menu")
				wallPrintMenu(e)
			}
			else {
				// open wall menu
				console.log("wall mouse menu")
				wallMouseMenu(e)
			}
		}
	}
	else if ( activeMenu.bool && e.target.className === "mouse-menu-item" ) {
		//there is an active menu and you clicked on an active field in it, good job!
		console.log("menu item clicked")
		// 1) find which was clicked, 2) find its associated function in activeMenu.events
		let callFunction = activeMenu.obj.events[e.target.innerHTML][0]
		let variables = activeMenu.obj.events[e.target.innerHTML].slice(1)
		callFunction(...variables)
	}
	else {
		console.log("i have no idea how you did that...")
	}
})