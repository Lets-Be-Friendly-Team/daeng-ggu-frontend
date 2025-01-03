import { useLocation } from 'react-router';
import { BottomTabBar, FeedIcon, MyPageIcon, RequestListIcon, ReservationIcon } from '@daeng-ggu/design-system';

import { cn } from '@/lib/utils';
import { useGuardianBottomTabStore } from '@/stores/bottomTabStore';

// 로그인 상태에 따라 마이페이지/로그인 label 변경
const designerTabs = [
  { label: '예약 현황', icon: ReservationIcon, path: '/address/test' },
  { label: '요청서 조회', icon: RequestListIcon, path: '/input/test' },
  { label: '피드', icon: FeedIcon, path: '/feed' },
  { label: '마이페이지', icon: MyPageIcon, path: '/my' },
];

const guardianHideTabbarRoutes = [
  '/example',
  // 숨기고 싶은 tabbar route 추가
];

const GuardianBottomTabBar = () => {
  const { activePath, setActivePath } = useGuardianBottomTabStore();
  const location = useLocation();

  const shouldHideTabbar = guardianHideTabbarRoutes.some((route) => location.pathname.startsWith(route));

  return (
    !shouldHideTabbar && (
      <BottomTabBar
        items={designerTabs}
        activePath={activePath}
        onTabChange={setActivePath}
        renderTabItem={(tab, isActive) => (
          <>
            <tab.icon className={cn(isActive ? 'fill-primary' : '')} />
            <span className={cn(isActive ? 'text-primary' : 'text-gray-300')}>{tab.label}</span>
          </>
        )}
      ></BottomTabBar>
    )
  );
};

export default GuardianBottomTabBar;
