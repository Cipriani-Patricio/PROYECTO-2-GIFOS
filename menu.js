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

