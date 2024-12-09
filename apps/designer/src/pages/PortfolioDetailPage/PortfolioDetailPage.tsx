import { useNavigate } from 'react-router';
import { CloseIcon, MoreIcon } from '@daeng-ggu/design-system';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './swiperStyle.css';

interface IPortfolioItem {
  portfolioId: number;
  title: string;
  videoUrl: string;
  imgUrlList: string[];
  contents: string;
}

const PortfolioDetailPage = () => {
  const navigate = useNavigate();

  const portfolio: IPortfolioItem = {
    portfolioId: 1,
    title: '비숑 기본 스포팅',
    videoUrl: '',
    imgUrlList: [
      'https://i.pinimg.com/736x/06/a9/cf/06a9cff5c518dfc786736014e90f2f61.jpg',
      'https://i.pinimg.com/736x/cb/57/3f/cb573f3a49c0322ce18aca27b3fdcad0.jpg',
      'https://i.pinimg.com/736x/cc/98/5e/cc985e9670921e5ed30be658122f70c8.jpg',
    ],
    contents: '2024년에 작업한 비숑 기본 스포팅',
  };

  const navigateBack = () => {
    navigate('/profile');
  };

  return (
    <div className='relative flex h-[calc(100vh-65px)] w-full flex-col bg-gray-900'>
      {/* Header */}
      <div className='absolute left-0 right-0 top-0 z-10 flex h-[100px] items-center gap-[10px] bg-gradient-to-b from-black px-5'>
        <div className='flex w-full justify-between'>
          <div className='text-body2 text-secondary'>{portfolio.title}</div>
          <div className='flex flex-col gap-5'>
            <button onClick={navigateBack}>
              <CloseIcon className='h-[20px] w-[20px]' />
            </button>
            <button>
              <MoreIcon className='h-[20px] w-[20px]' color='#F2F4F5' />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Content */}
      <div className='absolute bottom-0 left-0 right-0 z-10 flex h-[25%] items-start bg-gradient-to-t from-black px-5'>
        <div className='flex flex-col gap-2'>
          <div className='text-body2 text-secondary'>{portfolio.contents}</div>
        </div>
      </div>

      {/* Image Swiper */}
      <Swiper
        direction='horizontal'
        slidesPerView={1}
        pagination={{ clickable: true }}
        className='relative h-full'
        modules={[Pagination]}
      >
        {portfolio.imgUrlList.map((imageUrl, index) => (
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
