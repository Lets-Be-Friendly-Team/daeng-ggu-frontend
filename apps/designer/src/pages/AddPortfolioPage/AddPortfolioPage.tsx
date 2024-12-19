import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header, ImageUploader, Input, PageContainer, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

import { Portfolio } from '@/pages/RegisterProfile/RegisterProfileData';
import useProfileStore from '@/stores/useProfileStore';

interface PortfolioProps {
  handleSubmit: (_portfolio: Portfolio) => void;
}
const AddPortfolioPage = ({ handleSubmit }: PortfolioProps) => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    // portfolioId: 0,
    title: '',
    // video: null,
    // imgList: [],
    contents: '',
    newVideoUrl: '',
    newImgUrlList: [],
  });
  const { fileData, setFileData } = useProfileStore();
  const [activeBtn, setActiveBtn] = useState(false);
  const navigate = useNavigate();
  const handleChange = (field: keyof Portfolio, value: number | string | File | null | File[]) => {
    setPortfolio((prev) => ({ ...prev, [field]: value }));
  };

  const handleSetImgList: Dispatch<SetStateAction<File[]>> = useCallback(
    (value) => {
      setFileData({ portfolioImgList: typeof value === 'function' ? value(fileData.portfolioImgList) : value });
    },
    [fileData.portfolioImgList, setFileData],
  );

  const handleSetVideo: Dispatch<SetStateAction<File | null>> = useCallback(
    (value) => {
      setFileData({ video: typeof value === 'function' ? value(fileData.video) : value });
    },
    [fileData.video, setFileData],
  );

  const handleClose = () => {
    setFileData({ portfolioImgList: [], video: null });
    navigate(-1);
  };

  useEffect(() => {
    console.log(portfolio);
    // const requiredFiled
    const isFormComplete = fileData.portfolioImgList?.length > 0 && portfolio.title !== '';
    setActiveBtn(isFormComplete);
  }, [portfolio, fileData]);

  return (
    <div className='w-full'>
      <PageContainer>
        <Header mode='close' title='포트폴리오 작성' onClick={handleClose} />
        <div className='flex  w-full flex-col gap-[2.4rem] pt-[2rem] pb-[4rem] mb-[6rem]'>
          <Input
            label='제목'
            placeholder='포트폴리오 제목 입력'
            value={portfolio.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <ImageUploader
            imgList={fileData.portfolioImgList}
            setImgList={handleSetImgList}
            video={fileData.video}
            setVideo={handleSetVideo}
            mode='both'
            label='사진'
            subLabel='사진 업로드는 필수입니다'
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
        color={activeBtn ? 'bg-primary' : 'bg-gray-50'}
        disabled={!activeBtn}
      />
    </div>
  );
};
export default AddPortfolioPage;
