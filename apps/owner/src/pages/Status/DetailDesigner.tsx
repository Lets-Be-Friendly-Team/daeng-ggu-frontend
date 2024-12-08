import { useLocation } from 'react-router-dom';
import { Header, PageContainer } from '@daeng-ggu/design-system';

import SuggestReview from '@/pages/Status/SuggestReview.tsx';

const DetailDesigner = () => {
  const location = useLocation();
  const data = location.state?.data;
  console.log(data);

  const getServiceDescription = (code: string) => {
    switch (code) {
      case 'S1':
        return '기본 서비스 (미용, 목욕)';
      case 'S101':
        return '목욕';
      case 'S102':
        return '전체미용';
      case 'S103':
        return '부분미용';
      case 'S104':
        return '위생미용';
      case 'S2':
        return '프리미엄 서비스 (스파)';
      case 'S3':
        return '프리미엄 서비스 (풀케어)';
      case 'S4':
        return '프리미엄 서비스 (스트리밍)';
      default:
        return '코드가 유효하지 않습니다';
    }
  };

  const tempDesignerData = {
    estimateId: 1,
    designerId: 7,
    designerName: '상세미용조회맨',
    codeId: 'S1',
    designerImageUrl: 'https://via.placeholder.com/500',
    createdAt: '2024-12-06T15:30:00',
    estimateDetail:
      '<body xmlns="http://www.w3.org/1999/xhtml"><p>안녕하세요. 미용견적 제공해드립니다</p><p><br /></p><p><img src="image-1-123" alt="견적 이미지" /></p><p><br /></p><p><br /></p><p>그딴거 없습니다</p><p><img src="image-2-123" /></p></body>',
    customerId: 4,
    customerName: '장미맘',
    phone: '010-1232-2322',
    address: '서울시 강남구 테헤란로 123 포돌빌딩 1304호',
    designerAddress: '서울특별시 강남구 대치동 889-41 미용빌딩',
    groomingFee: 120000,
    monitoringFee: 120000,
    deliveryFee: 120000,
    estimatePrice: 360000,
    estimateImgList: [
      {
        estimateImageUrl: 'https://letsbefriendly.s3.ap-northeast-2.amazonaws.com/image-1-123-dummy.webp',
      },
      {
        estimateImageUrl: 'https://letsbefriendly.s3.ap-northeast-2.amazonaws.com/image-2-123-dummy.png',
      },
    ],
  };

  const serviceDescription = getServiceDescription(tempDesignerData.codeId);

  const modifiedData = { ...tempDesignerData, serviceDescription };

  return (
    <div className='h-full w-full'>
      <div className='w-full'>
        <PageContainer>
          <Header mode='back' title='견적 제안서 보기' />
        </PageContainer>
        <SuggestReview data={modifiedData} />
      </div>
    </div>
  );
};

export default DetailDesigner;
