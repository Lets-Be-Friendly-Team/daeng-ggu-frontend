// import { MapIcon, MyPageIcon, SendIcon } from '@daeng-ggu/design-system';

import { Modal } from '@daeng-ggu/design-system';
import { useModalStore } from '@daeng-ggu/shared';

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
    <div>
      <div className='text-xl font-bold'>MainPagee</div>
      <div className='font-pretendard-variable text-xl'></div>
      <button onClick={onClick}>open modal</button>
    </div>
  );
};

export default MainPage;
