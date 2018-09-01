"use strict"
/* CONSTANTS */


/* APP EVENTLISTENERS  */
document.addEventListener('keypress', (e)=>{
	if ( frame.active ){
		frame.arrowKeyControl(e)
	}
	if ( print.active ){
		protoPrint.prints[frame.id].arrowKeyControl(e)
	}
})

