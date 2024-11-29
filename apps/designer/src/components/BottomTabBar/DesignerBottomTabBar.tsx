import { BottomTabBar, FeedIcon, MyPageIcon, ReservationIcon, RequestListIcon } from '@daeng-ggu/design-system';
import { useDesignerBottomTabStore } from '@/stores/bottomTabStore';
import { cn } from '@/lib/utils';

// 로그인 상태에 따라 마이페이지/로그인 label 변경
const designerTabs = [
  { label: '예약 현황', icon: ReservationIcon, path: '/address/test' },
  { label: '요청서 조회', icon: RequestListIcon, path: '/input/test' },
  { label: '피드', icon: FeedIcon, path: '/feed' },
  { label: '마이페이지', icon: MyPageIcon, path: '/my' },
];

const DesignerBottomTabBar = () => {
  const { activePath, setActivePath } = useDesignerBottomTabStore();

  return (
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
  );
};

export default DesignerBottomTabBar;