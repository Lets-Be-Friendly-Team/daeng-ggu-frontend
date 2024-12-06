import Designer from './Designer';
import { DesignerType } from './DesignerData';

interface DesignerListProps {
  // category: string;
  dataList: DesignerType[];
}
// const DesignerList = ({ category }: DesignerListProps) => {
const DesignerList = ({ dataList }: DesignerListProps) => {
  /* api 연동
   * get은 한번(searchWord에 빈값 넣어서 전체 조회)
   * category마다 다른 column 가져와서 dataList 변수에 저장
   */
  // const [dataList, setDataList] = useState<DesignerType[]>([]);
  // const dataListName = `${category}dataList`;
  // useEffect(() => {
  //   switch (category) {
  //     case 'total':
  //       setDataList(designerList);
  //       break;
  //     case 'popular':
  //       setDataList(popularList);
  //       break;
  //     case 'spa':
  //       setDataList(premiumSpList);
  //       break;
  //     case 'fullcare':
  //       setDataList(premiumFcList);
  //       break;
  //     case 'streaming':
  //       setDataList(premiumStList);
  //       break;
  //   }
  // });
  return (
    <div className='flex flex-col gap-y-8'>
      {dataList.map((designer, index) => (
        <Designer key={index} designer={designer} />
      ))}
    </div>
  );
};
export default DesignerList;
