import * as React from 'react';

import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import salesforceTower from './data/salesforceTower';

import './App.css';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1Ijoib3NuciIsImEiOiJjajZwanhjYmwwMDB3MnhxcG9ocHJmMDBsIn0.T8Xi_6tEDq_4Yf3YSYLEPA',
});

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Map
          style="mapbox://styles/mapbox/outdoors-v9"
          center={[-122.4194, 37.7749]}
          containerStyle={{
            height: '100vh',
            width: '100vw',
          }}
        >
          <Layer
            type="circle"
            paint={{
              'circle-radius': 9,
              'circle-color': '#E54E52',
              'circle-opacity': 0.5,
            }}
          >
            <Feature coordinates={salesforceTower.locations[0]} />
          </Layer>

          <Marker
            style={{ cursor: 'pointer' }}
            onClick={() => alert(JSON.stringify(salesforceTower, null, 2))}
            coordinates={salesforceTower.locations[0] as [number, number]}
            anchor="bottom"
          >
            <h1>{salesforceTower.names[0]}</h1>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default App;
