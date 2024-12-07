import ReactDOMServer from 'react-dom/server';
import { Marker, useNavermaps } from 'react-naver-maps';
import { CircleScissorIcon } from '@daeng-ggu/design-system';

import { MarkerType } from '@/types/maps';

const CustomMarker = ({ markerList }: { markerList: MarkerType[] }) => {
  const navermaps = useNavermaps();

  return (
    <>
      {markerList.map((marker) => {
        return (
          <Marker
            onClick={() => {
              console.log('wefew');
            }}
            key={marker.designerId}
            position={new navermaps.LatLng(marker.lat, marker.lng)}
            title={marker.nickname}
            icon={{
              content: ReactDOMServer.renderToString(
                <div className='flex flex-col items-center justify-center gap-1'>
                  <CircleScissorIcon />
                  <div className='flex stroke-red-800 stroke-2 text-iconCaption font-semibold'>{marker.nickname}</div>
                </div>,
              ),
            }}
          />
        );
      })}
    </>
  );
};

export default CustomMarker;
