import * as React from 'react'
import * as classnames from 'classnames'

import {TFeature} from './features.d'
import {TProject, TDate} from '../data/project.d'

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

const Tags = ({tags}: {tags: string[]}) => (
  <div className="categories">
    {tags.map((category, i) => (
      <div className="category" key={i}>
        {category}
      </div>
    ))}
  </div>
)

const Timeline = ({events}: {events: TDate[]}) => (
  <table className="timeline">
    {events.map((event, i) => (
      <tr className="timeline-event" key={i}>
        <td className="timeline-event--date">{event.date.toLocaleDateString()}</td>
        <td className="timeline-event--spacer" />
        <td className="timeline-event--title">{event.title}</td>
      </tr>
    ))}
  </table>
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
          <div className="title">{f.properties.place}</div>

          <div
            style={{
              visibility: selected ? '' : 'hidden',
              height: selected ? 'auto' : 0,
            }}
          >
            <Gallery urls={project.mediaUrls} />
            <ul>{project.notes.map((note, i) => <li key={i}>{note}</li>)}</ul>
            <Timeline
              events={project.keyDates.sort(
                (a, b) => (new Date(a.date) > new Date(b.date) ? 1 : 0)
              )}
            />
            <Tags tags={project.categories} />
          </div>
        </div>
      )
      // <pre>{JSON.stringify(f.properties, null, 2)}</pre>
    })}
  </div>
)

export default Sidebar
