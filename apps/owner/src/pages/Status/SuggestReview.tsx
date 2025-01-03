// src/components/SuggestReview.tsx

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, BorderContainer, PageContainer, TypeOneButton } from '@daeng-ggu/design-system';

import { PostSuggestResponse } from '@/apis/suggest/postSuggestRequest';
import useGetPaymentDetails from '@/hooks/queries/Payment/useGetPaymentDetail.ts';
import useReservationStoreOne from '@/stores/useReservationStoreOne.ts';
import useReservationStoreTwo from '@/stores/useReservationStoreTwo.ts';

interface SuggestReviewProps {
  data: PostSuggestResponse;
}

const SuggestReview = ({ data }: SuggestReviewProps) => {
  const navigate = useNavigate();

  const {
    setOrderId,
    setCustomerKey,
    setEstimateId,
    setTotalPayment,
    setAmount,
    setGroomingFee,
    setMonitoringFee,
    setDeliveryFee,
    setReservationDate,
    setStartTime,
    setEndTime,
  } = useReservationStoreOne();
  const { setReservationOrderId, setReservationCustomerKey, setReservationTotalPayment } = useReservationStoreTwo();

  const { data: paymentDetails } = useGetPaymentDetails();

  const replacedHTML = useMemo(() => {
    let html = data.estimateDetail || '';

    if (data.estimateImgList && data.estimateImgList.length > 0) {
      console.log('This is image:', data.estimateImgList[0]);

      data.estimateImgList.forEach((item) => {
        const match = item.match(/(image-\d+)/);
        if (match && match[1]) {
          const placeholder = match[1];
          const regex = new RegExp(`src="${placeholder}"`, 'g');
          html = html.replace(regex, `src="${item}"`);
        }
      });
    }

    return html;
  }, [data]);

  const formatDate = (dateString: string): string => {
    const match = dateString.match(/-(\d{2})-(\d{2})/);
    if (match) {
      return `${match[1]}.${match[2]}.`;
    }
    return dateString;
  };

  const handlePaymentExecute = () => {
    const estimateId = data.estimateId;
    const totalPrice = data.estimatePrice;
    const customerName = data.customerName;
    const groomingFee = data.groomingFee;
    const monitoringFee = data.monitoringFee;
    const deliveryFee = data.deliveryFee;

    const startTimeMatch = data.startTime.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})$/);
    const endTimeMatch = data.endTime.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})$/);

    if (!startTimeMatch || !endTimeMatch) {
      console.error('Invalid date format for startTime or endTime');
      return;
    }

    const reservationDate = startTimeMatch[1]; // YYYY-MM-DD
    const startTime = startTimeMatch[2]; // HH:MM:SS
    const endTime = endTimeMatch[2]; // HH:MM:SS

    console.log(
      'before payment page:',
      estimateId,
      totalPrice,
      customerName,
      groomingFee,
      monitoringFee,
      deliveryFee,
      reservationDate,
      startTime,
      endTime,
    );

    if (paymentDetails) {
      setOrderId(paymentDetails.orderId);
      setCustomerKey(paymentDetails.customerKey);
      setEstimateId(estimateId);
      setTotalPayment(totalPrice);
      setAmount(totalPrice);
      setGroomingFee(groomingFee);
      setMonitoringFee(monitoringFee);
      setDeliveryFee(deliveryFee);
      setReservationDate(reservationDate);
      setStartTime(startTime);
      setEndTime(endTime);

      setReservationOrderId(paymentDetails.orderId);
      setReservationCustomerKey(paymentDetails.customerKey);
      setReservationTotalPayment(totalPrice);
    }

    console.log('State after setting in SuggestReviewOne:', useReservationStoreOne.getState());
    console.log('State after setting in SuggestReviewTwo:', useReservationStoreTwo.getState());

    navigate('/payment');
  };

  return (
    <div>
      <PageContainer>
        <div className='mb-6'>
          <div className='mt-6 items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>미용실 정보</h2>
          </div>
          <BorderContainer>
            <div className='mx-auto flex min-h-[90px] rounded-[8px] bg-white'>
              <div className='mx-auto flex w-full items-center bg-white p-4'>
                <Avatar
                  mode='designerCard'
                  imageUrl={data.designerImageUrl}
                  name={data.designerName}
                  containerClassName='mr-4 h-[70px] w-[70px]'
                />
                <div className='ml-6'>
                  <p className='text-gray-800'>{formatDate(data.createdAt)} 견적제안</p>
                  <h3 className='mt-1 text-sub_h3 font-semibold'>{data.designerName || '이름 없음'}</h3>
                  <p className='mt-1 text-sub_h2 font-bold'>{data.groomingFee.toLocaleString()}원</p>
                  <p className='mt-2 pb-2 text-iconCaption'>
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
        <div className='mt-6 items-start'>
          <h2 className='mb-4 text-h3 font-bold text-gray-800'>견적제안 내용</h2>
        </div>
        <div className='mb-10 mt-6'>
          <BorderContainer>
            <div className='p-6'>
              <div dangerouslySetInnerHTML={{ __html: replacedHTML }} />
            </div>
          </BorderContainer>
        </div>
        <div className='mt-6 items-start'>
          <h2 className='mb-4 text-h3 font-bold text-gray-800'>댕송지 정보</h2>
        </div>
        <div className='mb-6 mt-6'>
          <BorderContainer innerPadding='p-3'>
            <div className='flex-col items-start p-2 text-gray-800'>
              <p className='text-sub_h2 font-bold'>{data ? data.customerName : '정보 없음'}</p>
              <p className='text-body3 font-bold text-gray-800'>{data ? data.phone : '정보 없음'}</p>
              <p className='pt-1 text-caption'>{data ? data.address : '정보 없음'}</p>
            </div>
          </BorderContainer>
        </div>
        <div className='mt-6 items-start'>
          <h2 className='mb-4 text-h3 font-bold text-gray-800'>미용실 정보</h2>
        </div>
        <div className='mb-6 mt-6'>
          <BorderContainer innerPadding='p-3'>
            <div className='flex-col items-start p-2 text-gray-800'>
              <p className='text-sub_h2 font-bold'>{data ? data.designerName : '정보 없음'}</p>
              <p className='text-body3 font-bold text-gray-800'>{data ? data.phone : '정보 없음'}</p>
              <p className='pt-1 text-caption'>{data ? data.designerAddress : '정보 없음'}</p>
            </div>
          </BorderContainer>
        </div>
        <div className='mb-56'>
          <div className='mt-6 items-start'>
            <h2 className='mb-4 text-h3 font-bold text-gray-800'>결제 정보</h2>
          </div>
          <BorderContainer innerPadding='p-3'>
            <div className='flex-col items-start p-2 text-gray-800'>
              <div className='mb-2 flex justify-between'>
                <span>댕동비</span>
                <span>{data ? data.deliveryFee.toLocaleString() : '정보 없음'}원</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span>모니터링비</span>
                <span>{data ? data.monitoringFee.toLocaleString() : '정보 없음'}원</span>
              </div>
              <div className='mb-2 flex justify-between'>
                <span>미용비</span>
                <span>{data ? data.groomingFee.toLocaleString() : '정보 없음'}원</span>
              </div>
              <div className='mt-2 flex justify-between border-t pt-2 text-lg font-bold'>
                <span>결제 금액</span>
                <span>{data.estimatePrice.toLocaleString()}원</span>
              </div>
            </div>
          </BorderContainer>
        </div>
      </PageContainer>
      <div className='fixed w-full' style={{ bottom: '65px' }}>
        <TypeOneButton text='예약하기' color='bg-secondary' onClick={handlePaymentExecute} />
      </div>
    </div>
  );
};

export default SuggestReview;
