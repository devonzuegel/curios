import * as React from 'react';
import MapPopup from './mapPopup';
import ReactMapboxGl from 'react-mapbox-gl';
import { MonumentDict } from '../reducers/index';
import { MapEvent } from 'react-mapbox-gl/lib/map';
import MonumentLayer from './monumentLayer';
import { MonumentLayout } from './monumentLayer';

const Map = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoibG91aXNjdXJyaWUiLCJhIjoiY3MwR3B3QSJ9._5UXyjEIY0YisuAz9c_tJA'
});

const mapStyle = 'mapbox://styles/louiscurrie/cizcq06l600292so15ydwjckr';

const styles = {
  map: {
    position: 'absolute',
    left: 500,
    right: 0,
    bottom: 0,
    top: 0
  } as React.CSSProperties
};

export interface Props {
  monuments: MonumentDict;
  BoundsChanged: MapEvent;
  mapInit: MapEvent;
  center: number[];
  zoom: number[];
  hoveredItem: string;
  onMonumentClick: (k: string) => void;
  onMouseEnter: (key: string) => void;
  onMouseLeave: () => void;
}

const cultureLayout: MonumentLayout = {
  'icon-image': 'monument'
};

const natureLayout: MonumentLayout = {
  'icon-image': 'nature'
};

class UnescoMap extends React.Component<Props, {}> {
  private markerHover = (key: string, { map }: any) => {
      map.getCanvas().style.cursor = 'pointer';
      this.props.onMouseEnter(key);
  };

  private markerEndHover = (key: string, { map }: any) => {
      map.getCanvas().style.cursor = '';
      this.props.onMouseLeave();
  };

  public render() {
    const { monuments, BoundsChanged, mapInit, center, zoom, hoveredItem, onMonumentClick } = this.props;

    const cultural = Object.keys(monuments).filter(k => monuments[k].category !== 'Natural');
    const natural = Object.keys(monuments).filter(k => monuments[k]. category === 'Natural');

    return (
      <Map
        zoom={zoom}
        center={center}
        style={mapStyle}
        containerStyle={styles.map}
        onZoom={BoundsChanged}
        onStyleLoad={mapInit}
        onMove={BoundsChanged}>
          {
            hoveredItem && (
              <MapPopup monument={monuments[hoveredItem]}/>
            )
          }
          <MonumentLayer
            onMonumentClick={onMonumentClick}
            monuments={monuments}
            monumentIds={cultural}
            layout={cultureLayout}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          />
          <MonumentLayer
            onMonumentClick={onMonumentClick}
            monuments={monuments}
            layout={natureLayout}
            monumentIds={natural}
            markerHover={this.markerHover}
            markerEndHover={this.markerEndHover}
          />
      </Map>
    );
  }
};

export default UnescoMap;
