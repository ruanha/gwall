"use strict"

wall.addEventListener('click', (e)=>{
	if ( e.target.className === 'placed-print unselectable'){
		let id = e.target.parentNode.id
		print = protoPrint.prints[id]
		print.domElement.setAttribute("id", "adjust-print")
		print.domElement.parentNode.style.overflow = "visible"

		// insert resize icon
		let resizeIcon = document.createElement("img")
		resizeIcon.setAttribute("class", "resize-icon")
		resizeIcon.setAttribute("id", "resize-icon")
		resizeIcon.src = "images/resize_icon.jpg"
		e.target.parentNode.appendChild(resizeIcon)

		//resizeIcon.addEventListener()

		// arrowKeyControl
		print.active = true

	}
	else {
		if ( document.getElementById("resize-icon") ){
			let resizeIcon = document.getElementById("resize-icon")
			resizeIcon.parentNode.removeChild(resizeIcon)
			document.getElementById("adjust-print").parentNode.style.overflow = "hidden"
		}
	}
})

let protoPrint = {
	prints:{},

	render(id){
		let placedFrame = document.getElementById(id)
		placedFrame.appendChild(print.prints[id].domElement)
	},

	arrowKeyControl(e){
		let activePrint = print.prints[print.id].domElement
		let resizeIcon = document.getElementById("resize-icon")
		switch(e.keyCode){
			case 37:
				activePrint.style.left = activePrint.offsetLeft - 1 + "px"
				resizeIcon.style.left = resizeIcon.offsetLeft - 1 + "px"
			break
			case 38:
				activePrint.style.top = activePrint.offsetTop - 1 + "px"
				resizeIcon.style.top = resizeIcon.offsetTop - 1 + "px"
			break
			case 39:
				activePrint.style.left = activePrint.offsetLeft + 1 + "px"
				resizeIcon.style.left = resizeIcon.offsetLeft + 1 + "px"
			break
			case 40:
				activePrint.style.top = activePrint.offsetTop + 1 + "px"
				resizeIcon.style.top = resizeIcon.offsetTop + 1 + "px"
			break
		}
	},

	resize(){
		
	}
}

function printFactory(id){
	print = Object.create(protoPrint)
	let domPrint = document.createElement("img")
	domPrint.setAttribute("class", "placed-print unselectable")
	domPrint.setAttribute("id", "print-"+id)
	print.src = "images/prints/test.jpg"
	domPrint.src = print.src
	print.domElement = domPrint
	print.id = id
	print.width = frame.frames[id].width
	print.height = frame.frames[id].height
	
	//CHANGE THIS TO CENTER ANY IMAGE AND PRESERVING ORIGINAL ASPECT RATIO

	print.active = false
	print.drag = false
	protoPrint.prints[id] = print
	return print
}


app.addEventListener( 'mousemove', (e)=>{
	mousePos.x = e.clientX
	mousePos.y = e.clientY
})

document.addEventListener('dragstart', (e)=>{
	if ( e.target.className === 'resize-icon' ){
		e.preventDefault()
		mousePos.startX = mousePos.x
		mousePos.startY = mousePos.y
		let id = e.target.parentNode.id
		let frame = e.target.parentNode
		print = protoPrint.prints[id]
		print.drag = true

		function onMouseMoveDragPrint(){
			let x = (mousePos.x - mousePos.startX)
			let y = (mousePos.y - mousePos.startY)
			let min = Math.min(x, y)
			let distance = Math.abs(min)
			print.domElement.style.top = min+"px"
			print.domElement.style.left = min+"px"

			if ( min < 0 ){
				print.domElement.style.width = print.width + distance*2+"px"
				print.domElement.style.height = print.height + distance*2+"px"			
			}
			else {
				print.domElement.style.width = print.width - distance*2+"px"
				print.domElement.style.height = print.height - distance*2+"px"
			}
		}
		print.interval = setInterval(onMouseMoveDragPrint, 10)
	}
	else if (e.target.className === 'placed-print unselectable'){

	}

}, false)

let mousePos = {
	x:0,
	y:0,
	startX:0,
	startY:0,
} 


/*
document.addEventListener('dragover', (e)=>{
	e = e || window.event
	console.log(e)
	let x = e.pageX
	let y = e.pageY

})
*/
document.addEventListener('mouseup', (e)=>{
	if ( print.drag ){
		print.drag = false
		clearInterval(print.interval)
	}
}, false)
