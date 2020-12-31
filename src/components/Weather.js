import React from 'react';
import './Weather.css'

class Weather extends React.Component {
    render(){
        return(
            <div className="weather">

                <div className="weather-info">
                    { this.props.city && this.props.country && <h1>{this.props.city}, {this.props.country}</h1>}
                    { this.props.temp && <p>Temperature: {this.props.temp}C</p> }
                    { this.props.feel_like && <p>Feels like: {this.props.feel_like}C</p> }
                    { this.props.description && <p>Condition: {this.props.description}</p> }
                </div>
                
                <div className="bg-img" >
                    {/* photo */}
                    { this.props.photo_src && this.props.photo_alt && <img src={this.props.photo_src} alt={this.props.photo_alt}></img> }
                </div>
                
                
                {/* error */}
                { this.props.error && <p>{this.props.error}</p> }
            </div>
        )
    }
}

export default Weather;