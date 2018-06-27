import React, {Component} from 'react'
import {weatherApi} from './apireq'
import './App.css';
import data from '../data.json';
import forecast from '../forecast.json';
import { Button} from 'reactstrap';


class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loaded: false
    };
  }

  componentWillMount() {
    this.getWeather();
  }

  getWeather() {
    this.setState({
      error: null,
      loaded: false
    });

      let current = data.current_observation;

          this.setState({
            temp: current.temperature_string,
            location: current.display_location.full,
            icon_url: current.icon_url,
            time: current.observation_time,
            forcast: forecast.forecast.simpleforecast.forecastday
          });
          console.log(this.state.forcast);
        this.setState({ loaded: true });

  }


  renderForm() {
    return(
      <div className="row">
        <div className="col-md-5 offset-md-3">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="zipcode"
              placeholder="Enter zipcode"
              onChange={event => this.setState({zipcode: event.target.value})}/>
          </div>
        </div>
        <div className="col-md-1">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={() => this.getWeather(this.state.zipcode)}>
            Submit
          </button>
        </div>
      </div>
    )
  }

  renderWeather() {
    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">{this.state.location}</h4>
              <p className="card-text">
                {this.state.time}<br/>
                <img src={this.state.icon_url} alt="weather"/>
              </p>
              <h4>{this.state.temp}&deg;</h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

  handleDeleteItem = (index) => {
    this.state.forcast.splice(index,1);
    this.setState ({ forcast: this.state.forcast });
  }

  renderForcast() {
      const forcasts = this.state.forcast;
      return (
        <div className="row">
          {
            forcasts.map((forcast, index) => {
              return (
                <div className="col-md-3" key={forcast.period}>
                  <div className="card">
                    <div className="card-block">
                    <td><Button onClick= {() => this.handleDeleteItem(index)} color="danger">X</Button></td>
                      <p className="card-text">
                        {forcast.date.weekday} {forcast.date.monthname} {forcast.date.day}<br />
                        <img src={forcast.icon_url} alt="weather" />
                      </p>
                      <h4>High: {forcast.high.fahrenheit} ({forcast.high.celsius})&deg;</h4>
                      <h4>Low: {forcast.low.fahrenheit} ({forcast.low.celsius})&deg;</h4>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      )
    }

  render() {
    if (this.state.loaded) {
      return (
        <div>

          {this.renderForm()}
          {this.renderWeather()}
          {this.renderForcast()}



        </div>
      )
    } else {
      return (
        <div className="center-block">
          <p>Unable to connect to server. Please try again later!</p>
        </div>
      )
    }
  }
}

export default Weather;
