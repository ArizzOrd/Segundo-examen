import './App.css';
import {useState, useEffect} from 'react';

const axios = require('axios').default;

function App() {
  const [resultado, updResultado] = useState([]);
  const [pais, updPais] = useState("mx");
  
  const consultar = async () => {
    try {
      const url = "https://newsapi.org/v2/top-headlines?apiKey=741378697fbc413ca4be831d6ae52956&country="+pais;
      let res = await axios({
          url,
          method: 'GET',
      });
      updResultado(res.data.articles);
      console.log("Consulta exitosa");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    consultar();
  },[pais]);

  
  return (
    <div className="App">
      <nav class="navbar">
        <div class="container-fluid ">
            <div className='col-md-8'>
              <h1 className='Header'>Examen 2- Noticias  </h1>
            </div>
            
        </div>
      </nav> 
      <div class='container'>
        <div className='container table-scroll '>
          {
            resultado.map((data) => (
              <div className='row m-2 ' key={data.title}>
                <div className='col-md-9'>
                  <div className='row'>
                    <div className='col-md-12'>
                      
                      <h3>{data.title}</h3>
                    </div>
                  </div>
            
                  <div>
                    <p>{data.description}</p>
                  </div>
                  <div className='row'>
                    <div className='col-md-4'>
                      <h4>Autor:</h4> {data.author}
                    </div>
                    <div className='col-md-4'>
                      <h4>Fecha:</h4> {data.publishedAt}
                    </div>
                    <div className='col-md-4'>
                      <h4>Enlace: </h4><a href={data.url}>Ver noticia</a>
                    </div>
                  </div>
                </div>
                <div className='col-md-3 d-flex align-items-center'>
                  <img src={data.urlToImage} className='img-fluid rounded'></img>
                </div>
              </div>
            )
            )
          }
        </div>
      </div>
    </div>      
  );
}

export default App;
