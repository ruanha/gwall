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

/* 10x10 FRAME */