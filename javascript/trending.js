
// ------------var corazon= document.getElementById('corazon');
var corazon= document.getElementById('corazon');
var contenedor= document.getElementById('galeria');
const apiKey= 'qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x';
var iconsdownload= [];
var iconsmax= [];
var gificonmax= [];
var imagengif=[];
var iconsfav=[];
var iconsfavactive=[];
// -------------------creacion de arrayfavoritos----------------------

var stringlocalstorage= localStorage.getItem('favoritos');

if (stringlocalstorage == null || stringlocalstorage == "[]"){
  var arrayfavoritos = [];
 
} else {
   var arrayfavoritos = JSON.parse(stringlocalstorage); 
   
}
console.log(arrayfavoritos)

// -------------------creacion de arrayfavoritos----------------------


// -------------------FUNCION QUE INSERTA TRENDINGS----------------------

async function trendingGifos() { 

    var url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=30&offset=0`; 
    let r= await fetch (url_trending);
    let url= await r.json();
   
                                          //  for que recorre todos las 30 url obtenidas
     for ( let i=0; i<url.data.length; i++){

                                                      // creo un elemento div que va a contener al gif y al hover         
                 var  divgif= document.createElement('div');
                               divgif.className='cont-gifstyle';
            
                                                       // creo gif y hover
                var  gifcontent='<img id="gifstyle" class="gifstyle" src="'
                                  + url.data[i].images.original.url+
                                  '"><div id="hoverdeimagen" class="hovergifs hover"> <div class=" divicons"> <img id="iconfavactive'+[i]+'" class="icon iconfavactive" src="images/icon-fav-active.svg"> <img id="iconfav'+[i]+'" class="icon iconfav" src="images/icon-fav.svg">'+
                                  '<img data-src="https://media0.giphy.com/media/'+url.data[i].id+'/giphy.gif" id="icondownload'+[i]+'" class="icon icondownload" src="images/icon-download.svg" alt="icondownload"><img id="iconmax'+[i]+'" class="icon iconmax" src="images/icon-max-normal.svg">'
                                  +'</div> <div class="hovergifs titulogif">'+url.data[i].username +' <br>'+url.data[i].title +' </div></div>';
                              
              divgif.innerHTML= gifcontent;
              
              contenedor.appendChild(divgif); //creo dentro del contenedor del html los gifs

              // creo una variable para cada icono
          var download=  document.getElementById('icondownload'+[i]); 
          iconsdownload.push(download);

          var max=  document.getElementById('iconmax'+[i]);
          iconsmax.push(max);

          var fav=  document.getElementById('iconfav'+[i]);
          iconsfav.push(fav);

          var favactive=  document.getElementById('iconfavactive'+[i]);
          iconsfavactive.push(favactive);

              // creo una variable para cada url de imagen
          imagengif.push( url.data[i].images.original.url);

              // funcion para mantener el color de los trendings 
          
          keepcolor( `${url.data[i].id}` , i);

              }//<-----cierre for


// =======================interaccion con ICONOS----------------------------------------------------------
              
//========================================for download====================================================================

                for(let j=0; j<iconsdownload.length; j++){
                
                  iconsdownload[j].addEventListener('click',()=>{
                    var iconoparadescarga= iconsdownload[j];
                    var bajaresto= iconoparadescarga.getAttribute("data-src");
                          bajar(bajaresto);         
                  })
                }
//=========================================for download==================================================================



//favoritos===================================-------------------------------++++++++++++++


                  for(let g=0; g< iconsfav.length; g++){
                  
                    iconsfav[g].addEventListener( 'click' , ()=>{
                      iconsfavactive[g].style.display= 'block';
                      iconsfav[g].style.display= 'none';
                      
                    var id_array= url.data[g].id;

                        agregar(id_array);
                                          
                                               })

                    iconsfavactive[g].addEventListener( 'click' , ()=>{
                    var favoritos_eliminar= url.data[g].id;
                      iconsfavactive[g].style.display= 'none';
                      iconsfav[g].style.display= 'block';

                       quitar(favoritos_eliminar);
                       var indicefav= arrayfavoritos.indexOf(favoritos_eliminar);
                       arrayfavoritos.splice(indicefav, 1);
                       if(corazon != null){
                         location.reload(true);}
                        
                    })  
                  }

// agregar gifs al lstorage

// funcion para agregar gif en modo max
function agregarmax(fav){

                      almacenamiento= localStorage.getItem('favoritos');
                      
                      if(almacenamiento== null){
                        almacenamiento=[];

                      } else {
                        almacenamiento= JSON.parse(almacenamiento);
                      }
                      almacenamiento.push(fav);
                      localStorage.setItem('favoritos', JSON.stringify(almacenamiento));
                      
                      }
      // funcion para agregar gifs de trendings
function agregar(fav){

                    var indice = arrayfavoritos.indexOf(fav);
                    if ( indice < 0){
                        arrayfavoritos.push(fav);
                        
                    } else {
                      arrayfavoritos.splice(indice, 1);
                        
                    }
                    localStorage.setItem('favoritos', JSON.stringify(arrayfavoritos)); // me lo convierte en string   
                    if(corazon != null){
                      location.reload(true);}
                     


                  }
                    
// quitar gifs, lo saca del lstorage
function quitar(fav){
  var eliminado= fav;
  almacenamiento= localStorage.getItem('favoritos');
  alm_parse= JSON.parse(almacenamiento);

  var indice= alm_parse.indexOf(eliminado);
                alm_parse.splice(indice, 1);

                localStorage.removeItem('favoritos');

                for (p=0; p< alm_parse.length ; p++){
                  almacenamiento2= localStorage.getItem('favoritos');

                if(almacenamiento2== null){
                  almacenamiento2= [];
                }
                else {
                almacenamiento2= JSON.parse(almacenamiento2);
                }
                almacenamiento2.push (alm_parse[p]);
                localStorage.setItem('favoritos', JSON.stringify(almacenamiento2));
                

 
                    }}

// funcion para mantener el color del corazon
function keepcolor( id , letrafor ){

                      if (arrayfavoritos.indexOf(id) == -1){
                        iconsfavactive[letrafor].style.display= 'none';
                        iconsfav[letrafor].style.display= 'block';
                      }else {
                        iconsfavactive[letrafor].style.display= 'block';
                        iconsfav[letrafor].style.display= 'none';
                    }
                                    }

//favoritos===================================-------------------------------++++++++++++++


//for max===================================-------------------------------++++++++++++++

// pusheo los gifs a max
for(let x=0; x<iconsmax.length; x++){
  iconsmax[x].addEventListener('click',()=>{
    

    var thememax= document.getElementById('thememax');
    
    thememax.href= 'styles/stylemax.css';
    var contenedormaxgaleria= document.getElementById('galeriamax');


    contenedormaxgaleria.innerHTML='';
    gificonmax.innerHTML='';
    gificonmax.push( imagengif[x] )
    var divgifcontenido= document.createElement('div');
       divgifcontenido.className='cont-gifstyle-max';
    var gifcontenido= '<img id="gifstylemax" class="gifstyle-max" src="'
    + imagengif[x]+
    '"><div id="informacion" class="informacion"> <div class="hovergifs titulogifmax">'+url.data[x].username +' <br>'+url.data[x].title +' </div> <div class=" diviconsmax"> <img id="iconfavactivemax'+[x]+'" class="icon iconfavactivemax" src="images/icon-fav-active.svg"><img id="iconfavmax'+[x]+'" class="icon iconfav" src="images/icon-fav.svg">'+
    '<img data-src="https://media0.giphy.com/media/'+url.data[x].id+'/giphy.gif" id="icondownloadmax'+[x]+'" class="icon icondownload" src="images/icon-download.svg">'
    +'</div></div>';
   
    divgifcontenido.innerHTML= gifcontenido;
    contenedormaxgaleria.appendChild(divgifcontenido);
    

    
   
    var contenedormax= document.getElementById('trendiggifosmax');
    contenedormax.style.display='flex';
    var contenedornomax= document.getElementById('trendiggifos');
    contenedornomax.style.display='none';
    var menuchau= document.getElementById('menuprincipal');
    menuchau.style.display='none'

    var principalchau= document.getElementById('principal');
    principalchau.style.display='none'
    var piechau= document.getElementById('pie');
    piechau.style.display='none'

//icondownloadmax
    
    icondownload= document.getElementById('icondownloadmax'+[x]);
    
      icondownload.addEventListener('click',()=>{
        
        var bajaresto= icondownload.getAttribute("data-src");
              bajar(bajaresto);         
      })
//icondownloadmax
    
//favoritos max
console.log(arrayfavoritos);
iconfavmax= document.getElementById('iconfavmax'+[x]);
iconfavactivemax= document.getElementById('iconfavactivemax'+[x]);

    if (arrayfavoritos.indexOf(url.data[x].id) == -1){
      iconfavactivemax.style.display= 'none';
      iconfavmax.style.display= 'block';
    }else {
      iconfavactivemax.style.display= 'block';
      iconfavmax.style.display= 'none';
    }


  iconfavmax.addEventListener( 'click' , ()=>{
   
    iconfavactivemax.style.display= 'block';
    iconfavmax.style.display= 'none';
    
  var id_array= url.data[x].id;

    agregarmax(id_array);
   
  })
  iconfavactivemax.addEventListener( 'click' , ()=>{
    var favoritos_eliminar= url.data[x].id;
       iconfavactivemax.style.display= 'none';
      iconfavmax.style.display= 'block';
  
     quitar(favoritos_eliminar);
      
      
     })  

//favoritos max


  });} //---------------------cierre for max=========================


  // funcionamiento x de max===========================

var xdemax= document.getElementById ('xdemax');
xdemax.addEventListener('click', ()=> {


  var thememax= document.getElementById('thememax');
  thememax.href= '';

  var contenedormax= document.getElementById('trendiggifosmax');
    contenedormax.style.display='none';
    var menuchau= document.getElementById('menuprincipal');
     menuchau.style.display='block';
     var contenedornomax= document.getElementById('trendiggifos');
    contenedornomax.style.display='flex';
  
     var principalchau= document.getElementById('principal');
     principalchau.style.display='flex';
    var piechau= document.getElementById('pie');
    console.log()
    piechau.style.display='block';

var corazonfav= document.getElementById('corazon');
if(corazonfav != null){
  location.reload(true);
}

});
}
 
trendingGifos()


// FUNCION PARA GUARDAR GIFS, USO RECORDRTC.JS======================================================================
async function bajar(url){
          let blob= await fetch(url).then(r => r.blob());
          invokeSaveAsDialog(blob);
}

// FUNCION PARA GUARDAR GIFS, USO RECORDRTC.JS=======================================================================

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






