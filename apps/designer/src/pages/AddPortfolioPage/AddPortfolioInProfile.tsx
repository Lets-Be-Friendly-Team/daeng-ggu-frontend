import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header, ImageUploader, Input, PageContainer, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

import useUpdatePortfolio from '@/hooks/queries/DesignerProfile/useUpdatePortfolio';
import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import { Portfolio } from '@/pages/RegisterProfile/RegisterProfileData';

const AddPortfolioInProfile = () => {
  const [portfolio, setPortfolio] = useState<Portfolio>({
    portfolioId: 0,
    title: '',
    video: null,
    imgList: [],
    contents: '',
  });
  const navigate = useNavigate();

  const { mutateAsync: updatePortfolio } = useUpdatePortfolio();
  const { mutateAsync: uploadImage } = useSingleImageUpload();
  const { mutateAsync: uploadImages } = useMultipleImageUpload();

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

  const handleSaveClick = async () => {
    try {
      const imageUrls = await uploadImages(portfolio.imgList);
      console.log(imageUrls);

      // 비디오 업로드
      let newVideoUrl: string | null = null;
      if (portfolio.video) {
        newVideoUrl = await uploadImage(portfolio.video); // 비디오도 이미지 업로드 훅을 재사용
        console.log('Video URL:', newVideoUrl);
      }
      const portfolioData = {
        designerId: 2,
        portfolioId: portfolio.portfolioId,
        title: portfolio.title,
        contents: portfolio.contents,
        preVideoUrl: '',
        newVideoUrl: newVideoUrl,
        preImgUrlList: [],
        newImgUrlList: imageUrls,
      };

      await updatePortfolio(portfolioData);

      alert('포트폴리오가 성공적으로 등록되었습니다.');
      navigate('/profile');
      setPortfolio({
        portfolioId: 0,
        title: '',
        video: null,
        imgList: [],
        contents: '',
      });
    } catch (error) {
      console.error('포트폴리오 저장 실패:' + error);
      alert('포트폴리오 저장 실패');
    }
  };

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
      <TypeOneButton onClick={handleSaveClick} text='작성완료' color='bg-primary' />
    </div>
  );
};
export default AddPortfolioInProfile;
