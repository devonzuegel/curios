import * as React from 'react'
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl'
import * as MapboxGL from 'mapbox-gl'

// tslint:disable-next-line:no-var-requires
const geojson: GeoJSON.FeatureCollection<
  GeoJSON.GeometryObject
> = require('./geojson.json')

const Map = ReactMapboxGl({
  // TODO: extract into config
  accessToken:
    'pk.eyJ1Ijoib3NuciIsImEiOiJjajZwanhjYmwwMDB3MnhxcG9ocHJmMDBsIn0.T8Xi_6tEDq_4Yf3YSYLEPA',
})

const mapStyle = {
  height: '100%',
  width: '100%',
}

const symbolLayout: MapboxGL.SymbolLayout = {
  'text-field': '{place}',
  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
  'text-offset': [0, 0.6],
  'text-anchor': 'top',
}
const symbolPaint: MapboxGL.SymbolPaint = {}
const circleLayout: MapboxGL.CircleLayout = {visibility: 'visible'}
const circlePaint: MapboxGL.CirclePaint = {}

class GeoJsonLayer extends React.Component<{}, {}> {
  private center = [-122.4194, 37.7749]

  public render() {
    return (
      <div>
        <div className="sidebar">
          {geojson.features.map((store, k) => (
            <div className="listing" key={k}>
              {store.properties.place}
            </div>
          ))}
        </div>
        <div id="map" className="map pad2">
          <Map
            style="mapbox://styles/mapbox/outdoors-v9"
            center={this.center}
            containerStyle={mapStyle}
          >
            <GeoJSONLayer
              data={geojson}
              circleLayout={circleLayout}
              circlePaint={circlePaint}
              circleOnMouseEnter={() => console.log('laksdfjalskdjfasdf')}
              circleOnClick={this.onClickCircle}
              symbolLayout={symbolLayout}
              symbolPaint={symbolPaint}
            />
          </Map>
        </div>
      </div>
    )
  }

  private onClickCircle = (
    evt: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
  ) => {
    console.log(evt.features[0].geometry.coordinates)
  }
}

export default GeoJsonLayer
// import * as React from 'react'

// import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl'
// const stores = require('./geojson.json')

// // import salesforceTower from './data/salesforceTower'

// import './App.css'

// const Map = ReactMapboxGl({
//   accessToken:
//     'pk.eyJ1Ijoib3NuciIsImEiOiJjajZwanhjYmwwMDB3MnhxcG9ocHJmMDBsIn0.T8Xi_6tEDq_4Yf3YSYLEPA',
// })

// class App extends React.Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="sidebar pad2">Listing</div>
//         <div id="map" className="map pad2">
//           <Map
//             style="mapbox://styles/mapbox/outdoors-v9"
//             center={[-77.034084, 38.909671]}
//           >
//             <GeoJSONLayer data={stores} />
//           </Map>
//         </div>
//       </div>
//     )
//   }
// }

// export default App
