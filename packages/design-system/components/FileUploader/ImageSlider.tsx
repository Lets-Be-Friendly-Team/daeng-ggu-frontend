import { CSSProperties } from 'react';
// import required modules
import { Navigation, Pagination, Zoom } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation.min.css';
import 'swiper/css/pagination.min.css';
import 'swiper/css/zoom.min.css';
// Import Swiper styles
import 'swiper/css.min.css';
import './swiperStyles.css';
interface SliderProps {
  list: string[];
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
              <img src={item} alt={`이미지 ${index}`} className='object-contain' />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
export default ImageSlider;
