import { Progress } from '@/components/_common/progress.tsx';

const Request = () => {
  console.log('im in');
  return (
    <div className='h-full w-full'>
      <div className='mt-3'>
        <div className='ml-4 mr-4'>
          <Progress value={20} text='미요요요요요요요요ㅛㅇ용' className='w-full' />
        </div>
      </div>
    </div>
  );
};

export default Request;
