import { LogoImage } from '@daeng-ggu/design-system';

import Designer from './Designer';
import { DesignerType } from './DesignerData';
interface DesignerListProps {
  // category: string;
  dataList: DesignerType[];
}
// const DesignerList = ({ category }: DesignerListProps) => {
const DesignerList = ({ dataList }: DesignerListProps) => {
  return (
    <div className='flex flex-col gap-y-[5rem]'>
      {dataList.length > 0 ? (
        dataList.map((designer, index) => {
          if (designer.nickname) {
            //프로필 작성한 디자이너만 메인에 노출
            return <Designer key={index} designer={designer} />;
          }
        })
      ) : (
        <div className='flex w-full flex-col items-center gap-y-[2rem] pt-[3rem]'>
          <img src={LogoImage} className='w-1/5'></img>
          <p className='text-body3 text-gray-700'>해당하는 디자이너가 없습니다</p>
        </div>
      )}
    </div>
  );
};
export default DesignerList;
