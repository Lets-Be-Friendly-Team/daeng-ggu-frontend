import { useNavigate } from 'react-router';
import { Input, PlusIcon } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';
import useProfileStore from '@/stores/useProfileStore';

const Step4 = () => {
  const { profileData, setProfileData } = useProfileStore();
  const navigate = useNavigate();
  const addPortfolio = () => {
    navigate(`/${ROUTES.portfolioRegister}`);
  };
  return (
    <div className='flex flex-col gap-y-[2.4rem]'>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>경력</div>
        <Input
          placeholder='경력 입력 (예: 3년 이상 / 5년)'
          value={profileData.workExperience}
          onChange={(e) => setProfileData({ workExperience: e.target.value })}
        />
      </div>
      <div className='flex flex-col gap-y-[0.8rem]'>
        <div className='text-body3 font-semibold text-gray-800'>포트폴리오</div>
        {/* <div className='text-gray-700 text-iconCaption'>포트폴리오는 최대 4개까지 작성 가능합니다</div> */}
        <div className='flex flex-wrap w-full gap-[2%]'>
          {profileData.portfolioList?.map((portfolio, index) => (
            <div key={index} className='relative w-[32%] aspect-square rounded-md overflow-hidden'>
              <img
                className='w-full h-full object-cover'
                src={portfolio.newImgUrlList?.[0]}
                alt='포트폴리오 대표 이미지'
              />
              <div className='absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-500 to-transparent p-3'>
                <p className='text-white text-iconCaption'>{portfolio.title}</p>
              </div>
            </div>
          ))}
          <button
            type='button'
            className='flex items-center w-[32%] justify-center aspect-square rounded-md overflow-hidden border-none bg-gray-50'
            onClick={addPortfolio}
          >
            <PlusIcon className='w-[3rem]' />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Step4;
