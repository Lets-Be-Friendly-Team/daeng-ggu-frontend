import { Marker } from 'react-naver-maps';

interface MyMarkerProps {
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

const MyMarker = ({ location }: MyMarkerProps) => {
  return <Marker position={new window.naver.maps.LatLng(location.coordinates.lat, location.coordinates.lng)} />;
};

export default MyMarker;
