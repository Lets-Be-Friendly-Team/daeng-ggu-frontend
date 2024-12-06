import useDesignerListStore from '@/stores/designerListStore';

import DesignerList from './DesignerList';

const PopularList = () => {
  const popularList = useDesignerListStore((state) => state.popularList);
  return <DesignerList dataList={popularList} />;
};
export default PopularList;
