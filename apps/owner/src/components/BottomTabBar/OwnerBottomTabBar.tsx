import { BottomTabBar, FeedIcon, MapIcon, MyPageIcon, ReservationIcon, SendIcon } from '@daeng-ggu/design-system';

import { cn } from '@/lib/utils';
import { useOwnerBottomTabStore } from '@/stores/bottomTabStore';

// 로그인 상태에 따라 마이페이지/로그인 label 변경
const ownerTabs = [
  { label: '디자이너 찾기', icon: MapIcon, path: '/' },
  { label: '피드', icon: FeedIcon, path: '/feed' },
  { label: '견적 요청', icon: SendIcon, path: '/input/test' },
  { label: '예약 현황', icon: ReservationIcon, path: '/address/test' },
  { label: '마이페이지', icon: MyPageIcon, path: '/my' },
];

const OwnerBottomTabBar = () => {
  const { activePath, setActivePath } = useOwnerBottomTabStore();

  return (
    <BottomTabBar
      items={ownerTabs}
      activePath={activePath}
      onTabChange={setActivePath}
      renderTabItem={(tab, isActive) => (
        <>
          <tab.icon className={cn(isActive ? 'fill-primary' : '')} />
          <span className={cn(isActive ? 'text-primary' : 'text-gray-300')}>{tab.label}</span>
        </>
      )}
    ></BottomTabBar>
  );
};

export default OwnerBottomTabBar;
