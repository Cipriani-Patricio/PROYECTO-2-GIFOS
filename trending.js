

// -------------- INGRESAR GIFS EN GALERIA=------------------------------------------
var contenedor= document.getElementById('galeria');
const apiKey= 'qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x';

async function trendingGifos() { 
    var url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=30&offset=0`; 
    let r= await fetch (url_trending);
    let url= await r.json();
    console.log(url);


    var gifgaleria= document.getElementsByClassName('gifstyle');

     for ( let i=0; i<url.data.length; i++){
                
            var  divgif= document.createElement('div');
            divgif.className='cont-gifstyle';
            
var  gifcontent='<img id="gifstyle" class="gifstyle" src="'+ url.data[i].images.original.url+'"> ';
              
              divgif.innerHTML= gifcontent;
              
              contenedor.appendChild(divgif);


// --------------GIFS HOVER-------------------------------------

// gifgaleria[i].addEventListener('click',  () => {
//   var  hovertransparente= document.createElement('div');
//  hovertransparente.className ='hovertransparente';
//  contenedor.appendChild(hovertransparente);
//  console.log(hovertransparente)

  
// } );

// gifgaleria[i].addEventListener('mouseleave',  () => {
//   gifgaleria[i].style.border= '0px';
// } );
// --------------GIFS HOVER------------------------------------------
     }
}
 
trendingGifos()


// -------------- BOTONES HOVER Y MODOS ------------------------------------------


var flechaleft= document.getElementById('flechaleft');
var flecharight= document.getElementById('flecharight');



flechaleft.addEventListener('mouseenter',  () => {
  flechaleft.setAttribute("src", "images/button-slider-left-hover.svg");

} );

flechaleft.addEventListener('mouseleave',  () => {
  flechaleft.setAttribute("src", "images/button-slider-left.svg");
  
  if(localStorage.modo=== "nocturno"){
    flecharight.setAttribute("src", "images/button-slider-left-md-noct.svg");
  
    }

} );

flecharight.addEventListener('mouseenter',  () => {
  flecharight.setAttribute("src", "images/button-slider-right-hover.svg");
  

} );
flecharight.addEventListener('mouseleave',  () => {
  flecharight.setAttribute("src", "images/button-slider-right.svg");

  if(localStorage.modo=== "nocturno"){
  flecharight.setAttribute("src", "images/button-slider-right-md-noct.svg");

  }

} );


// -------------- FIN BOTONES HOVER Y MODOS ------------------------------------------

// -------------- CARRUSEL------------------------------------------
flechaleft.addEventListener('click',  () => {
  var galeria= document.getElementById('galeria').scrollLeft;
  document.getElementById('galeria').scrollLeft -= 200;

} );
flecharight.addEventListener('click',  () => {
  var galeria= document.getElementById('galeria').scrollLeft;
  document.getElementById('galeria').scrollLeft += 200;
 
 } );

// -------------- CARRUSEL------------------------------------------





