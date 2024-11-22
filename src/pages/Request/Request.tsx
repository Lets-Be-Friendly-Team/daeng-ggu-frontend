import { Progress } from '@/components/_common/progress.tsx';

const Request = () => {
  console.log('im in');

  const input = '테수트테수트';
  const initialStep = 1;
  const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='h-full w-full'>
      <div className='mt-3'>
        {' '}
        {/* 임시 마진 */}
        <div className='ml-4 mr-4'>
          <Progress value={initialStep} text={input} maxStep={steps.length} />
        </div>
      </div>
    </div>
  );
};

export default Request;
