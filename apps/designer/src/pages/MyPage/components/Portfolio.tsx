import { useNavigate } from 'react-router';
import { PlusIcon } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';

interface IPortfolio {
  portfolioId: number;
  title: string;
  videoUrl: string;
  imgUrlList: string[];
  contents: string;
}

interface IPortfolioProps {
  portfolioList: IPortfolio[];
  certifications: string[];
  // eslint-disable-next-line no-unused-vars
  onPortfolioClick: (portfolioId: number) => void;
}

const Portfolio = ({ portfolioList, certifications, onPortfolioClick }: IPortfolioProps) => {
  const navigate = useNavigate();
  const goToAddPortfolio = () => navigate(`/profile/${ROUTES.portfolioAdd}`);

  return (
    <div className='flex flex-col gap-6 py-5'>
      {/* 포트폴리오 섹션 */}
      <div className='flex flex-col gap-3'>
        <h2 className='text-sub_h2 text-gray-800'>스타일</h2>
        <div className='grid grid-cols-2 gap-4'>
          {portfolioList.map((portfolio) => (
            <div
              key={portfolio.portfolioId}
              className='relative flex flex-col items-center justify-center rounded-md hover:cursor-pointer'
              onClick={() => onPortfolioClick(portfolio.portfolioId)}
            >
              {/* 이미지 */}
              <img
                src={portfolio.imgUrlList[0]}
                alt={portfolio.title}
                className='h-[160px] w-full rounded-md object-cover'
              />
              {/* 포트폴리오 제목과 배경 */}
              <div className='absolute bottom-0 rounded-b-md left-0 w-full bg-gradient-to-t from-gray-500 to-transparent py-4 text-center text-caption text-white'>
                {portfolio.title}
              </div>
            </div>
          ))}
          {/* 추가 버튼 */}
          <div
            className='flex h-[160px] w-full items-center justify-center rounded-md bg-gray-50 hover:cursor-pointer'
            onClick={goToAddPortfolio}
          >
            <span className=''>
              <PlusIcon className='w-[24px] h-[24px]' />
            </span>
          </div>
        </div>
      </div>

      {/* 사업자 등록증 및 자격증 섹션 */}
      <div className='flex flex-col gap-3'>
        <h2 className='text-sub_h2 text-gray-800'>사업자 등록증 및 자격증</h2>
        <div className='flex gap-4'>
          {certifications.map((certUrl, index) => (
            <img
              key={index}
              src={certUrl}
              alt={`Certification ${index + 1}`}
              className='h-[100px] w-[100px] rounded-md object-cover'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
