import useDesignerListStore from '@/stores/designerListStore';

import DesignerList from './DesignerList';

const TotalList = () => {
  const designerList = useDesignerListStore((state) => state.designerList);
  return <DesignerList dataList={designerList} />;
};
export default TotalList;
