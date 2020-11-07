


var contBusqueda= document.getElementById('cont-busqueda');
var input= document.getElementById('search');



input.addEventListener('keydown',(e)=> {
    if (e.keyCode === 13) {
        // cuando aprieto enter quito el titulo y la imagen
        let inspirate1= document.getElementById('inspirate1');
        inspirate1.style.display= 'none';
        let amigos= document.getElementById('amigos');
       amigos.style.display= 'none';

       //para quitar espacios 
        var inp= input.value.trim().toLowerCase();
        try {  
            if (inp != '') { 
                
                mostrarBusqueda(inp);
         
            } else { 
                inspirate1.style.display= 'block';
                amigos.style.display= 'block';
                contBusqueda.style.display= 'none';
                throw new Error('No se ingresó nada');
            }
        } catch (err) {
            alert(err);
        }
}

});
                    
async function mostrarBusqueda(inputValue) {
           contBusqueda.innerHTML= "";
           
            


        //    INSERTO TITULO
        var divconttitulo= document.getElementById ('divtitulo');
        divconttitulo.innerHTML="";
        let divtitulo= document.createElement('div');
       
         let titulo ='<h1 class="titulobusqueda">'+ inputValue +'</h1>';

                  
       divtitulo.innerHTML= titulo;
     
          divconttitulo.appendChild( divtitulo);


        let url_busqueda= `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${inputValue}&limit=12`;
        
             let geturl= await fetch(url_busqueda);
             let url= await geturl.json();
             console.log (url);
    
                  for ( let i=0; i<url.data.length; i++){
                
                     var  divResultado= document.createElement('div');
       
                     var  contenidogifs='<img class="gifbuscado" src="'+ url.data[i].images.original.url+'">';
                  
                     divResultado.innerHTML= contenidogifs;
                  
                       contBusqueda.appendChild(divResultado);
             } 
             if(url.data.length === 0 ){
                contBusqueda.style.display= 'none';
                inspirate1.style.display= 'block';
                amigos.style.display= 'block';
                alert('no hay resultados para esta busqueda');
                
    }


        //    INSERTO boton
        
        var vermas= document.getElementById('vermas')
        let  divvermas= document.createElement('div');
        divvermas.style.margin= '53px 0px 78px 0px '
        divvermas.style.width= '100%';
        divvermas.style.display= 'flex';
        divvermas.style.alignItems= 'center';

        
        
        var definoboton= `<button onclick="verMas()" id="botonvermas" class="botonvermas">VER MÁS</button>`;
        divvermas.innerHTML= definoboton;
        vermas.appendChild(divvermas);
        
    
  
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