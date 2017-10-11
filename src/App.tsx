import * as React from 'react'
import ReactMapboxGl, {GeoJSONLayer} from 'react-mapbox-gl'
import * as MapboxGL from 'mapbox-gl'

// tslint:disable-next-line:no-var-requires
const geojson: GeoJSON.FeatureCollection<
  GeoJSON.DirectGeometryObject
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
  state = {center: [-122.4194, 37.7749], zoom: [12]}

  public render() {
    return (
      <div>
        <div className="sidebar">
          {geojson.features.map((store, k) => (
            <div className="listing" onClick={() => this.flyToStore(store)} key={k}>
              {store.properties.place}
            </div>
          ))}
        </div>
        <div id="map" className="map pad2">
          <Map
            zoom={this.state.zoom}
            style="mapbox://styles/mapbox/outdoors-v9"
            center={this.state.center}
            containerStyle={mapStyle}
          >
            <GeoJSONLayer
              data={geojson}
              circleLayout={circleLayout}
              circlePaint={circlePaint}
              circleOnClick={this.onClickCircle}
              symbolLayout={symbolLayout}
              symbolPaint={symbolPaint}
            />
          </Map>
        </div>
      </div>
    )
  }

  private flyToStore(currentFeature: GeoJSON.Feature<GeoJSON.DirectGeometryObject>) {
    this.setState({center: currentFeature.geometry.coordinates, zoom: [15]})
  }

  private onClickCircle = (
    evt: GeoJSON.FeatureCollection<GeoJSON.DirectGeometryObject>
  ) => {
    console.log(evt.features[0].geometry.coordinates)
    this.flyToStore(evt.features[0])
  }
}

export default GeoJsonLayer
