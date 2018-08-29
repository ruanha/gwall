"use strict"

const wall = document.getElementById("wall")

wall.addEventListener('click', (e)=>{
	console.log(e)

	let mouseMenu = document.getElementById("editor-wall-menu")
	mouseMenu.style.visibility = "visible"
	mouseMenu.style.top = e.layerY+"px"
	mouseMenu.style.left = e.layerX+"px"
})