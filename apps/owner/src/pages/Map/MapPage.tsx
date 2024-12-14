import { Header } from '@daeng-ggu/design-system';

import NaverSearchDesignerMap from '@/components/NaverMap/NaverSearchDesignerMap';

const MapPage = () => {
  return (
    <div className='relative h-[calc(100vh-6.4rem)] w-full flex-col'>
      <div className='absolute z-10 w-full'>
        <div className='bg-white px-8'>
          <Header mode='back' title='지도에서 찾기' />
        </div>
      </div>
      <NaverSearchDesignerMap />
    </div>
  );
};

export default MapPage;
