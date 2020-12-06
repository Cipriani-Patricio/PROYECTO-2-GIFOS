// variables

var paso1= document.getElementById('paso1');
var paso2= document.getElementById('paso2');
var paso3= document.getElementById('paso3');
var nuevogifo= document.getElementById('nuevogifo');
var video= document.getElementById('video');
var textoinicial= document.getElementById('textoinicial');
var texto1= document.getElementById('texto1');
var comenzar= document.getElementById('comenzar');
var buttongrabar= document.getElementById('grabar');
var finalizar= document.getElementById('finalizar');
var contador= document.getElementById('contador');
var subirgif= document.getElementById('subir');
var repetirgif= document.getElementById('repetir');
var subiendogif= document.getElementById('subiendo');
var gifsubido= document.getElementById('gifsubido');
var gifcreado= document.getElementById('gifcreado');
var iconlink= document.getElementById('iconlink');
var icondownloadcrear= document.getElementById('icondownloadcrear');
var theme= document.getElementById('theme');

var apikey= "qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x";
var form = new FormData();


buttongrabar.style.display= 'none';
finalizar.style.display= 'none';
contador.style.display= 'none';
subirgif.style.display= 'none';
repetirgif.style.display= 'none';
subiendogif.style.display= 'none';
gifsubido.style.display='none';
gifcreado.style.display='none';

video.style.display= 'none';

// funcion inicio da lugar al primer paso

async function inicio(){

  if (localStorage.getItem('modo')== 'nocturno'){
   
    paso1.style.content= "url(images/paso-a-paso-hover-mod-noc-1.svg)";

  }else{
  paso1.style.content= "url(images/paso-a-paso-hover-1.svg)";
    

  }

    textoinicial.style.display= 'none';
    texto1.style.display='block';
    comenzar.style.display= 'none';
    

    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
           height: {max: 480} ,
          
        }
     })
     .then(function(stream) {

      texto1.style.display= 'none';
      if (localStorage.getItem('modo')== 'nocturno'){
        paso1.style.content= "url(images/paso-a-paso-mod-noc-1.svg)";
        paso2.style.content= "url(images/paso-a-paso-hover-mod-noc-2.svg)";

      }else{
        paso1.style.content= "url(images/paso-a-paso-1.svg)";
        paso2.style.content= "url(images/paso-a-paso-hover-2.svg)";

      }
        video.style.display='block';
        buttongrabar.style.display= 'flex';
        video.srcObject = stream;
        video.play();


        
      recorder = RecordRTC(stream, {
        type: "gif",
        frameRate: 1,
        quality: 10,
        width: 360,
        hidden: 240,
        onGifRecordingStarted: function () {
          console.log("Iniciando grabación");
        },
      });
    });
    }


// funcion de comenzar a grabar


function grabar() { 
   buttongrabar.style.display= 'none';
   finalizar.style.display= 'flex';
   contador.style.display= 'block';

  recorder.startRecording();


  momentoDeInicio = new Date().getTime();
// defino funcion que comience a contar
   (function looper() {
    if (!recorder) {
           return;
                  }
      contador.innerHTML = tiempo(
      (new Date().getTime() - momentoDeInicio) / 1000
    );
    setTimeout(looper, 1000);
  })();
}


function tiempo(s) {
   var hora = Math.floor(s / 3600);
   var minutos = Math.floor((s - hora * 3600) / 60);
   var segundos = Math.floor(s - hora * 3600 - minutos * 60);
  //  para que se muestre con el formato 00:00:00
   if (minutos < 10) {
     minutos = "0" + minutos;
   }
   if (segundos < 10) {
     segundos = "0" + segundos;
   }
   return hora + ":" + minutos + ":" + segundos;
 }



function finalizargrabacion() {
  

  contador.style.display="none";

  finalizar.style.display = "none";
  subirgif.style.display= 'flex';
  repetirgif.style.display= 'flex';
    

  recorder.stopRecording(function () {
    video.style.display = "none";


    blob = recorder.getBlob();
    gifcreado.src = URL.createObjectURL(recorder.getBlob());
    gifcreado.style.display = "block";

    form.append("file", recorder.getBlob(), "gifcreado.gif");
   
    form.append("api_key", apikey);

  })
}


function repetir(){
  
  recorder.clearRecordedData();

  navigator.mediaDevices.getUserMedia({

          audio: false,
          video: {
            height: {max: 480} 
          }})     

 .then(function(stream) {

        gifcreado.style.display= 'none';
        subirgif.style.display= 'none';
        repetirgif.style.display= 'none';
        video.style.display='block';
        buttongrabar.style.display= 'flex';


        video.srcObject = stream;
        video.play();


        recorder = RecordRTC(stream, {
          type: "gif",
          frameRate: 1,
          quality: 10,
          width: 360,
          hidden: 240,
          onGifRecordingStarted: function () {
            console.log("Iniciando grabación");
          },
        });
 });
 form.delete("file");
 form.delete("api_key");
}



function subir(){
  if (localStorage.getItem('modo')== 'nocturno'){
    paso2.style.content= 'url(images/paso-a-paso-mod-noc-2.svg)';
paso3.style.content='url(images/paso-a-paso-hover-mod-noc-3.svg)';
    
  }else{
    paso2.style.content= 'url(images/paso-a-paso-2.svg)';
paso3.style.content='url(images/paso-a-paso-hover-3.svg)';


  }




repetirgif.style.display= 'none';
 subiendogif.style.display= 'flex';
 subirgif.style.display= 'none';

 
 fetch(`https://upload.giphy.com/v1/gifs`, {
    method: "POST",
    body: form,
  })
  .then((r) => {
    return r.json();
  }) 
  .then((migif)=>{

    subiendogif.style.display= 'none';
    gifsubido.style.display='flex'; 
     var idgif= migif.data.id;
     console.log(idgif)
    descargar(idgif);
    compartir(idgif);
    subirAmisGifs(idgif);
  } )

}

function compartir(id){
  
  iconlink.addEventListener("click",()=>{
    window.open(`https://media0.giphy.com/media/${id}/giphy.gif`, "_blank");
  })
}

function descargar(id){      
  icondownloadcrear.addEventListener('click',()=>{
    
    var bajaresto= `https://media0.giphy.com/media/${id}/giphy.gif`;
          bajar(bajaresto);         
  })
}
async function bajar(url){
  let blob= await fetch(url).then(r => r.blob());
  invokeSaveAsDialog(blob);
}
function subirAmisGifs(id){
 gifs = localStorage.getItem('misgifs');

  if (gifs == null) {
  gifs = [];
}   else {
  gifs = JSON.parse(gifs);
}
        
gifs.push(id);

localStorage.setItem('misgifs', JSON.stringify(gifs));
}




