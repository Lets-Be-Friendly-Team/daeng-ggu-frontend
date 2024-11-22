import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Progress } from '@/components/_common/progress.tsx';

const Request = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let previousPath = '';

  useEffect(() => {
    previousPath = location.state?.from || '';

    //이전 페이지에 대한 유효성 검사
    if (previousPath !== '/test') {
      alert(previousPath);
      navigate('/', { replace: true });
    }
  }, [location, navigate]);

  const input = '테수트테수트';
  const initialStep = 4;
  const steps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className='h-full w-full'>
      <div className='mt-3'>
        <div className='ml-4 mr-4'>
          <Progress value={initialStep} text={input} maxStep={steps.length} />
        </div>
      </div>
    </div>
  );
};

export default Request;
