


var contBusqueda= document.getElementById('cont-busqueda');
var input= document.getElementById('search');
var iconsdownloadsearch= [];
var iconsmaxsearch= [];
var gificonmaxsearch= [];
var imagengifsearch= [];
var iconsfavsearch=[];
var iconsfavactivesearch=[];
var iconsdownloadvermas=[];

var stringlocalstorage= localStorage.getItem('favoritos');

if (stringlocalstorage == null || stringlocalstorage == "[]"){
  var arrayfavoritos = [];

} else {
   var arrayfavoritos = JSON.parse(stringlocalstorage);  
}
//--------------------------------- APRIETO ENTER Y SE MUESTRAN LOS GIFS
input.addEventListener('keydown',(e)=> {
    if (e.keyCode === 13) {
        // cuando aprieto enter quito el titulo y la imagen
        let inspirate1= document.getElementById('inspirate1');
        let inspirate2= document.getElementById('inspirate2');
        console.log(inspirate2);

        inspirate1.style.display= 'none';
        inspirate2.style.display= 'none';

        let amigos= document.getElementById('amigos');
       amigos.style.display= 'none';

  



       //--------------------------------para quitar espacios -------------------------------------
        var inp= input.value.trim().toLowerCase();
        
            if (inp != '') { 
                
                mostrarBusqueda(inp);
         
            } else { 
                inspirate1.style.display= 'block';
                amigos.style.display= 'block';
                contBusqueda.style.display= 'none';
                location.reload(true);
            }


//---------------------------- BORRAR VER MAS PARA QUE NO SE DUPLIQUE---------------------------------------------------
        var  vermas= document.getElementById('vermas');
            vermas.innerHTML='';
    
        
}

});





//------------------------aprieto X y borra lo que estas escribiendo, si no hay texto aparece lupa, elimino sugerencias
var lupa= document.getElementById('lupa');
var equis= document.getElementById('equis');


input.addEventListener('keyup',(e)=> {
    let contenedorsugerencias= document.getElementById('sugerencias');
    contenedorsugerencias.style.display= 'block';

    var inp= input.value.trim().toLowerCase();

    sugerencias(inp);
    contenedorsugerencias.display= 'block';
    equis.style.display= 'block';
    lupa.style.display= 'none';

    if (input.value == "") {
    
        equis.style.display= 'none';
        lupa.style.display= 'block';
        contenedorsugerencias.style.display= 'none';

    
     };
    
// si aprieto enter se salen las sugerencias---------------------
if (e.keyCode === 13) {
  //    elimino sugerencias-----------------------------------------------------
  let contenedorsugerencias= document.getElementById('sugerencias');
  contenedorsugerencias.style.display='none';
}
});

equis.addEventListener('click',()=> {
    let contenedorsugerencias= document.getElementById('sugerencias');
    contenedorsugerencias.style.display= 'none';

  
   input.value= '';
   equis.style.display= 'none';
    lupa.style.display= 'block';

    

});

//------------------funcion BUSQUEDA!!!!    

async function mostrarBusqueda(inputValue) {
  iconsmaxsearch=[];
  iconsfavsearch=[];
  iconsfavactivesearch=[];
  imagengifsearch=[];


           contBusqueda.innerHTML= "";
           var pantalla= screen.width;
           if(pantalla< 560 ){
contBusqueda.style.maxHeight= '845px';}
if(pantalla>560 ){
  contBusqueda.style.maxHeight= '684px';}

var vermas2= document.getElementById('botonvermas2');
vermas2.style.display='none';
var vermas3= document.getElementById('botonvermas3');
vermas3.style.display='none';


           var  vermas= document.getElementById('vermas');
            var imagensincontenido= document.getElementById('imagensincontenido');
            var textootrabusqueda= document.getElementById('textootrabusqueda');

            contBusqueda.style.display= 'grid';
            inspirate1.style.display= 'none';
            amigos.style.display= 'none';
            imagensincontenido.style.display= 'none';
            textootrabusqueda.style.display= 'none';
            vermas.style.display= 'block';
      
           
           
        //  ----------------------  INSERTO TITULO---------------------------------------
        var divconttitulo= document.getElementById ('divtitulo');
        divconttitulo.innerHTML="";
        let divtitulo= document.createElement('div');
       
         let titulo ='<h1 class="titulobusqueda">'+ inputValue +'</h1>';

                  
       divtitulo.innerHTML= titulo;
     
          divconttitulo.appendChild( divtitulo);

// ---------------------------------------INSERTO GIFS-----------------------------------
        let url_busqueda= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&limit=48`;
        
             let geturl= await fetch(url_busqueda);
             var url= await geturl.json();
             
                  for ( let i=0; i<url.data.length; i++){
                    var id= url.data[i].id;
                     var  divResultado= document.createElement('div');
                        divResultado.className= 'contenedor-gif-hover';
                     var  contenidogifs='<img class="gifbuscado" src="'+ url.data[i].images.original.url+'">'+
                     '<div id="hoverdeimagensearch" class="hovergifs hover">'+
                     '<div class="divicons">' +
                            '<img id="iconfavactive_search'+[i]+'" class="icon iconfavactive" src="images/icon-fav-active.svg">'+
                            '<img id="iconfavsearch'+[i]+'" class="icon iconfav" src="images/icon-fav.svg">'+
                            '<img data-src="https://media0.giphy.com/media/'+url.data[i].id+'/giphy.gif" id="icondownload_search'+[i]+'" class="icon icondownload" src="images/icon-download.svg" alt="icondownload">'+
                            '<img id="iconmax_search'+[i]+'" class="icon iconmax" src="images/icon-max-normal.svg">'+
                            '</div> '+
                        '<div class="hovergifs titulogif">'+
                               url.data[i].username +
                              '<br>'+url.data[i].title +
                       
                     '</div>'+
        '</div>';
                  
                     divResultado.innerHTML= contenidogifs;
                  
                       contBusqueda.appendChild(divResultado);

      imagengifsearch.push( url.data[i].images.original.url);

                    //    inserto iconos 
                    
      var downloadsearch=  document.getElementById('icondownload_search'+[i]); 
      iconsdownloadsearch.push(downloadsearch);

      var maxsearch=  document.getElementById('iconmax_search'+[i]);
      iconsmaxsearch.push(maxsearch);

      var favactivesearch=  document.getElementById('iconfavactive_search'+[i]);
      iconsfavactivesearch.push(favactivesearch);

      var favsearch=  document.getElementById('iconfavsearch'+[i]);
      iconsfavsearch.push(favsearch);
      
      iconsMax(url);

      favoritosSearch(url, i );
      keepcolor( id , i )
             } 
             descargar();

                  

         

        //    INSERTO boton VER MAS
        
        var  vermas= document.getElementById('vermas');
        
        let  divvermas= document.createElement('div');

        divvermas.style.margin= '53px 0px 78px 0px '
        divvermas.style.width= '100%';
        divvermas.style.display= 'flex';
        divvermas.style.alignItems= 'center';
      
        var definoboton= `<button onclick="verMas()" id="botonvermas" class="botonvermas">VER MÁS</button>`;
        divvermas.innerHTML= definoboton;
        vermas.appendChild(divvermas); 

        
           //  BUSQUEDA NULA
            
           if(url.data.length === 0 ){

            var  vermas= document.getElementById('vermas');
            var imagensincontenido= document.getElementById('imagensincontenido');
            console.log(imagensincontenido);
            var textootrabusqueda= document.getElementById('textootrabusqueda');
            contBusqueda.style.display= 'none';
            inspirate1.style.display= 'block';
            amigos.style.display= 'block';
            imagensincontenido.style.display= 'block';
            textootrabusqueda.style.display= 'block';
            vermas.style.display= 'none';
            
                                    }
                                   
}
// funciones para los--> VER MAS
function verMas(){
  var pantalla= screen.width;
  if(pantalla<560 ){
    contBusqueda.style.maxHeight= '1715px';}
 
    if(pantalla>560 ){
      contBusqueda.style.maxHeight= '1368px';}
  
vermas.style.display= 'none';
var vermas2= document.getElementById('botonvermas2');

vermas2.style.display='block';
}
function verMas2(){
  var pantalla= screen.width;

if(pantalla<560 ){
  contBusqueda.style.maxHeight= '2585px';}

  if(pantalla>560 ){
    contBusqueda.style.maxHeight= '2052px';}

var vermas2= document.getElementById('botonvermas2');

vermas2.style.display= 'none';
var vermas3= document.getElementById('botonvermas3');
vermas3.style.display='block';

}
function verMas3(){
  var pantalla= screen.width;

  if(pantalla<560 ){
    contBusqueda.style.maxHeight= '3430px';}

  if(pantalla>560 ){
    contBusqueda.style.maxHeight= '2736px';}
  
var vermas3= document.getElementById('botonvermas3');

vermas3.style.display='none';

}



// -----------------------------FUNCION SUGERENCIAS ---------------------------------------------------

async function sugerencias(inputValue){
   
    let contenedorsugerencias= document.getElementById('sugerencias');
    contenedorsugerencias.innerHTML="";
let urlSugerencia= `https://api.giphy.com/v1/gifs/search/tags?api_key=qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x&q=${inputValue}&limit=4&offset=0`;

let urlsugerencia1= await fetch(urlSugerencia);
let urlsugerencia2= await urlsugerencia1.json();



for ( let i=0; i<urlsugerencia2.data.length; i++){
                
    var  divSugerencias= document.createElement('div');

    var  contenidosugerencias='<div id="cadasugerencia" class="cadasugerencia"><img class="lupita" src="images/icon-search.svg" alt="lupita"> '+ urlsugerencia2.data[i].name +'</div>';

  
 
    divSugerencias.innerHTML= contenidosugerencias;
 
    contenedorsugerencias.appendChild(divSugerencias);
 
    // aprieto y me toma la sugerencia---------------------------

var aprietosug= document.getElementsByClassName('cadasugerencia');


aprietosug[i].addEventListener('click', ()=>{
    input.value= urlsugerencia2.data[i].name;
    

    let contenedorsugerencias= document.getElementById('sugerencias');
    contenedorsugerencias.style.display= 'none';
    

});


aprietosug[i].addEventListener('mouseenter', ()=>{
    
    aprietosug[i].style.background=' rgba(0,0,0,0.3)';
    aprietosug[i].style.cursor='pointer';

});
aprietosug[i].addEventListener('mouseleave', ()=>{

    aprietosug[i].style.background='none';
});

}

}

// descargar=-------------------------------

function descargar(){
    for(let j=0; j<iconsdownloadsearch.length; j++){
         
      iconsdownloadsearch[j].addEventListener('click',()=>{
        var iconoparadescarga= iconsdownloadsearch[j];
        var bajaresto= iconoparadescarga.getAttribute("data-src");
              bajar(bajaresto);         
      })
    }}

    async function bajar(url){
        let blob= await fetch(url).then(r => r.blob());
        invokeSaveAsDialog(blob);
      }

      function descargarverMas(){
        for(let j=0; j<iconsdownloadvermas.length; j++){
             
          iconsdownloadvermas[j].addEventListener('click',()=>{
            var iconoparadescarga=iconsdownloadvermas[j];
            var bajaresto= iconoparadescarga.getAttribute("data-src");
                  bajar(bajaresto);         
          })
        }}
    

// descargar=-------------------------------

// favoritos del search
function favoritosSearch(url, g){

                  
    iconsfavsearch[g].addEventListener( 'click' , ()=>{
      iconsfavactivesearch[g].style.display= 'block';
      iconsfavsearch[g].style.display= 'none';
      
    var id_array= url.data[g].id;

        agregar(id_array);
                           
                               })

    iconsfavactivesearch[g].addEventListener( 'click' , ()=>{
    var favoritos_eliminar= url.data[g].id;
      iconsfavactivesearch[g].style.display= 'none';
      iconsfavsearch[g].style.display= 'block';

       quitar(favoritos_eliminar);
       var indicefav= arrayfavoritos.indexOf(favoritos_eliminar);
       arrayfavoritos.splice(indicefav, 1);
       
        
    })  

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

  }
// funcion para mantener el color del corazon
function keepcolor( id , letrafor ){

    if (arrayfavoritos.indexOf(id) == -1){
      iconsfavactivesearch[letrafor].style.display= 'none';
      iconsfavsearch[letrafor].style.display= 'block';
    }else {
      iconsfavactivesearch[letrafor].style.display= 'block';
      iconsfavsearch[letrafor].style.display= 'none';
  }
                  }


// MAXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------------------------------

function iconsMax(url){
  
    for(let x=0; x<iconsmaxsearch.length; x++){
  console.log(url)

    iconsmaxsearch[x].addEventListener('click',()=>{
    
    console.log(url);
    var thememax= document.getElementById('thememax');
    thememax.href= 'styles/stylemax.css';
    var contenedormaxgaleria= document.getElementById('galeriamax');
    
    
    contenedormaxgaleria.innerHTML='';
    gificonmax.innerHTML='';
    gificonmax.push( imagengifsearch[x] )
    var divgifcontenido= document.createElement('div');
       divgifcontenido.className='cont-gifstyle-max';
    var gifcontenido= '<img id="gifstylemax" class="gifstyle-max" src="'
    + imagengifsearch[x]+
    '"><div id="informacion" class="informacion"> <div class="hovergifs titulogifmax">'+ url.data[x].username +' <br>'+url.data[x].title +' </div> <div class=" diviconsmax"> <img id="iconfavactivemaxsearch'+[x]+'" class="icon iconfavactivemax" src="images/icon-fav-active.svg"><img id="iconfavmaxsearch'+[x]+'" class="icon iconfav" src="images/icon-fav.svg">'+
    '<img data-src="https://media0.giphy.com/media/'+url.data[x].id+'/giphy.gif" id="icondownloadmaxsearch'+[x]+'" class="icon icondownload" src="images/icon-download.svg">'
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
    
    downloadmax(x);
    favoritosmaxfav(url, x);
    })}
    }
     //icondownloadmax fav

    function downloadmax (letrafor){
        icondownloadsearch= document.getElementById('icondownloadmaxsearch'+[letrafor]);
        
          icondownloadsearch.addEventListener('click',()=>{
            
            var bajaresto= icondownloadsearch.getAttribute("data-src");
                  bajar(bajaresto);         
          })
        }


        
function favoritosmaxfav(url, x){

    var iconfavmaxsearch= document.getElementById('iconfavmaxsearch'+[x]);
    var iconfavactivemaxsearch= document.getElementById('iconfavactivemaxsearch'+[x]);
  
    if (arrayfavoritos.indexOf(url.data[x].id) == -1){
     iconfavactivemaxsearch.style.display= 'none';
     iconfavmaxsearch.style.display= 'block';
   }else {
     iconfavactivemaxsearch.style.display= 'block';
     iconfavmaxsearch.style.display= 'none';
   }
   
    iconfavmaxsearch.addEventListener( 'click' , ()=>{
   
    iconfavactivemaxsearch.style.display= 'block';
    iconfavmaxsearch.style.display= 'none';
   
    var id_array= url.data[x].id;
   
     agregarmax(id_array);
   
   })
   iconfavactivemaxsearch.addEventListener( 'click' , ()=>{
   var favoritos_eliminar= url.data[x].id;
      iconfavactivemaxsearch.style.display= 'none';
     iconfavmaxsearch.style.display= 'block';
   
    quitar(favoritos_eliminar);
     
     
    })  
   }
   
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



function quitar(fav){
        var eliminado= fav;
        almacenamiento= localStorage.getItem('favoritos');
        alm_parse= JSON.parse(almacenamiento);
      
        var indice= alm_parse.indexOf(eliminado);
                      alm_parse.splice(indice, 1);
      
                      localStorage.clear();
      
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

// MAXXXXXXXXXXxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx------------------------------
    