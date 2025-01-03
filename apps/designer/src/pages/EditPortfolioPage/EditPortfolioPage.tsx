import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header, ImageUploader, Input, PageContainer, TextArea, TypeOneButton } from '@daeng-ggu/design-system';
import { useToast } from '@daeng-ggu/shared';

import useGetPortfolioDetail from '@/hooks/queries/DesignerProfile/useGetPortfolioDetail';
import useUpdatePortfolio from '@/hooks/queries/DesignerProfile/useUpdatePortfolio';
import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import useDesignerIdStore from '@/stores/useDesignerIdStore';

interface Portfolio {
  portfolioId: number;
  title: string;
  video: File | null;
  imgList: File[];
  contents: string;
}

const EditPortfolioPage = () => {
  const params = useParams<{ portfolioId: string }>();
  const portfolioId = params.portfolioId ? Number(params.portfolioId) : null;
  const { designerId } = useDesignerIdStore();
  const { showToast } = useToast();
  const [portfolio, setPortfolio] = useState<Portfolio>({
    portfolioId: 0,
    title: '',
    video: null,
    imgList: [],
    contents: '',
  });

  const [preImgUrlList, setPreImgUrlList] = useState<string[]>([]);
  const [preVideoUrl, setPreVideoUrl] = useState<string>('');

  const navigate = useNavigate();
  const { data: fetchedPortfolio } = useGetPortfolioDetail(designerId, portfolioId!);
  const { mutateAsync: updatePortfolio } = useUpdatePortfolio();
  const { mutateAsync: uploadImages } = useMultipleImageUpload();
  const { mutateAsync: uploadVideo } = useSingleImageUpload();

  // 초기 데이터 설정
  useEffect(() => {
    if (fetchedPortfolio) {
      setPortfolio({
        portfolioId: fetchedPortfolio.portfolioId,
        title: fetchedPortfolio.title,
        contents: fetchedPortfolio.contents,
        video: null,
        imgList: [],
      });
      setPreImgUrlList(fetchedPortfolio.imgUrlList || []);
      setPreVideoUrl(fetchedPortfolio.videoUrl || '');
    }
  }, [fetchedPortfolio]);

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
      // 새 이미지 업로드
      const newImageUrls = portfolio.imgList.length > 0 ? await uploadImages(portfolio.imgList) : [];

      // 새 비디오 업로드
      let newVideoUrlString: string | null = null;
      if (portfolio.video) {
        newVideoUrlString = await uploadVideo(portfolio.video);
      }

      // 필터링된 기존 이미지 리스트
      // const filteredPreImgUrlList = preImgUrlList.filter((url) => !deletedImgUrls.includes(url));

      const portfolioData = {
        designerId,
        portfolioId: portfolio.portfolioId,
        title: portfolio.title,
        contents: portfolio.contents,
        preVideoUrl: preVideoUrl, // 기존 비디오 URL
        newVideoUrl: newVideoUrlString, // 새 비디오 URL
        preImgUrlList: preImgUrlList ?? [], // 필터링된 기존 이미지 URL 리스트
        newImgUrlList: newImageUrls || null, // 새 이미지 URL 리스트
      };

      await updatePortfolio(portfolioData);

      showToast({ message: '포트폴리오가 수정 되었습니다!', type: 'confirm' });
      navigate('/profile');
    } catch (error) {
      showToast({ message: '포트폴리오가 수정되지 않았습니다. 다시 시도해주세요!', type: 'error' });
      console.error('포트폴리오 수정 실패:', error);
    }
  };

  // 콜백 함수 추가
  const handleInitialImageDelete = (url: string) => {
    // preImgUrlList에서도 해당 URL을 제거
    setPreImgUrlList((prev) => (prev ?? []).filter((prevUrl) => prevUrl !== url));
  };

  return (
    <div className='w-full'>
      <PageContainer>
        <Header mode='close' title='포트폴리오 수정' />
        <div className='flex w-full flex-col gap-[2.4rem] pt-[2rem] pb-[4rem] mb-[6rem]'>
          <Input
            label='제목'
            placeholder='포트폴리오 제목 입력'
            value={portfolio.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />

          <ImageUploader
            initialImgList={preImgUrlList}
            setInitialImgList={setPreImgUrlList}
            setImgList={handleSetImgList}
            imgList={portfolio.imgList}
            initialVideo={preVideoUrl}
            setInitialVideo={setPreVideoUrl}
            video={portfolio.video}
            setVideo={handleSetVideo}
            mode='both'
            label='사진 및 동영상'
            subLabel='동영상은 1개만 업로드 가능합니다'
            onInitialImageDelete={handleInitialImageDelete}
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
      <TypeOneButton onClick={handleSaveClick} text='수정 완료' color='bg-primary' />
    </div>
  );
};

export default EditPortfolioPage;
