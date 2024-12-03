// import { MapIcon, MyPageIcon, SendIcon } from '@daeng-ggu/design-system';

import { Header, SearchBar } from '@daeng-ggu/design-system';

import MainCategoryTab from '@/components/MainCategoryTab/MainCategoryTab';

// import OwnerBottomTabBar from '@/components/BottomTabBar/OwnerBottomTabBar';

const MainPage = () => {
  const { show } = useModalStore();
  const onClick = () => {
    show(Modal, {
      title: 'hello',
      description: 'world',
      onConfirm: () => {},
      confirmText: 'confirm',
      cancelText: 'cancel',
    });
  };
  return (
    <>
      <Header mode='main' />
      <div className='sticky top-0 z-10 bg-white p-8'>
        <SearchBar />
      </div>
      <MainCategoryTab />
    </>
  );
};

export default MainPage;
