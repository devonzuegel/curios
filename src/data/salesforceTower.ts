import {TProject} from './project.d'

const oneBillion = 1000000000.0

const salesforceTower: TProject = {
  names: ['Salesforce Tower'],
  keyDates: [{date: new Date('2018'), title: 'Expected completion date', notes: []}],
  locations: [{kind: 'point', coordinates: [-122.3969, 37.7899]}],
  budgets: [
    {cost: {amount: oneBillion, currency: 'USD'}},
    {cost: {amount: oneBillion * 1.1, currency: 'USD'}},
  ],
  categories: ['building', 'construction', 'private', 'skyscraper'],
  notes: [
    '1,070-foot (326 m) tall',
    'Salesforce Tower is the centerpiece of the San Francisco Transbay redevelopment plan.',
  ],
  players: [
    'Salesforce',
    'Boston Properties (owner — 95%)',
    'Hines Interests LP (owner — 5%)',
    'Pelli Clarke Pelli Architects',
  ],
  mediaUrls: [
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/' +
      'Salesforce_Tower_during_construction%2C_January_2017.jpg/' +
      '1920px-Salesforce_Tower_during_construction%2C_January_2017.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a3/Salesforce_Tower_April_2017.jpg',
    'http://www.salesforcetower.com/files/9813/9408/1712/Transbay_Tower_leasing_main_960.jpg',
    'http://www.salesforcetower.com/files/2814/3275/4766/salesforce-tower-welcome-to-the-new-center-960-2.jpg',
    'https://cdn2-img.pressreader.com/pressdisplay/docserver/getimage.aspx?' +
      'regionKey=DaDQBIgjR1OPgqe3AqEVYg%3D%3D&scale=100',
  ],
  resourceUrls: ['https://en.wikipedia.org/wiki/Salesforce_Tower'],
}

export default salesforceTower
