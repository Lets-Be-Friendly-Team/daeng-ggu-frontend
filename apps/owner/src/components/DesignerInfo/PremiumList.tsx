import { CategoryTab } from '@daeng-ggu/design-system';

import DesignerList from './DesignerList';

// 제공하는 프리미엄 서비스별로 조회하기 위한 컴포넌트
const PremiumList = () => {
  const tabs = [
    { label: '스파', content: <DesignerList category='spa' /> },
    { label: '풀케어', content: <DesignerList category='fullcare' /> },
    { label: '스트리밍', content: <DesignerList category='streaming' /> },
  ];
  return (
    <div className='mt-[-2rem]'>
      <CategoryTab tabs={tabs} />
    </div>
  );
};

export default PremiumList;
