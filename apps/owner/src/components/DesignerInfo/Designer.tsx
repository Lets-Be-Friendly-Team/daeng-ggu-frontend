import { FullBookMarkIcon, FullStarIcon } from '@daeng-ggu/design-system';

import { DesignerType } from './DesignerData';

const Designer = ({ designer }: { designer: DesignerType }) => {
  return (
    <div>
      <div className='aspect-square w-full overflow-hidden rounded-md'>
        <img className='w-fll h-full object-cover' src={designer.designerImgUrl} alt='디자이너 사진' />
      </div>
      <div className='mt-3 flex flex-col gap-y-1 text-body3 text-gray-600'>
        <div className='flex items-center gap-x-4'>
          <p className='text-h2 font-bold text-primary'>{designer.nickname}</p>

          <div className='flex items-center gap-x-1 leading-3'>
            <FullStarIcon size='w-[1.2rem] h-[1.2rem]' color='fill-[#FFC90A]' />
            <p>{designer.reviewStarAvg}</p>
          </div>
          <div className='flex items-center gap-x-1 leading-3'>
            <FullBookMarkIcon size='w-[1.2rem] h-[1.2rem]' color='fill-primary' />
            <p>{designer.bookmarkCnt}</p>
          </div>
        </div>
        <p className='text-body2'>{designer.address2}</p>
        <div className='flex gap-x-1'>
          {designer.possibleBreed.map((breed, index) => (
            <div key={index} className='flex items-center gap-x-1'>
              <p>{breed}</p>
              {index < designer.possibleBreed.length - 1 && <div className='font-semibold'>|</div>}
            </div>
          ))}
          전문
        </div>
      </div>
    </div>
  );
};

export default Designer;
