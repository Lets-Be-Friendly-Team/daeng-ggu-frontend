import { CSSProperties } from 'react';
// import required modules
import { Navigation, Pagination, Zoom } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/zoom';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import Swiper styles
import 'swiper/css';
import './swiperStyles.css';
interface SliderProps {
  list: File[];
}
const ImageSlider = ({ list }: SliderProps) => {
  return (
    <>
      <Swiper
        style={
          {
            '--swiper-navigation-color': 'rgba(var(--gray800)',
            '--swiper-navigation-size': '2rem',
            '--swiper-pagination-color': 'rgba(var(--gray800)',
          } as CSSProperties
        }
        zoom={true}
        navigation={true}
        loop={true}
        pagination={{
          clickable: true,
        }}
        modules={[Zoom, Navigation, Pagination]}
        className='mySwiper overflow-hidden rounded-md border border-gray-100'
      >
        {list.map((item, index) => (
          <SwiperSlide key={index}>
            <div className='swiper-zoom-container'>
              <img src={URL.createObjectURL(item)} alt={`이미지 ${index}`} className='object-contain' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default ImageSlider;
