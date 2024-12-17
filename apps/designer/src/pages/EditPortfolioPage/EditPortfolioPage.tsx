import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Header, ImageUploader, Input, PageContainer, TextArea, TypeOneButton } from '@daeng-ggu/design-system';

import useGetPortfolioDetail from '@/hooks/queries/DesignerProfile/useGetPortfolioDetail';
import useUpdatePortfolio from '@/hooks/queries/DesignerProfile/useUpdatePortfolio';
import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';

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
  const designerId = 2;

  const [portfolio, setPortfolio] = useState<Portfolio>({
    portfolioId: 0,
    title: '',
    video: null,
    imgList: [],
    contents: '',
  });

  const [preImgUrlList, setPreImgUrlList] = useState<string[]>([]);
  const [preVideoUrl, setPreVideoUrl] = useState<string>('');
  const [deletedImgUrls, setDeletedImgUrls] = useState<string[]>([]); // New state

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
      setDeletedImgUrls([]); // Reset deletions on new fetch
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
      const filteredPreImgUrlList = preImgUrlList.filter((url) => !deletedImgUrls.includes(url));

      const portfolioData = {
        designerId,
        portfolioId: portfolio.portfolioId,
        title: portfolio.title,
        contents: portfolio.contents,
        preVideoUrl: preVideoUrl, // 기존 비디오 URL
        newVideoUrl: newVideoUrlString, // 새 비디오 URL
        preImgUrlList: filteredPreImgUrlList, // 필터링된 기존 이미지 URL 리스트
        newImgUrlList: newImageUrls, // 새 이미지 URL 리스트
      };

      console.log('최종 전송 데이터:', portfolioData);

      await updatePortfolio(portfolioData);

      alert('포트폴리오가 성공적으로 수정되었습니다.');
      navigate('/profile');
    } catch (error) {
      console.error('포트폴리오 수정 실패:', error);
      alert('포트폴리오 수정에 실패했습니다.');
    }
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
            setImgList={handleSetImgList}
            initialVideo={preVideoUrl}
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
      <TypeOneButton onClick={handleSaveClick} text='수정 완료' color='bg-primary' />
    </div>
  );
};

export default EditPortfolioPage;
