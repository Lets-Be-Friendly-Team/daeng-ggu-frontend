import { Dispatch, SetStateAction, useState } from 'react';
import { useNavigate } from 'react-router';
import { Header, ImageUploader, Input, PageContainer, TextArea, TypeOneButton } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';

import useUpdatePortfolio from '@/hooks/queries/DesignerProfile/useUpdatePortfolio';
import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import { Portfolio } from '@/pages/RegisterProfile/RegisterProfileData';
import useDesignerIdStore from '@/stores/useDesignerIdStore';

const AddPortfolioInProfile = () => {
  const { designerId } = useDesignerIdStore();
  const { showToast } = useToast();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    portfolioId: 0,
    title: '',
    contents: '',
    newVideoUrl: '',
    newImgUrlList: [],
    imgList: [], // imgList 초기값 명시
    video: null, // 비디오 초기값 명시
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
      imgList: typeof value === 'function' ? value(prev.imgList ?? []) : value, // undefined 방지
    }));
  };

  const handleSetVideo: Dispatch<SetStateAction<File | null>> = (value) => {
    setPortfolio((prev) => ({
      ...prev,
      video:
        typeof value === 'function'
          ? value(prev.video ?? null) // undefined일 경우 null로 변환
          : value,
    }));
  };

  const handleSaveClick = async () => {
    try {
      // imgList가 항상 File[] 타입임을 보장
      const imageUrls = portfolio.imgList ? await uploadImages(portfolio.imgList) : [];
      console.log(imageUrls);

      // 비디오 업로드
      let newVideoUrl: string | null = null;
      if (portfolio.video) {
        newVideoUrl = await uploadImage(portfolio.video);
        console.log('Video URL:', newVideoUrl);
      }

      const portfolioData = {
        designerId,
        portfolioId: portfolio.portfolioId ?? 0,
        title: portfolio.title,
        contents: portfolio.contents,
        preVideoUrl: '',
        newVideoUrl: newVideoUrl,
        preImgUrlList: [],
        newImgUrlList: imageUrls,
      };

      await updatePortfolio(portfolioData);

      showToast({ message: '포트폴리오가 성공적으로 등록되었습니다.', type: 'confirm' });
      navigate('/profile');
      setPortfolio({
        title: '',
        contents: '',
        newVideoUrl: '',
        newImgUrlList: [],
        imgList: [],
        video: null,
      });
    } catch (error) {
      console.log(error);
      showToast({ message: '포트폴리오 저장을 실패했습니다', type: 'error' });
    }
  };

  return (
    <div className='w-full'>
      <PageContainer>
        <Header mode='close' title='포트폴리오 작성' />
        <div className='flex w-full flex-col gap-[2.4rem] pt-[2rem] pb-[4rem] mb-[6rem]'>
          <Input
            label='제목'
            placeholder='포트폴리오 제목 입력'
            value={portfolio.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <ImageUploader
            imgList={portfolio.imgList ?? []} // undefined 방지
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
