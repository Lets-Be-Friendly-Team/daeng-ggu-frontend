import { useNavigate } from 'react-router';

import useMultipleImageUpload from '@/hooks/queries/ImageUpload/useMultipleImageUpload';
import useSingleImageUpload from '@/hooks/queries/ImageUpload/useSingleImageUpload';
import useProfileStore from '@/stores/useProfileStore';

import { Portfolio } from '../RegisterProfile/RegisterProfileData';

import AddPortfolioPage from './AddPortfolioPage';

const AddPortfolioInRegister = () => {
  const navigate = useNavigate();
  const { profileData, setProfileData, fileData, setFileData } = useProfileStore();
  const { portfolioImgList, video } = fileData;
  const { mutate: imgListUpload } = useMultipleImageUpload();
  const { mutate: videoUpload } = useSingleImageUpload();

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
              console.log('포트폴리오 비디오 업로드 성공', url);
              setFileData({ video: null }); // video값 초기화
              resolve(url);
            },
            onError: (error) => {
              console.log('포트폴리오 비디오 업로드 실패', error);
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
