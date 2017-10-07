import * as React from "react";

import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

import "./App.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1Ijoib3NuciIsImEiOiJjajZwanhjYmwwMDB3MnhxcG9ocHJmMDBsIn0.T8Xi_6tEDq_4Yf3YSYLEPA"
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/outdoors-v9"
          center={[-122.4194, 37.7749]}
          containerStyle={{
            height: "100vh",
            width: "100vw"
          }}
        >
          <Layer
            type="fill"
            id="marker"
            paint={{
              "fill-color": "green",
              "fill-opacity": 0.7
            }}
          >
            <Feature
              coordinates={[
                [
                  [-122.4194, 37.7749],
                  [-122.5194, 37.7749],
                  [-122.4194, 37.7849]
                ]
              ]}
            />
          </Layer>
        </Map>
      </div>
    );
  }
}

export default App;
