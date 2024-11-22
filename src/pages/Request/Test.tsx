import { useNavigate } from 'react-router';

const Test = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-[300px] w-full items-center justify-center'>
      <button
        className='h-10 w-[100px] bg-amber-400'
        onClick={() => navigate('/request', { state: { from: '/test' } })}
      >
        견적스
      </button>
    </div>
  );
};

export default Test;
