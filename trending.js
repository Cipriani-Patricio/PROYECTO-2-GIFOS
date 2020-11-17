

// -------------- INGRESAR GIFS y HOVER EN GALERIA------------------------------------------
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
            
            
            
var  gifcontent='<img id="gifstyle" class="gifstyle" src="'
                  + url.data[i].images.original.url+
                  '"><div id=" hoverdeimagen" class="hovergifs hover"> <div class=" divicons"> <img id="iconfav" class="icon" src="images/icon-fav.svg">'+
                  '<img id="icondownload" class=" icon" src="images/icon-download.svg"><img id="iconmax" class="icon" src="images/icon-max-normal.svg">'
                  +'</div> <div class="hovergifs titulogif">'+url.data[i].username +' <br>'+url.data[i].title +' </div></div>';
              
              divgif.innerHTML= gifcontent;
              
              contenedor.appendChild(divgif);


              



                                             }
}
 
trendingGifos()


// -------------- BOTONES carrousel HOVER Y MODOS ------------------------------------------


var flechaleft= document.getElementById('flechaleft');
var flecharight= document.getElementById('flecharight');



flechaleft.addEventListener('mouseenter',  () => {
  flechaleft.setAttribute("src", "images/button-slider-left-hover.svg");

} );

flechaleft.addEventListener('mouseleave',  () => {
  flechaleft.setAttribute("src", "images/button-slider-left.svg");
  
  if(localStorage.modo=== "nocturno"){
    flechaleft.setAttribute("src", "images/button-slider-left-md-noct.svg");
  
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



// --------------ICONOS FUNCIONALIDAD ------------------------------------------

