import React from 'react';
import './Form.css'

class Form extends React.Component {
    render (){
        return(
            <form className="form" onSubmit={this.props.getWeather}>
                <input className="input" type="text" name="city" placeholder="city" />
                <button className="btn">Get Weather</button>
            </form>
        )
    }
}

export default Form;