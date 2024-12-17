// import
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';
import { PageContainer } from '@daeng-ggu/design-system';

import map from '@/assets/images/MainCategoryTab/map.png';
import popular from '@/assets/images/MainCategoryTab/popular.png';
import premium from '@/assets/images/MainCategoryTab/premium.png';
import total from '@/assets/images/MainCategoryTab/total.png';
import PopularList from '@/components/DesignerInfo/PopularList';
import PremiumList from '@/components/DesignerInfo/PremiumList';
import TotalList from '@/components/DesignerInfo/TotalList';
import useGetTotalDesigners from '@/hooks/queries/DesignerList/useGetTotalDesigners';
import useDesignerListStore from '@/stores/designerListStore';

const MainCategoryTab = () => {
  /* api 연동 => fetch 함수 작성(apis 폴더에?), useQuery 사용해 데이터 가져오는 훅 정의(hooks 폴더 만들어야하나)
   * get은 한번(searchWord에 빈값 넣어서 전체 조회)
   * category마다 다른 column 가져와서 dataList 변수에 저장
   */
  const setLists = useDesignerListStore((state) => state.setLists);

  const { data, error } = useGetTotalDesigners();
  const [activeIndex, setActiveIndex] = useState(0);
  const [indicatorOffset, setIndicatorOffset] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [query, setQuery] = useSearchParams();

  useEffect(() => {
    if (data) {
      console.log(data);
      setLists({
        designerList: data.data.allDesignerList,
        popularList: data.data.popularList,
        premiumSpList: data.data.premiumSpList,
        premiumFcList: data.data.premiumFcList,
        premiumStList: data.data.premiumStList,
      });
    }
  }, [data, setLists]);

  useEffect(() => {
    if (containerRef.current) {
      const buttons = Array.from(containerRef.current.children) as HTMLElement[];
      const activeButton = buttons[activeIndex];

      if (activeButton) {
        // 레이아웃 계산이 완료된 후 위치값을 업데이트
        setTimeout(() => {
          setIndicatorOffset(activeButton.offsetLeft);
        }, 0);
      }
    }
  }, [activeIndex]);

  useEffect(() => {
    console.log(query.get('category'));
    const category = query.get('category');
    switch (category) {
      case null:
        setActiveIndex(0);
        break;
      case 'total':
        setActiveIndex(0);
        break;
      case 'popular':
        setActiveIndex(1);
        break;
      case 'premium':
        setActiveIndex(2);
        break;
    }
  }, [query]);

  if (error) return <p>Error: {error.message}</p>;

  const tabs = [
    {
      icon: total,
      label: '전체',
      path: 'total',
      content: <TotalList />,
    },
    {
      icon: popular,
      label: '인기',
      path: 'popular',
      content: <PopularList />,
    },
    {
      icon: premium,
      label: '프리미엄',
      path: 'premium',
      content: <PremiumList />,
    },
    {
      icon: map,
      label: '지도',
      path: '',
      // content: ,
    },
  ];

  return (
    <div className='flex h-full flex-col'>
      <div className='sticky top-[11.5rem] z-10 bg-white shadow-md'>
        <div ref={containerRef} className='relative flex items-center justify-between px-[2rem]'>
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex h-[6rem] w-[6rem] cursor-pointer flex-col items-center justify-between py-[0.8rem] text-iconCaption ${
                activeIndex === index ? 'text-primary' : 'text-gray-600'
              }`}
              onClick={() => {
                setActiveIndex(index);
                if (index === 3) {
                  navigate('/map');
                } else {
                  query.set('category', tab.path);
                  setQuery(query);
                }
              }}
            >
              <img src={tab.icon} alt={tab.label} className='w-[2.4rem]' />
              <div className=''>{tab.label}</div>
            </div>
          ))}
          <div
            className='absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-in-out'
            style={{
              width: '6rem',
              left: `${indicatorOffset}px`,
            }}
          ></div>
        </div>
      </div>
      {/* 스크롤 가능한 콘텐츠 영역 */}
      <div className='flex-1 overflow-y-auto overflow-x-hidden'>
        <div
          className='flex transition-transform duration-300 ease-in-out'
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {tabs.map((tab, index) => (
            <div key={index} className='mb-[6.5rem] w-full flex-shrink-0 py-[2rem]'>
              <PageContainer>{tab.content}</PageContainer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategoryTab;
