// Test.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Test: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='flex h-[300px] w-full items-center justify-center py-10'>
      <button className='h-10 w-[100px] bg-amber-400' onClick={() => navigate('request', { state: { from: '/test' } })}>
        Go to Request
      </button>
    </div>
  );
};

export default Test;