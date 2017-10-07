import * as React from "react";

import ReactMapboxGl from "react-mapbox-gl";

import "./App.css";

const logo = require("./logo.svg");

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib3NuciIsImEiOiJjajZwanhjYmwwMDB3MnhxcG9ocHJmMDBsIn0.T8Xi_6tEDq_4Yf3YSYLEPA"
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">hello</p>

        <Map
          style="mapbox://styles/mapbox/streets-v9"
          center={[-122.4194, 37.7749]}
          containerStyle={{
            height: "300px",
            width: "500px"
          }}
        />
      </div>
    );
  }
}

export default App;
