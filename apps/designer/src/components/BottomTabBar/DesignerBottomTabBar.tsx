import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { BottomTabBar, FeedIcon, MyPageIcon, RequestListIcon, ReservationIcon } from '@daeng-ggu/design-system';

import ROUTES from '@/constants/routes';
import useGetProfile from '@/hooks/queries/DesignerProfile/useGetProfile';
import { cn } from '@/lib/utils';
import { useDesignerBottomTabStore } from '@/stores/bottomTabStore';
import useDesignerIdStore from '@/stores/useDesignerIdStore';

// 로그인 상태에 따라 마이페이지/로그인 label 변경
const designerTabs = [
  { label: '예약 현황', icon: ReservationIcon, path: '' },
  { label: '요청서 조회', icon: RequestListIcon, path: ROUTES.bid },
  { label: '피드', icon: FeedIcon, path: ROUTES.feed },
  { label: '마이페이지', icon: MyPageIcon, path: ROUTES.profile },
];

const designerHideTabbarRoutes = [
  '/example',
  '/signup',
  '/register/profile',
  '/portfolio/add',
  '/payment',
  '/register/portfolio',
  '/profile/add/portfolio',
  '/edit/portfolio',
  '/profile/edit',
  '/bid/detail',
  '/bid/suggest',
  // 숨기고 싶은 tabbar route 추가
];

const DesignerBottomTabBar = () => {
  const { activePath, setActivePath } = useDesignerBottomTabStore();
  const location = useLocation();
  const { designerId } = useDesignerIdStore();
  const navigate = useNavigate();
  const shouldHideTabbar = designerHideTabbarRoutes.some((route) => location.pathname.startsWith(route));
  const { data: profileData } = useGetProfile(designerId);
  console.log(profileData);
  // url 바뀔때마다 activePath update
  useEffect(() => {
    const path = `${location.pathname.split('/', 2)[1]}`;
    // if (path === 'map' || path === 'search') {
    //   setActivePath('');
    // } else {
    setActivePath(path);
    // }
    console.log(path);
  }, [location.pathname, setActivePath]);

  useEffect(() => {
    if (profileData && profileData.nickname === null) {
      navigate('/signup/success');
    }
  }, [profileData, navigate]);

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

export default DesignerBottomTabBar;
