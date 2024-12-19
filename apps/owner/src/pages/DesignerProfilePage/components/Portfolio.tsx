import { BadgeCheckIcon, ScissorIcon } from '@daeng-ggu/design-system';

export interface IPortfolio {
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
  return (
    <div className='flex flex-col gap-[2.4rem] py-5'>
      {/* 포트폴리오 섹션 */}
      <div className='flex flex-col gap-[1.2rem]'>
        <div className='flex items-center gap-2'>
          <ScissorIcon className='w-[2rem]' color='fill-gray-800' />
          <h2 className='text-sub_h2 font-semibold text-gray-800'>스타일</h2>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          {portfolioList.length > 0 ? (
            portfolioList.map((portfolio) => (
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
                <div className='absolute bottom-0 left-0 w-full rounded-b-md bg-gradient-to-t from-gray-500 to-transparent py-4 text-center text-caption text-white'>
                  {portfolio.title}
                </div>
              </div>
            ))
          ) : (
            <div className='h-[16rem] text-body3 text-gray-600'>등록된 정보가 없습니다</div>
          )}
        </div>
      </div>

      {/* 사업자 등록증 및 자격증 섹션 */}
      <div className='flex flex-col gap-[1.2rem]'>
        <div className='flex items-center gap-2'>
          <BadgeCheckIcon size='w-[2rem]' className='fill-gray-800' />
          <h2 className='text-sub_h2 font-semibold text-gray-800'>사업자 등록증 및 자격증</h2>
        </div>
        <div className='flex gap-4'>
          {certifications.length > 0 ? (
            certifications.map((certUrl, index) => (
              <img
                key={index}
                src={certUrl}
                alt={`Certification ${index + 1}`}
                className='h-[100px] w-[100px] rounded-md object-cover'
              />
            ))
          ) : (
            <div className='h-[10rem] text-body3 text-gray-600'>등록된 정보가 없습니다</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
