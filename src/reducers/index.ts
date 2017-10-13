import { routerReducer as routing, RouterState } from 'react-router-redux';
import { combineReducers, Action } from 'redux';
import { SET_MONUMENTS, SET_PHOTOS } from '../constants/monument';

export interface Picture {
  id: string;
  author: string;
  created_at: number;
  flickr_id: string;
  license_id: string;
  monument_id: string;
  updated_at: number;
  url: string;
}

export interface Monument {
  id: string;
  id_number: number;
  category: 'Cultural' | 'Natural' | 'Mixed';
  created_at: string;
  updated_at: string;
  criteria_txt: string;
  danger: string | null;
  date_inscribed: string;
  extension: number;
  historical_description: string | null;
  http_url: string;
  image_url: string;
  iso_code: string;
  justification: string | null;
  latitude: number;
  longitude: number;
  latlng: number[];
  pictures: Picture[];
  location: string;
  states: string;
  long_description: string;
  short_description: string;
  region: string;
  revision: number;
  secondary_dates: string;
  site: string;
  transboundary: number;
  unique_number: number;
}

export interface MonumentDict {
  [id: string]: Monument;
}

interface RThunkAction extends Action {
  payload: any;
  id?: string;
};

export interface State {
  monuments: MonumentDict;
  routing: RouterState;
}

const monuments = (state: MonumentDict = {}, { type, payload, id }: RThunkAction) => {
  switch (type) {
    case SET_MONUMENTS: return {
      ...payload.data
        .map((monument: Monument) => ({
          ...monument,
          latlng: [monument.longitude, monument.latitude]
        }))
        .reduce((acc: MonumentDict, next: Monument) => {
          if (acc[next.id]) {
            acc[next.id] = { ...acc[next.id], ...next };
          } else {
            acc[next.id] = next;
          }

          return acc;
        }, { ...state })
    };
    case SET_PHOTOS: {
      const monument = { ...state[id!] };
      monument.pictures = payload.data;
      return {
        ...state,
        [id!]: monument
      };
    }
    default: return state;
  }
};

const reducers = combineReducers<State>({
  routing,
  monuments
});

export default reducers;
