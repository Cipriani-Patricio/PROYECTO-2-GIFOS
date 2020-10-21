
// BURGER MENU-------------------------------


var burger= document.getElementById ('burger');
var x= document.getElementById ('x');
var desplegable= document.getElementById ('desplegable');

burger.addEventListener('click', () => {
    burger.style.display= 'none';
    x.style.display='block';
    desplegable.style.display='block';
} );

x.addEventListener('click', () => {
    burger.style.display= 'block';
    x.style.display='none';
    desplegable.style.display='none';
} );

//  BURGER MENU  END-------------------------------


// CHANGE MODE-------------------------------

var nocturno= document.getElementById ('nocbtn');
var diurno= document.getElementById ('diurbtn');


nocturno.addEventListener('click', () => {
    var linkStyle= document.getElementById ('theme').href= "styles/styledark.css";

} );

diurno.addEventListener('click', () => {
    var linkStyle= document.getElementById ('theme').href= "styles/style.css";

} );

// CHANGE MODE END-------------------------------
