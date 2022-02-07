import React, { useEffect, useState } from 'react';
import './style.css';

function App() {

  const [city,setcity] = useState(null);
  const [search,setsearch] = useState('Mumbai');

  useEffect(()=>{

    const fetchApi = async ()=>{
           const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=345d4d1d93ebd7bd5d500e2637ed3996`;
           const response= await fetch(url);
           const resJson =await response.json();
           setcity(resJson.main);
    }
    fetchApi()
  },[search])

  return (
        <div className="box">
           <div className="inputdata">
                <input type="search" className="inputfield" value={search}
                  onChange={ (event)=> { setsearch(event.target.value) }}
                />
           </div>

           {!city ?(<p className="error">No data found</p>)
           
           :
           <>
           <div className="info">
             <h2 className="location">
                  <i class="fas fa-street-view"></i> {search}
             </h2>
             <h1 className="temp">
                  {city.temp}cel
             </h1>
             <h3 className="tempmin_max">
                Min : {city.temp_min}cel || Max : {city.temp_max}cel
             </h3>
           </div>

           <div className="wave wave1"></div>
           <div className="wave wave2"></div>
           <div className="wave wave3"></div>
           </>
           
           }



        </div>
  )
}

export default App;