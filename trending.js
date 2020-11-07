var contenedor= document.getElementById('galeria');
const apiKey= 'qVaHwLcNfQCkaFG9NwjeZcEtilqJDo2x';


async function trendingGifos() { 
    var url_trending = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=30&offset=0`; 
    let r= await fetch (url_trending);
    let url= await r.json();
    console.log(url);

     for ( let i=0; i<url.data.length; i++){
                
            var  divgif= document.createElement('div');
            divgif.style='cont-gifstyle';
            var  gifcontent='<img class="gifstyle" src="'+ url.data[i].images.original.url+'">';
              
              divgif.innerHTML= gifcontent;
              
              contenedor.appendChild(divgif);
          }

}
 
trendingGifos()
