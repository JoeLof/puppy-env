import { useState, useEffect } from 'react'
import './unsplash-puppies-css.css'
import axios from 'axios';
import Display from './Display';
import Form from './Form';

function App() {

  // MY STATES!
  const [allPhotos, setAllPhotos] = useState([])
  const [finalPhotos, setFinalPhotos] = useState([])
  

  const apiKey = import.meta.env.VITE_API_KEY
  const url = 'https://api.unsplash.com/search/photos'

  // Set up our useEffect so our AXIOS method can call our API on initialization

  useEffect( () => {
    axios({
      url: url,
      method: "GET",
      dataResponse: "json",
      params: {
        client_id: apiKey,
        query: "puppies",
        per_page: 50
      }
    }).then( (res) => {
      // console.log(res.data.results)
      // We will create our own ratios for the 3 different orientations based on the photos' widths and heights
      // LOOP through the results array
      // Find the ratio by dividing WIDTH by HEIGHT
      // Set Orientation (variable?) based on ratio!

      const data = res.data.results;

      const withOrientation = data.map( (photo)=> {
        const ratio = photo.width / photo.height;
        let orientation = 'square-ish';

        if (ratio < 0.75) {
          orientation = 'portraitlike'
        } else if (ratio > 1.35){
          orientation = 'landscapey'
        }

        return { ...photo, orientation: orientation }
      })
      // Store our NEW ARRAY in our STATE!
      setAllPhotos(withOrientation);

    } )
  }, [])


  // Our FORM'S HandleSubmit Function will be created here!
  const handleSubmit = (event, userOrientation) => {
    event.preventDefault();
    console.log(userOrientation)
    
    
    // First we need a COPY of the allPhotos array (a TRUE copy... see JS SuperPowers lesson)
    const copyOfAllPhotos = [...allPhotos];

    // Second we need to FILTER that copy array into ANOTHER array that holds JUST the photos that match the user's orientation

    const filteredPhotos = copyOfAllPhotos.filter( (photo) => {
      // my condition goes here
      return photo.orientation === userOrientation
    } )

    setFinalPhotos(filteredPhotos)

  }

  return (
    <>
      <h1>Hi!</h1>
      {/* We use props to store our handleSubmit FUNCTION in a PROP object in the FORM component */}
      <Form photoSubmit={handleSubmit}/>
      <Display photos={finalPhotos} />
    </>
  )
}

export default App
