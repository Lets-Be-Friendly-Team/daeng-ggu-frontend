import { useNavigate, useParams } from 'react-router';
import { CloseIcon } from '@daeng-ggu/design-system';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import useGetPortfolioDetail from '@/hooks/queries/DesignerProfile/useGetPortfolioDetail';

import './swiperStyle.css';

const PortfolioDetailPage = () => {
  const navigate = useNavigate();
  const { portfolioId } = useParams();

  const designerId = 4;
  const { data: portfolioData } = useGetPortfolioDetail(designerId, Number(portfolioId));

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      {/* Header */}
      <div className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-black px-5'>
        <div className='flex w-full justify-between'>
          <div className='text-h3 text-secondary'>{portfolioData?.title}</div>
          <div className='flex flex-col gap-5'>
            <button onClick={navigateBack}>
              <CloseIcon className='h-[20px] w-[20px] stroke-gray-50' />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className='absolute bottom-0 left-0 right-0 z-10 flex h-[20%] items-center bg-gradient-to-t from-black px-5'>
        <div className='flex flex-col gap-2'>
          <div className='break-keep text-body2 text-secondary'>{portfolioData?.contents}</div>
        </div>
      </div>

      {/* Image Swiper */}
      <Swiper
        direction='horizontal'
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='mySwiper2 relative h-full'
        modules={[Pagination]}
      >
        {portfolioData?.imgUrlList.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div className='relative h-full w-full overflow-hidden'>
              <img
                src={imageUrl}
                alt={`Portfolio Image ${index + 1}`}
                className='absolute left-0 top-0 h-full w-full object-cover'
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default PortfolioDetailPage;
