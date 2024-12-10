import { Header, ImageUploader, Input, PageContainer, TextArea } from '@daeng-ggu/design-system';

const AddPortfolioPage = () => {
  return (
    <div className='w-full'>
      <PageContainer>
        <Header mode='close' title='포트폴리오 작성' />
        <div className='flex  w-full flex-col gap-[2.4rem]  pt-[2rem] pb-[4rem] mb-[6rem]'>
          <Input label='제목' placeholder='포트폴리오 제목 입력' />

          <ImageUploader mode='both' label='사진 및 동영상' subLabel='동영상은 1개만 업로드 가능합니다' />
          <TextArea
            label='내용'
            placeholder='내용 입력'
            // value={formData.specialNotes}
            // onChange={(e) => handleChange('specialNotes', e.target.value)}
            maxLength={200}
          />
        </div>
      </PageContainer>
    </div>
  );
};
export default AddPortfolioPage;
