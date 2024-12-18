import { useEffect, useRef } from 'react';
import ReactDOMServer from 'react-dom/server';
import { MyLocationIcon, TypeTwoButton } from '@daeng-ggu/design-system';
import { Marker, useInitNavermap, useWatchUserLocation } from '@daeng-ggu/shared';

const NotGuadianProgressStep1 = () => {
  const { naver } = window;
  const { mapContainerRef, mapRef } = useInitNavermap();
  const markerRef = useRef<naver.maps.Marker | null>(null);

  const location = useWatchUserLocation();

  useEffect(() => {
    if (!naver || !mapRef.current || !location.loaded) return;

    if (location) {
      const { lat, lng } = location.coordinates;
      const position = new naver.maps.LatLng(lat, lng);
      markerRef.current = new naver.maps.Marker({
        position,
        icon: {
          content: ReactDOMServer.renderToString(
            <Marker>
              <MyLocationIcon className='fill-primary' />
            </Marker>,
          ),
        },
        map: mapRef.current,
      });
      mapRef.current.setCenter(position);
    }

    return () => {};
  }, [location, mapRef, naver]);

  return (
    <section className='flex h-[100vh] flex-col items-center'>
      <h2 className='mb-[1rem] mt-[3rem] w-full text-sub_h2 font-semibold'>디자이너 정보</h2>
      {/*
        디자이너 정보 컴포넌트
      */}
      <h2 className='mb-[1rem] mt-[3rem] w-full text-sub_h2 font-semibold'>디자이너 위치</h2>
      <div className={'h-[30rem] w-full'} ref={mapContainerRef}></div>

      <div className='mt-10 flex gap-4'>
        <TypeTwoButton className='px-[2rem]' text='댕꾸에게 문의' color='bg-secondary' onClick={() => {}} />
      </div>
    </section>
  );
};

export default NotGuadianProgressStep1;
