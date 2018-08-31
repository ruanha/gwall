"use strict"

let backgroundImageURL = ["bedroom.jpg", "empty_wall.jpg", "home_office.jpg",
					"kitchen.jpg", "living_room.jpg", "office.jpeg", "sofa.jpg"]

//const panel = document.getElementById("panel")
const panelInsertBackground = document.getElementById("panel-insert-background")
const panel15x20 = document.getElementById("panel-15x20")
const panel20x30 = document.getElementById("panel-20x30")
const panel30x40 = document.getElementById("panel-30x40")

panelInsertBackground.addEventListener('click', (e)=>{
	//overlay div
	let overlay = document.createElement("div")
	overlay.setAttribute("id", "overlay")
	document.getElementById("wall").appendChild(overlay)
	//menu
	let bigMenu = document.createElement("div")
	bigMenu.setAttribute("class", "big-menu")
	bigMenu.setAttribute("id", "insert-background-menu")
	document.getElementById("wall").appendChild(bigMenu)
	//load images
	for (let i=0; i<backgroundImageURL.length; i++){
		let img = document.createElement("img")
		img.setAttribute("class", "big-menu-items")
		img.setAttribute("id", backgroundImageURL[i])
		img.src = "/images/walls/"+backgroundImageURL[i]
		bigMenu.appendChild(img)
	}
	//click image --> change background, close menu
	// or click outside image --> close menu
	function onClick(e){
		if (e.target.className === 'big-menu-items' ){
			let overlay = document.getElementById("overlay")
			overlay.parentNode.removeChild(overlay)
			let background = document.getElementById("background")
			background.src = "/images/walls/"+e.target.id
			background.style.opacity = 1
			let bigMenu = document.getElementById("insert-background-menu")
			bigMenu.parentNode.removeChild(bigMenu)
		}
		else {
			let overlay = document.getElementById("overlay")
			overlay.parentNode.removeChild(overlay)
			let bigMenu = document.getElementById("insert-background-menu")
			bigMenu.parentNode.removeChild(bigMenu)
		}
		document.getElementById("app").removeEventListener('click', onClick, true)
	}
	document.getElementById("app").addEventListener('click', onClick, true)
})

let frame = {}

panel15x20.addEventListener('click', (e)=>{
	frame = frameFactory(15, 20)
	frame.floatFrame()
})

panel20x30.addEventListener('click', (e)=>{
	frame = frameFactory(20, 30)
	frame.floatFrame()
})

panel30x40.addEventListener('click', (e)=>{
	frame = frameFactory(30, 40)
	frame.floatFrame()	
})