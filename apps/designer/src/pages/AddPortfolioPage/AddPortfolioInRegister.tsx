import { useNavigate } from 'react-router';
import { useToast } from '@daeng-ggu/shared';

import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import { Portfolio } from '@/pages/RegisterProfile/RegisterProfileData';
import useProfileStore from '@/stores/useProfileStore';

import AddPortfolioPage from './AddPortfolioPage';

const AddPortfolioInRegister = () => {
  const navigate = useNavigate();
  const { profileData, setProfileData, fileData, setFileData } = useProfileStore();
  const { portfolioImgList, video } = fileData;
  const { mutate: imgListUpload } = useMultipleImageUpload();
  const { mutate: videoUpload } = useSingleImageUpload();
  const { showToast } = useToast();

  const setFileUrl = async (): Promise<{ imgUrlList: string[]; videoUrl: string }> => {
    const imgUploadPromise = portfolioImgList
      ? new Promise<string[]>((resolve, reject) => {
          imgListUpload(portfolioImgList, {
            onSuccess: (data) => {
              console.log('포트폴리오 이미지 업로드 성공', data);
              setFileData({ portfolioImgList: [] }); // portfolioImgList값 초기화
              resolve(data);
            },
            onError: (error) => {
              console.log('포트폴리오 이미지 업로드 실패', error);
              reject(error);
            },
          });
        })
      : Promise.resolve([]);
    const videoUploadPromise = video
      ? new Promise<string>((resolve, reject) => {
          videoUpload(video, {
            onSuccess: (url) => {
              showToast({ message: '포트폴리오가 등록 되었습니다!', type: 'confirm' });
              setFileData({ video: null }); // video값 초기화
              resolve(url);
            },
            onError: (error) => {
              showToast({ message: '포트폴리오가 등록되지 않았습니다. 다시 시도해주세요!', type: 'error' });
              reject(error);
            },
          });
        })
      : Promise.resolve('');
    // 이미지와 비디오 업로드 결과를 병렬로 기다림
    const [imgUrlList, videoUrl] = await Promise.all([imgUploadPromise, videoUploadPromise]);
    return { imgUrlList, videoUrl };
  };
  const handleSubmit = async (portfolio: Portfolio) => {
    // if (video || portfolioImgList.length > 0) {
    try {
      const { imgUrlList, videoUrl } = await setFileUrl(); // 업로드 결과 기다림
      const initialList = [...profileData.portfolioList]; // 기존 리스트 복사
      const newPortfolio = {
        ...portfolio,
        newImgUrlList: imgUrlList,
        newVideoUrl: videoUrl,
      };
      initialList.push(newPortfolio);
      console.log(initialList);
      setProfileData({ portfolioList: initialList });
      navigate(-1);
    } catch (error) {
      console.error('파일 업로드 중 오류 발생', error);
    }
    // } else {
    // }

    // if (portfolioImgList) {
    //   imgListUpload(portfolioImgList, {
    //     onSuccess: (data) => {
    //       console.log('포트폴리오 이미지 업로드 성공', data);
    //       const newPortfolio = {
    //         ...portfolio,
    //         newImgUrlList: data,
    //       };
    //       initialList.push(newPortfolio);
    //     },
    //   });
    // }
  };
  return <AddPortfolioPage handleSubmit={handleSubmit} />;
};
export default AddPortfolioInRegister;
