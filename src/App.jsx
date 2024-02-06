import { useEffect, useRef, useState } from 'react';
import './App.css';
import useFetch from './hooks/useFetch';
import LocationCard from './components/LocationCard';
import ResidentCard from './components/ResidentCard';


function App() {

  const [finder, setFinder] = useState(Math.floor(Math.random() * 126 + 1));
  const [location, getLocation, isloading, hasError] = useFetch();

  useEffect(() =>{

    const url = `https://rickandmortyapi.com/api/location/${finder}`;
    getLocation(url);
  }, [finder]);

  //console.log(location);

 const textInput =  useRef();

 const handleSubmit = event => {
  event.preventDefault();
  setFinder(textInput.current.value.trim())
 }

  return (
    <div className='app'>
      {
        isloading ?
          <h2>loading...</h2>
          :
         <>
     
              <h1>Rick and Morty</h1>
              <form 
              onSubmit={handleSubmit}
              className='app__form'
              >
                    <input
                    className='app__text'
                    type="number" ref ={ textInput} placeholder='type a number (1 to 126)'/>
                    <button className='app__btn'>Search</button>
              </form>
              {
                hasError  || finder === '0' ?
                  <h2>This location do not exist</h2>
                  :
                  <>
                      <LocationCard 
                          location = {location}
                      />
                      <div className='app__container'>
                  {
                      location?.residents.map(resident => (
                        <ResidentCard 
                             key={resident}
                             url = {resident}
                        />
                    ))
                  }
                  </div>
                </>
              }    
        </>
      }
  </div>
 )
}
export default App
