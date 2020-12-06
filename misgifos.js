var contenedormisgifos= document.getElementById('contenedormisgifos');
var botonvermas= document.getElementById('vermas');
var imagensincontenido= document.getElementById('sincontenido');
var textosincontenido= document.getElementById('textosincontenido');
//ICONOS DE HOVER
var iconsdownloadmisgifos= [];
var iconsmaxmisgifos= [];
var gificonmaxmisgifos= [];
var imagengifmisgifos=[];
var iconseliminarmisgifos=[];

 





var lstorage= localStorage.getItem('misgifs');

if (lstorage == null || lstorage == "[]"){
  var arraymisgifs = [];

} else {
   var arraymisgifs = JSON.parse(lstorage);  
}
console.log(arraymisgifs)


// ---------------------funcion para insertar mis gifs


async function subirmisgifs(){
// contenedorfav.innerHTML= '';

if(lstorage == null || lstorage == "[]"){
    imagensincontenido.style.display= 'block';
    textosincontenido.style.display= 'block';
    
  } else{

var url_favoritos =`https://api.giphy.com/v1/gifs?ids=${arraymisgifs.toString()}&api_key=${apiKey}`; 

  let r= await fetch (url_favoritos);
  let urlmis= await r.json();


for(let p=0; p<arraymisgifs.length; p++){

    var id= urlmis.data[p].id;
      
  
        var div_cont_misgifos= document.createElement('div');
        
        div_cont_misgifos.className='cont-gifstyle';
        var gif_contenidomisgifos= '<img id="gifstyle" class="gifstylefav" src="'+ urlmis.data[p].images.original.url+'">'+
        '<div id="hoverdeimagen" class="hovergifs hover">'+
                     '<div class=" divicons">' +
                            '<img id="iconeliminar'+[p]+'" class="icon iconeliminar" src="images/icon-trash-normal.svg">'+
                            '<img data-src="https://media0.giphy.com/media/'+urlmis.data[p].id+'/giphy.gif" id="icondownload_fav'+[p]+'" class="icon icondownload" src="images/icon-download.svg" alt="icondownload">'+
                            '<img id="iconmax_fav'+[p]+'" class="icon iconmax" src="images/icon-max-normal.svg">'+
                            '</div> '+
                        '<div class="hovergifs titulogif">'+
                               urlmis.data[p].username +
                       
                     '</div>'+
        '</div>';
       
        div_cont_misgifos.innerHTML= gif_contenidomisgifos;
        contenedormisgifos.appendChild(div_cont_misgifos);

         imagengifmisgifos.push( urlmis.data[p].images.original.url);
        // array de iconos----------------------------===============================
  
            var downloadmisgifos=  document.getElementById('icondownload_fav'+[p]); 
            iconsdownloadmisgifos.push(downloadmisgifos);
    
            var maxmisgifos=  document.getElementById('iconmax_fav'+[p]);
            iconsmaxmisgifos.push(maxmisgifos);
    
            var eliminargifs=  document.getElementById('iconeliminar'+[p]);
            iconseliminarmisgifos.push(eliminargifs);
  
   descargar();
   basurero(id, p);
   iconsMax(urlmis);
              
  
    } 
    }
}
    subirmisgifs()


//========================================for download====================================================================
function descargar(){
    for(let j=0; j<iconsdownloadmisgifos.length; j++){
         
      iconsdownloadmisgifos[j].addEventListener('click',()=>{
        var iconoparadescarga= iconsdownloadmisgifos[j];
        var bajaresto= iconoparadescarga.getAttribute("data-src");
              bajar(bajaresto);         
      })
    }}

    async function bajar(url){
        let blob= await fetch(url).then(r => r.blob());
        invokeSaveAsDialog(blob);
      }
      
//=========================================for download==================================================================

//=========================================ELIMINAR==================================================================

function basurero(id, letrafor){


         
    iconseliminarmisgifos[letrafor].addEventListener('click',()=>{
           quitar(id);
location.reload(true);

    })
  }


  function quitar(id){
    var indice = arraymisgifs.indexOf(id);
    arraymisgifs.splice(indice, 1);
    
            localStorage.setItem('misgifs', JSON.stringify(arraymisgifs));
             
                 } 
                

//=========================================ELIMINAR==================================================================



// //for max===================================-------------------------------++++++++++++++
// agregar gifs al lstorage

function agregarmax(fav){


    almacenamiento= localStorage.getItem('misgifs');
    
    if(almacenamiento== null){
      almacenamiento=[];
  
    } else {
      almacenamiento= JSON.parse(almacenamiento);
    }
    almacenamiento.push(fav);
    localStorage.setItem('misgifs', JSON.stringify(almacenamiento));
    
    }
  
  
  function iconsMax(url){
  for(let x=0; x<iconsmaxmisgifos.length; x++){
  iconsmaxmisgifos[x].addEventListener('click',()=>{
  
  
  var thememax= document.getElementById('thememax');
  thememax.href= 'styles/stylemax.css';
  var contenedormaxgaleria= document.getElementById('galeriamax');
  
  
  contenedormaxgaleria.innerHTML='';
  gificonmax.innerHTML='';
  gificonmax.push( imagengifmisgifos[x] )
  var divgifcontenido= document.createElement('div');
     divgifcontenido.className='cont-gifstyle-max';
  var gifcontenido= '<img id="gifstylemax" class="gifstyle-max" src="'
  + imagengifmisgifos[x]+'">'+
  '<div id="informacion" class="informacion">'+
  '<div class="hovergifs titulogifmax">'+ url.data[x].username +' <br>'+url.data[x].title +' </div>'+
  ' <div class="diviconsmax"> '+
  '<img id="iconeliminarmax'+[x]+'" class="icon iconeliminar" src="images/icon-trash-normal.svg">'+
  '<img data-src="https://media0.giphy.com/media/'+url.data[x].id+'/giphy.gif" id="icondownloadmaxfav'+[x]+'" class="icon icondownload" src="images/icon-download.svg">'

  +'</div></div>';
  
  divgifcontenido.innerHTML= gifcontenido;
  contenedormaxgaleria.appendChild(divgifcontenido);
  
  let id= url.data.id;
  var iconeliminarmax= document.getElementById('iconeliminarmax'+[x]);
  
  var contenedormax= document.getElementById('trendiggifosmax');
  contenedormax.style.display='flex';
  var contenedornomax= document.getElementById('trendiggifos');
  contenedornomax.style.display='none';
  var menuchau= document.getElementById('menuprincipal');
  menuchau.style.display='none';
  
  var principalchau= document.getElementById('principal');
  principalchau.style.display='none'
  var piechau= document.getElementById('pie');
  piechau.style.display='none'
  
  download(x);
  basureromax(id, iconeliminarmax);
  })}
  }
   //icondownloadmax fav
  function download (letrafor){
  iconsdownloadmisgifos= document.getElementById('icondownloadmaxfav'+[letrafor]);
  
    iconsdownloadmisgifos.addEventListener('click',()=>{
      
      var bajaresto= iconsdownloadmisgifos.getAttribute("data-src");
            bajar(bajaresto);         
    })
  }


function basureromax(id,  variable){

         
    variable.addEventListener('click',()=>{
           quitar(id);
location.reload(true);

    })
  }


  function quitar(id){
    var indice = arraymisgifs.indexOf(id);
    arraymisgifs.splice(indice, 1);
    
            localStorage.setItem('misgifs', JSON.stringify(arraymisgifs));
             
                 } 
   //icondownloadmax fav


   
function vermasFav(){
    if (arraymisgifs.length > 8){
     botonvermas.style.display= 'block';
     
    }
  }
  vermasFav()
  
  botonvermas.addEventListener('click', ()=> {
    contenedormisgifos.style.maxHeight= '2000px';
     botonvermas.style.display= 'none';
  })