import { CategoryTab, TypeOneButton } from '@daeng-ggu/design-system';

// import NaverMapContent from '@/components/NaverMap/NaverMapContent';

const GuardianContent = () => {
  const tabs = [
    {
      label: '현재 위치',
      content: (
        <>
          {/* <NaverMapContent className={'mb-[6rem] h-[60rem]'} mapLat={37.3595704} mapLng={127.105399}></NaverMapContent> */}
          <TypeOneButton text='펫가디언에게 문의하기' color='bg-primary' onClick={() => {}} />
        </>
      ),
    },
    {
      label: 'CCTV',
      content: <div>CCTV</div>,
    },
  ];
  return (
    <div>
      <CategoryTab tabs={tabs} />
    </div>
  );
};

export default GuardianContent;
