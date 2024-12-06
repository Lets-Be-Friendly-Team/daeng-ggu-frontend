import { CSSProperties } from 'react';
// import required modules
import { Navigation, Pagination, Zoom } from 'swiper/modules';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper-bundle.css';
// Import Swiper styles
import './swiperStyles.css';
export interface SliderItem {
  // type: 'image' | 'video';
  type: string;
  src: string;
}

interface SliderProps {
  list: SliderItem[];
}

const ImageSlider = ({ list }: SliderProps) => {
  return (
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
      className='mySwiper1 overflow-hidden rounded-md border border-gray-100'
    >
      {list.map((item, index) => (
        <SwiperSlide key={index}>
          <div className='swiper-zoom-container'>
            {item.type === 'video' ? (
              <video controls className='object-contain' src={item.src}>
                {/* Your browser does not support the video tag. */}
              </video>
            ) : (
              <img src={item.src} alt={`이미지 ${index}`} className='object-contain' />
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default ImageSlider;
