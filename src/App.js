import React from 'react';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'
import axios from 'axios';
import './App.css'

const API_KEY = "84f5e73a62f5f300d6d1c99d217554d6"
const API_KEY_UNSPLASH = "LwRFyTKOBURvKkqR4Nd_57Ks_c_xAR1dkQOUS58f63A"

class App extends React.Component {

  state = {
    city: undefined,
    country: undefined,
    temp: undefined,
    feel_like: undefined,
    temp_min: undefined,
    temp_max: undefined,
    description: undefined,

    photo_src: undefined,
    photo_alt: undefined,

    error: undefined
  }

  componentDidMount() {
    axios.get(`https://api.unsplash.com/search/photos?client_id=${API_KEY_UNSPLASH}&query=city&orientation=landscape`)
      .then(response => {
        let random_photo = response.data
        console.log(random_photo)

        // get a random photo from unsplash
        let random_num = Math.floor(Math.random() * 9)

        this.setState({
          photo_src: random_photo.results[random_num].urls.regular,
          photo_alt: random_photo.results[random_num].alt_description
        })
      })
  }
  
  getWeather = (e) => {
    e.preventDefault();

    const city = e.target.elements.city.value

    if (city) {
      // openweathermap api
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        let weather_data = response.data
        // console.log(weather_data)

        this.setState({
          city: weather_data.name,
          country: weather_data.sys.country,
          temp: weather_data.main.temp,
          feel_like: weather_data.main.feels_like,
          temp_min: weather_data.main.temp_min,
          temp_max: weather_data.main.temp_max,
          description: weather_data.weather[0].description,
          error: ""
        })
      })

      // unsplash api
      axios.get(`https://api.unsplash.com/search/photos?client_id=${API_KEY_UNSPLASH}&query=${city}&orientation=landscape`)
      .then(response => {
        let photo_data = response.data
        console.log(photo_data)

        // get a random photo from unsplash
        let random_num = Math.floor(Math.random() * 9)

        this.setState({
          photo_src: photo_data.results[random_num].urls.regular,
          photo_alt: photo_data.results[random_num].alt_description
        })
      })

    } else {

      this.setState({
        city: undefined,
        country: undefined,
        temp: undefined,
        feel_like: undefined,
        temp_min: undefined,
        temp_max: undefined,
        description: undefined,

        error: "Please enter a city name to search."
      })
      
    }
  
  } 



  render() {
    return(
      <div className="container">
        <div className="app">
          <Titles />
          <Form getWeather={this.getWeather} />
          <Weather 
            city={this.state.city}
            country={this.state.country}
            temp={this.state.temp}
            feel_like={this.state.feel_like}
            temp_min={this.state.temp_min}
            temp_max={this.state.temp_max}
            description={this.state.description}
            photo_src={this.state.photo_src}
            photo_alt={this.state.photo_alt}
            error={this.state.error}
          />
        </div>
      </div>
      
    )
  }
}

export default App;