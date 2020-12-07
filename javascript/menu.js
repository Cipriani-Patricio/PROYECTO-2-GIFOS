
// BURGER MENU-------------------------------


var burger= document.getElementById ('burger');
var x= document.getElementById ('x');
var desplegable= document.getElementById ('desplegable');

burger.addEventListener('click', () => {
    burger.style.display= 'none';
    x.style.display='block';
    desplegable.style.display='block';
    let sacarlupa= document.getElementById('lupa');
    if(sacarlupa != null){
    sacarlupa.style.display= 'none';}
} );

x.addEventListener('click', () => {
    burger.style.display= 'block';
    x.style.display='none';
    desplegable.style.display='none';
    let sacarlupa= document.getElementById('lupa');
    if(sacarlupa != null){
        sacarlupa.style.display= 'block';}
    
} );

//  BURGER MENU  END-------------------------------


// CHANGE theme-------------------------------

var nocturno= document.getElementById ('nocbtn');
var diurno= document.getElementById ('diurbtn');
var flechaleft= document.getElementById('flechaleft');
var flecharight= document.getElementById('flecharight');

nocturno.addEventListener('click', () => {
    var linkStyle= document.getElementById ('theme').href= "styles/styledark.css";

    localStorage.setItem('modo', 'nocturno' );
  
// cambio color flechas de trendings
    flechaleft.setAttribute("src", "images/button-slider-left-md-noct.svg");
    flecharight.setAttribute("src", "images/button-slider-right-md-noct.svg");

} );

diurno.addEventListener('click', () => {
    var linkStyle= document.getElementById ('theme').href= "styles/style.css";
    localStorage.setItem('modo', 'diurno' );

// cambio color flechas de trendings

flechaleft.setAttribute("src", "images/button-slider-left.svg");
  flecharight.setAttribute("src", "images/button-slider-right.svg");

} );

function mantenerModo ( ) {
    if(localStorage.modo == 'nocturno'  ) {
    var linkStyle= document.getElementById ('theme').href= "styles/styledark.css";}
    else {
        var linkStyle= document.getElementById ('theme').href= "styles/style.css";

    }
}

mantenerModo();


// CHANGE theme END------------------------------



