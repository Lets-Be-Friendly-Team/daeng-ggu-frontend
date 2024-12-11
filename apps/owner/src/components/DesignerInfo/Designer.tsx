import { FullBookMarkIcon, FullStarIcon } from '@daeng-ggu/design-system';

import { DesignerType } from './DesignerData';

const Designer = ({ designer }: { designer: DesignerType }) => {
  return (
    <div>
      <div className='aspect-square w-full overflow-hidden rounded-md'>
        <img className='w-fll h-full object-cover' src={designer.designerImgUrl} alt='디자이너 사진' />
      </div>
      <div className='mt-4 flex flex-col gap-y-2 text-body3 text-gray-600'>
        <div className='flex h-[2.2rem] items-center gap-x-4'>
          <p className='text-sub_h1 font-bold text-primary'>{designer.nickname}</p>

          <div className='flex gap-x-1'>
            <FullStarIcon size='w-[1.2rem] h-[1.2rem]' color='#FFC90A' />
            <p>{designer.reviewStarAvg}</p>
          </div>
          <div className='flex gap-x-1'>
            <FullBookMarkIcon size='w-[1.2rem] h-[1.2rem]' color='fill-primary' />
            <p>{designer.bookmarkCnt}</p>
          </div>
        </div>
        <p className='text-body2'>{designer.address2}</p>
        <div className='flex gap-x-1'>
          {designer.possibleBreed.map((breed, index) => (
            <div key={index} className='flex items-center gap-x-1'>
              <p>{breed.codeDesc.substring(0, 3)}</p>
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
