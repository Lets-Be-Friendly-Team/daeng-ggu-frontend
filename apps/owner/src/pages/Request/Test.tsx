// Test.tsx
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-[300px] w-full flex-col items-center justify-center py-10'>
      <button
        className='mb-6 h-10 w-[100px] bg-amber-400'
        onClick={() => navigate('request', { state: { from: '/test' } })}
      >
        Go to Request
      </button>
      <button
        className='h-10 w-[100px] bg-amber-400'
        onClick={() => navigate('/bid/designer', { state: { from: '/bid/designer' } })}
      >
        Go to designer mode
      </button>
    </div>
  );
};

export default Test;
