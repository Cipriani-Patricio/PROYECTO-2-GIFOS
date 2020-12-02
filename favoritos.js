//-------------------------------------------------------------- VARIABLES

var contenedorfav= document.getElementById('contenedorfav');
var botonvermas= document.getElementById('vermas');
var imagensincontenido= document.getElementById('favsincontenido');
var textosincontenido= document.getElementById('textofavsincontenido');
//ICONOS DE HOVER
var iconsdownloadfav= [];
var iconsmaxfav= [];
var gificonmaxfav= [];
var imagengiffav=[];
var iconsfavfav=[];
var iconsfavactivefav=[];
 apiKey= 'qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x';

//  DEFINO VARIABLE ARRAY FAVORITOS
var stringlocalstorage= localStorage.getItem('favoritos');

if (stringlocalstorage == null || stringlocalstorage == "[]"){
  var arrayfavoritos = [];

} else {
   var arrayfavoritos = JSON.parse(stringlocalstorage);  
}
console.log(arrayfavoritos)
// FUNCION PARA AGREGAR A LA GRILLA DE
async function agregarfav() {
  if(stringlocalstorage == null || stringlocalstorage == "[]"){
    imagensincontenido.style.display= 'block';
    textosincontenido.style.display= 'block';
    
  } else{


  contenedorfav.innerHTML= '';
  var url_favoritos =`https://api.giphy.com/v1/gifs?ids=${arrayfavoritos.toString()}&api_key=${apiKey}`; 
    let r= await fetch (url_favoritos);
    let urlfav= await r.json();
   console.log(urlfav);

for(let p=0; p<arrayfavoritos.length; p++){

  var id= urlfav.data[p].id;
    

      var div_cont_favoritos= document.createElement('div');
      
      div_cont_favoritos.className='cont-gifstyle';
      var gif_contenidofav= '<img id="gifstyle" class="gifstylefav" src="'+ urlfav.data[p].images.original.url+'">'+
      '<div id="hoverdeimagen" class="hovergifs hover">'+
                   '<div class=" divicons">' +
                          '<img id="iconfavactive_fav'+[p]+'" class="icon iconfavactive" src="images/icon-fav-active.svg">'+
                         
                          '<img data-src="https://media0.giphy.com/media/'+urlfav.data[p].id+'/giphy.gif" id="icondownload_fav'+[p]+'" class="icon icondownload" src="images/icon-download.svg" alt="icondownload">'+
                          '<img id="iconmax_fav'+[p]+'" class="icon iconmax" src="images/icon-max-normal.svg">'+
                          '</div> '+
                      '<div class="hovergifs titulogif">'+
                             urlfav.data[p].username +
                            '<br>'+urlfav.data[p].title +
                     
                   '</div>'+
      '</div>';
     
      div_cont_favoritos.innerHTML= gif_contenidofav;
      contenedorfav.appendChild(div_cont_favoritos);
      imagengiffav.push( urlfav.data[p].images.original.url);
      // array de iconos----------------------------===============================

      var downloadfav=  document.getElementById('icondownload_fav'+[p]); 
      iconsdownloadfav.push(downloadfav);

      var maxfav=  document.getElementById('iconmax_fav'+[p]);
      iconsmaxfav.push(maxfav);

      var favactivefav=  document.getElementById('iconfavactive_fav'+[p]);
      iconsfavactivefav.push(favactivefav);

descargar();
favoritos(id,p);
iconsMax(urlfav);               

  } 
  }
}
//========================================for download====================================================================
function descargar(){
for(let j=0; j<iconsdownloadfav.length; j++){
     
  iconsdownloadfav[j].addEventListener('click',()=>{
    var iconoparadescarga= iconsdownloadfav[j];
    var bajaresto= iconoparadescarga.getAttribute("data-src");
          bajar(bajaresto);         
  })
}}
//=========================================for download==================================================================



//favoritos===================================-------------------------------++++++++++++++
function favoritos(id, letrafor ){


iconsfavactivefav[letrafor].addEventListener( 'click' , ()=>{
quitarfav(id);

location.reload(true);
})  
}


// quitar gifs

function quitarfav(fav){
   var indice = arrayfavoritos.indexOf(fav);
   arrayfavoritos.splice(indice, 1);
   console.log(arrayfavoritos)
           localStorage.setItem('favoritos', JSON.stringify(arrayfavoritos));
            
                } 
// quitar gifs

// Ver Mas!
var vermasboton= document.getElementById('vermas');

function vermasFav(){
  if (arrayfavoritos.length > 12){
   vermasboton.style.display= 'block';
   
  }
}
vermasFav()

vermasboton.addEventListener('click', ()=> {
   contenedorfav.style.maxHeight= '1000px';
   vermasboton.style.display= 'none';
})


// //favoritos===================================-------------------------------++++++++++++++




// //for max===================================-------------------------------++++++++++++++
// agregar gifs al lstorage

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


function iconsMax(urlfav){
for(let x=0; x<iconsmaxfav.length; x++){
iconsmaxfav[x].addEventListener('click',()=>{


var thememax= document.getElementById('thememax');
thememax.href= 'styles/stylemax.css';
var contenedormaxgaleria= document.getElementById('galeriamax');


contenedormaxgaleria.innerHTML='';
gificonmax.innerHTML='';
gificonmax.push( imagengiffav[x] )
var divgifcontenido= document.createElement('div');
   divgifcontenido.className='cont-gifstyle-max';
var gifcontenido= '<img id="gifstylemax" class="gifstyle-max" src="'
+ imagengiffav[x]+
'"><div id="informacion" class="informacion"> <div class="hovergifs titulogifmax">'+ urlfav.data[x].username +' <br>'+urlfav.data[x].title +' </div> <div class=" diviconsmax"> <img id="iconfavactivemaxfav'+[x]+'" class="icon iconfavactivemax" src="images/icon-fav-active.svg"><img id="iconfavmaxfav'+[x]+'" class="icon iconfav" src="images/icon-fav.svg">'+
'<img data-src="https://media0.giphy.com/media/'+urlfav.data[x].id+'/giphy.gif" id="icondownloadmaxfav'+[x]+'" class="icon icondownload" src="images/icon-download.svg">'
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

download(x);
favoritosmaxfav(urlfav, x);
})}
}
 //icondownloadmax fav
function download (letrafor){
icondownloadfav= document.getElementById('icondownloadmaxfav'+[letrafor]);

  icondownloadfav.addEventListener('click',()=>{
    
    var bajaresto= icondownloadfav.getAttribute("data-src");
          bajar(bajaresto);         
  })
}
 //icondownloadmax fav

//favoritos max fav

function favoritosmaxfav(url, x){

 var iconfavmaxfav= document.getElementById('iconfavmaxfav'+[x]);
 var iconfavactivemaxfav= document.getElementById('iconfavactivemaxfav'+[x]);
console.log(iconfavactivemaxfav);
 if (arrayfavoritos.indexOf(url.data[x].id) == -1){
  iconfavactivemaxfav.style.display= 'none';
  iconfavmaxfav.style.display= 'block';
}else {
  iconfavactivemaxfav.style.display= 'block';
  iconfavmaxfav.style.display= 'none';
}

 iconfavmaxfav.addEventListener( 'click' , ()=>{

 iconfavactivemaxfav.style.display= 'block';
 iconfavmaxfav.style.display= 'none';

 var id_array= url.data[x].id;

  agregarmax(id_array);

})
iconfavactivemaxfav.addEventListener( 'click' , ()=>{
var favoritos_eliminar= url.data[x].id;
   iconfavactivemaxfav.style.display= 'none';
  iconfavmaxfav.style.display= 'block';

 quitar(favoritos_eliminar);
  
  
 })  
}

 //favoritos max


async function bajar(url){
  let blob= await fetch(url).then(r => r.blob());
  invokeSaveAsDialog(blob);
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