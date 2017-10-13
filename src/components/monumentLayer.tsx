import * as React from 'react';
import { Layer, Feature } from 'react-mapbox-gl';
import { MonumentDict } from '../reducers/index';

export interface MonumentLayout {
  'icon-image': 'monument' | 'nature';
}

export interface Props {
  monuments: MonumentDict;
  onMonumentClick: Function;
  markerHover: Function;
  markerEndHover: Function;
  monumentIds: string[];
  layout: MonumentLayout;
}

const monumentLayer: React.StatelessComponent<Props> = ({
  monuments,
  onMonumentClick,
  markerHover,
  markerEndHover,
  monumentIds,
  layout
}) => (
  <Layer
    type="symbol"
    id={layout['icon-image']}
    layout={layout}>
    {
      monumentIds.map(k => (
        <Feature
          onMouseEnter={markerHover.bind(null, k)}
          onMouseLeave={markerEndHover.bind(null, k)}
          onClick={onMonumentClick.bind(null, k)}
          coordinates={monuments[k].latlng}
          key={k}
        />
      ))
    }
  </Layer>
);

export default monumentLayer;
