import { CategoryTab } from '@daeng-ggu/design-system';

import useDesignerListStore from '@/stores/designerListStore';

import DesignerList from './DesignerList';

// 제공하는 프리미엄 서비스별로 조회하기 위한 컴포넌트
const PremiumList = () => {
  const spList = useDesignerListStore((state) => state.premiumSpList);
  const fcList = useDesignerListStore((state) => state.premiumFcList);
  const stList = useDesignerListStore((state) => state.premiumStList);

  const tabs = [
    { label: '스파', content: <DesignerList dataList={spList} /> },
    { label: '풀케어', content: <DesignerList dataList={fcList} /> },
    { label: '스트리밍', content: <DesignerList dataList={stList} /> },
  ];
  return (
    <div className='mt-[-2rem]'>
      <CategoryTab tabs={tabs} />
    </div>
  );
};

export default PremiumList;
