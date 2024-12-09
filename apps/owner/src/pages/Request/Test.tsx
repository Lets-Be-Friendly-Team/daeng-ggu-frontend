// Test.tsx
import { useNavigate } from 'react-router-dom';
// import { APIFetch } from '@daeng-ggu/shared';

// const testClient = new APIFetch(
//   'https://www.daeng-ggu-backend.com',
//   new Headers({ 'Content-Type': 'application/json' }),
// );

const Test = () => {
  const navigate = useNavigate();

  // const handleFetchData = async () => {
  //   try {
  //     const response = await testClient.get<any>('/daengggu/bid/estimate/designer', { designerId: '4' });
  //     console.log('Fetched data:', response);
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //   }
  // };
  //
  // const handleLogin = async () => {
  //   try {
  //     const response = await testClient.get<any>('/daengggu/login');
  //     console.log('Login response:', response);
  //   } catch (error) {
  //     console.error('Login error:', error);
  //   }
  // };

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

      {/*<button className='mt-6 h-10 w-[100px] bg-blue-400' onClick={handleFetchData}>*/}
      {/*  Fetch Data*/}
      {/*</button>*/}

      {/*/!* New button for GET login *!/*/}
      {/*<button className='mt-6 h-10 w-[100px] bg-green-400' onClick={handleLogin}>*/}
      {/*  Login*/}
      {/*</button>*/}
    </div>
  );
};

export default Test;
