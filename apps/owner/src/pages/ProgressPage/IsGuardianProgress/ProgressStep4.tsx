import IVSPlayer from '@/components/IVS/IVSPlayer';

const ProgressStep4 = () => {
  // 스트리밍 api 추가
  return (
    <>
      <div className='mt-[2rem] flex w-full justify-center'>
        <h2 className='mb-[1rem] w-full border-b-2 border-primary text-left text-sub_h1 font-bold text-primary'>
          CCTV
        </h2>
      </div>
      <IVSPlayer playbackUrl='dfe' />
    </>
  );
};

export default ProgressStep4;
