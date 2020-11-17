


var contBusqueda= document.getElementById('cont-busqueda');
var input= document.getElementById('search');


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
                throw new Error('No se ingresó nada');
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
           contBusqueda.innerHTML= "";
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
        let url_busqueda= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&limit=12`;
        
             let geturl= await fetch(url_busqueda);
             var url= await geturl.json();
             console.log (url);
    
                  for ( let i=0; i<url.data.length; i++){
                
                     var  divResultado= document.createElement('div');
       
                     var  contenidogifs='<img class="gifbuscado" src="'+ url.data[i].images.original.url+'">';

                    //  contBusqueda.insertAdjacentElement("afterbegin", contenidogifs);
                  
                     divResultado.innerHTML= contenidogifs;
                  
                       contBusqueda.appendChild(divResultado);
             } 

         

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




async function verMas(){
    vermas.innerHTML='';
    let  vaciar= document.createElement('div');
    vaciar.style.margin= '53px 0px 78px 0px '
    vaciar.style.width= '100%';
    vaciar.style.display= 'flex';
    vaciar.style.alignItems= 'center';
    let definoboton2=`<button onclick="limpiar()" id="botonvermas" class="botonvermas">VACIAR</button>`;
    vaciar.innerHTML= definoboton2;
    vermas.appendChild(vaciar);


    var valor= input.value.trim().toLowerCase();
    let url_vermas= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${valor}&limit=8&offset=12`;
        
    let url1= await fetch(url_vermas);
    let url2= await url1.json();
    console.log (url2);

         for ( let i=0; i<url2.data.length; i++){
       
            let  masgifs= document.createElement('div');

            let  contenidomasgifs='<img class="gifbuscado" src="'+ url2.data[i].images.original.url+'">';
         
            masgifs.innerHTML= contenidomasgifs;
         
              contBusqueda.appendChild(masgifs);


    } 

}


function limpiar(){
    location.reload(true);
}




// -----------------------------FUNCION SUGERENCIAS ---------------------------------------------------





async function sugerencias(inputValue){
   
    let contenedorsugerencias= document.getElementById('sugerencias');
    contenedorsugerencias.innerHTML="";
let urlSugerencia= `https://api.giphy.com/v1/gifs/search/tags?api_key=qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x&q=${inputValue}&limit=4&offset=0`;

let urlsugerencia1= await fetch(urlSugerencia);
let urlsugerencia2= await urlsugerencia1.json();
console.log (urlsugerencia2);


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



