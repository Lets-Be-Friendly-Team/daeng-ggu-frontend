import React, { useMemo } from 'react';
import { Avatar, BorderContainer, PageContainer } from '@daeng-ggu/design-system';

interface EstimateImg {
  estimateImageUrl: string;
}

interface DesignerData {
  estimateId: number;
  designerId: number;
  designerName: string;
  designerImageUrl: string;
  createdAt: string;
  estimateDetail: string;
  customerId: number;
  customerName: string;
  phone: string;
  address: string;
  groomingFee: number;
  estimateImgList: EstimateImg[];
  serviceDescription?: string;
}

interface SuggestReviewProps {
  data: DesignerData;
}

const SuggestReview: React.FC<SuggestReviewProps> = ({ data }) => {
  const replacedHTML = useMemo(() => {
    let html = data.estimateDetail;

    data.estimateImgList.forEach((item) => {
      const match = item.estimateImageUrl.match(/(image-\d+-\d+)/);
      if (match && match[1]) {
        const placeholder = match[1];
        const regex = new RegExp(`src="${placeholder}"`, 'g');
        html = html.replace(regex, `src="${item.estimateImageUrl}"`);
      }
    });

    return html;
  }, [data]);

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };

  return (
    <div>
      <PageContainer>
        <div className='mb-6'>
          <div className='mb-6'>
            <p className='pl-2 text-sub_h2 font-bold'>미용실 정보</p>
          </div>
          <BorderContainer>
            <div className='mx-auto flex min-h-[90px] rounded-[8px] bg-white'>
              <div className='mx-auto flex min-w-[240px] items-center bg-white p-4'>
                <Avatar
                  mode='designerCard'
                  imageUrl={data.designerImageUrl}
                  name={data.designerName}
                  containerClassName='mr-4 h-[70px] w-[70px]'
                />
                <div>
                  <p className='text-gray-800'>{formatDate(data.createdAt)} 견적제안</p>
                  <h3 className='text-sub_h3 font-semibold'>{data.designerName || '이름 없음'}</h3>
                  <p className='text-sub_h2 font-bold'>{data.groomingFee.toLocaleString()}원</p>
                  <p className='pb-2 text-iconCaption'>
                    <span className='mr-1 rounded-[4px] border border-primary px-2 py-[0.8px] text-primary'>
                      서비스
                    </span>
                    {data.serviceDescription || '서비스 정보 없음'}
                  </p>
                </div>
              </div>
            </div>
          </BorderContainer>
        </div>
        <div>
          <p className='pl-2 text-sub_h2 font-bold'>견적제안 내용</p>
        </div>
        <div className='mt-6'>
          <BorderContainer>
            <div className='p-6'>
              <div dangerouslySetInnerHTML={{ __html: replacedHTML }} />
            </div>
          </BorderContainer>
        </div>
      </PageContainer>
    </div>
  );
};

export default SuggestReview;
