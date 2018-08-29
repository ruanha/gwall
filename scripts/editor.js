"use strict"

/* MOUSE CLICK WALL MENU */
const wall = document.getElementById("wall")

wall.addEventListener('click', (e)=>{
	let mouseMenu = document.getElementById("editor-wall-menu")
	if (mouseMenu.style.visibility === "hidden" ){
		mouseMenu.style.visibility = "visible"
		mouseMenu.style.top = e.layerY+"px"
		mouseMenu.style.left = e.layerX+"px"		
	}
	else{
		mouseMenu.style.visibility = "hidden"
	}
})

/* MENU EVENTS */
/* STOCK */


/* 10x10 FRAME */
