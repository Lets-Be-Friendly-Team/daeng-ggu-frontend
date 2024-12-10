import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Header, ImageUploader, Input, PageContainer, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

import { Portfolio } from '../RegisterProfile/RegisterProfileData';

interface PortfolioProps {
  handleSubmit: (_portfolio: Portfolio) => void;
}
const AddPortfolioPage = ({ handleSubmit }: PortfolioProps) => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    portfolioId: 0,
    title: '',
    video: null,
    imgList: [],
    contents: '',
  });
  const handleChange = (field: keyof Portfolio, value: number | string | File | null | File[]) => {
    setPortfolio((prev) => ({ ...prev, [field]: value }));
  };

  const handleSetImgList: Dispatch<SetStateAction<File[]>> = (value) => {
    setPortfolio((prev) => ({
      ...prev,
      imgList: typeof value === 'function' ? value(prev.imgList) : value,
    }));
  };

  const handleSetVideo: Dispatch<SetStateAction<File | null>> = (value) => {
    setPortfolio((prev) => ({
      ...prev,
      video: typeof value === 'function' ? value(prev.video) : value,
    }));
  };
  useEffect(() => {
    console.log(portfolio);
  }, [portfolio]);
  return (
    <div className='w-full'>
      <PageContainer>
        <Header mode='close' title='포트폴리오 작성' />
        <div className='flex  w-full flex-col gap-[2.4rem] pt-[2rem] pb-[4rem] mb-[6rem]'>
          <Input
            label='제목'
            placeholder='포트폴리오 제목 입력'
            value={portfolio.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <ImageUploader
            imgList={portfolio.imgList}
            setImgList={handleSetImgList}
            video={portfolio.video}
            setVideo={handleSetVideo}
            mode='both'
            label='사진 및 동영상'
            subLabel='동영상은 1개만 업로드 가능합니다'
          />
          <TextArea
            label='내용'
            placeholder='내용 입력'
            value={portfolio.contents}
            onChange={(e) => handleChange('contents', e.target.value)}
            maxLength={200}
          />
        </div>
      </PageContainer>
      <TypeOneButton
        onClick={() => {
          handleSubmit(portfolio);
        }}
        text='작성완료'
        color='bg-primary'
      />
    </div>
  );
};
export default AddPortfolioPage;
