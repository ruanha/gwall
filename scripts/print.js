"use strict"

wall.addEventListener('click', (e)=>{
	if ( e.target.className === 'placed-print unselectable'){
		console.log("lets change the print")
		let print = e.target
		print.setAttribute("class", "adjust-print unselectable")
		print.parentNode.style.overflow = "visible"

		// insert resize icon
		let resizeIcon = document.createElement("img")
		resizeIcon.setAttribute("class", "resize-icon")
		resizeIcon.src = "images/resize_icon.jpg"
		e.target.parentNode.appendChild(resizeIcon)


	}
})