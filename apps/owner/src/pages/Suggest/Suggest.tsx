import { BorderContainer, Header } from '@daeng-ggu/design-system';

import TextEditor from '@/pages/Suggest/TextEditor.tsx';

import '@/styles/TextEditor.css';

const Suggest = () => {
  return (
    <div>
      <div className='mb-6 max-w-[480px]'>
        <Header mode='back' title='견적 제안하기' />
        <div className='mt-10 px-[20px]'>
          <div className='items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>요청 상세</h2>
          </div>
          <div className='mb-16 w-full'>
            <BorderContainer innerPadding='p-3'>
              <TextEditor />
            </BorderContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggest;
