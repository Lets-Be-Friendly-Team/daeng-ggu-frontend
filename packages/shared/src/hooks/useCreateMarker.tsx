import { ReactNode, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';

import Marker from '../components/navermap/Marker';

export interface LocationState {
  loaded: boolean;
  coordinates: Coordinates;
}

interface Coordinates {
  lat: number;
  lng: number;
}

const useCreateMarker = (map: naver.maps.Map | undefined, location: LocationState, icon: ReactNode) => {
  const naver = window.naver;
  console.log('dddd', location);
  useEffect(() => {
    if (!window.naver || !map) return;
    if (location.loaded) {
      const position = new naver.maps.LatLng(location.coordinates.lat, location.coordinates.lng);
      new naver.maps.Marker({
        position,
        icon: {
          content: ReactDOMServer.renderToString(<Marker>{icon}</Marker>),
        },
        map,
      });
    }
  }, [icon, location, map, naver.maps.LatLng, naver.maps.Marker]);
};

export default useCreateMarker;
