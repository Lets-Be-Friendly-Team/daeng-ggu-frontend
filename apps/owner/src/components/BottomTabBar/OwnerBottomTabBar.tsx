import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { BottomTabBar, FeedIcon, MapIcon, MyPageIcon, ReservationIcon, SendIcon } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';
import { cn } from '@/lib/utils';
import { useOwnerBottomTabStore } from '@/stores/bottomTabStore';

//로그인 여부에 따라 label 동적으로 설정
const getDynamicOwnerTabs = () => {
  const isLoggedin = !!localStorage.getItem('ownerIdStorage'); //owner id 값 존재하면 로그인 상태로 간주
  // const isLoggedin = true; //true로 임시 설정

  return [
    { label: '디자이너 찾기', icon: MapIcon, path: '' },
    { label: '피드', icon: FeedIcon, path: ROUTES.feed },
    { label: '견적 요청', icon: SendIcon, path: ROUTES.bid },
    { label: '예약 현황', icon: ReservationIcon, path: ROUTES.reservation },
    { label: isLoggedin ? '마이페이지' : '로그인', icon: MyPageIcon, path: isLoggedin ? ROUTES.profile : ROUTES.login },
  ];
};

const ownerHideTabbarRoutes = [
  '/example',
  '/bid/request',
  '/review',
  '/signup',
  '/profile/pet/add',
  '/login',
  '/profile/edit',
  '/profile/pet/edit',
  // 숨기고 싶은 tabbar route 추가
];

const OwnerBottomTabBar = () => {
  const { activePath, setActivePath } = useOwnerBottomTabStore();
  const location = useLocation();

  const shouldHideTabbar = ownerHideTabbarRoutes.some((route) => location.pathname.startsWith(route));
  const ownerTabs = getDynamicOwnerTabs(); //로그인 상태에 따라 탭 구성 가져오기

  // url 바뀔때마다 activePath update
  useEffect(() => {
    const path = `${location.pathname.split('/', 2)[1]}`;
    if (path === 'map' || path === 'search') {
      setActivePath('');
    } else {
      setActivePath(path);
    }
    console.log(path);
  }, [location.pathname, setActivePath]);

  return (
    !shouldHideTabbar && (
      <BottomTabBar
        items={ownerTabs}
        activePath={activePath}
        onTabChange={setActivePath}
        renderTabItem={(tab, isActive) => (
          <>
            <tab.icon className={cn(isActive ? 'fill-primary' : '')} />
            <span className={cn(isActive ? 'font-semibold text-primary' : 'text-gray-300')}>{tab.label}</span>
          </>
        )}
      />
    )
  );
};

export default OwnerBottomTabBar;
