import * as React from 'react'
import * as classnames from 'classnames'

import {TFeature} from './features.d'
import {TProject} from '../data/project.d'

const Gallery = ({urls}: {urls: string[]}) => (
  <div className="gallery">
    {urls.map((url, i: number) => (
      <div
        key={i}
        className="picture"
        style={{
          background: `url(${url}) no-repeat center center`,
          backgroundSize: 'cover',
        }}
      />
    ))}
  </div>
)

const Sidebar = (props: {
  features: TFeature[]
  selectFeature: (f: TFeature) => () => void
  selectedPlace?: string
}) => (
  <div
    className={classnames({
      sidebar: true,
      'feature-selected': !!props.selectedPlace,
    })}
  >
    {props.features.map((f: TFeature, k) => {
      const selected = f.properties.place === props.selectedPlace
      const project: TProject = f.properties
      return (
        <div
          className={classnames({listing: true, selected})}
          onClick={props.selectFeature(f)}
          key={k}
        >
          <b>{f.properties.place}</b>

          <div
            style={{
              visibility: selected ? '' : 'hidden',
              height: selected ? 'auto' : 0,
            }}
          >
            <Gallery urls={project.mediaUrls} />
            <pre>{JSON.stringify(f.properties, null, 2)}</pre>
          </div>
        </div>
      )
    })}
  </div>
)

export default Sidebar
