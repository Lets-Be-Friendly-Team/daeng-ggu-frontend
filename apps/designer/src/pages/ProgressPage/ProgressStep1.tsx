import { TypeTwoButton } from '@daeng-ggu/design-system';

const ProgressStep1 = ({ status }: { status: string }) => {
  return (
    <div>
      <TypeTwoButton
        className='px-[2rem]'
        disabled={status ? true : false}
        text={'미용 시작'}
        color='bg-secondary'
        onClick={() => {}}
      />
    </div>
  );
};

export default ProgressStep1;
