import React, { Component } from 'react';
import Weather from './Weather'
import './App.css';
import Background from '../img/image.jpg';
import { Badge} from 'reactstrap';

var sectionStyle = {
  backgroundSize: 'cover',
  overflow: 'hidden',
  height: '750px',
  backgroundImage: `url(${Background})`
};

class App extends Component {
  render() {
    return (
      <section style={ sectionStyle }>
      <div className="App">
        <div className="container-fluid App-header">
          <h1><Badge color="secondary">Suyash's weather app</Badge></h1>
        </div>
        <div className="container">
          <Weather/>
        </div>

      </div>
      </section>
    );
  }
}

export default App;
