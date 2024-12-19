// src/pages/PaymentSuccessPage.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { DirectPaymentDetails } from '@/apis/payment/postDirectReservation.ts';
import useGetPaymentProcess from '@/hooks/queries/Payment/useGetPaymentProcess';
import usePostDirectReservationEstimate from '@/hooks/queries/Payment/usePostDirectReservationEstimate.ts';
import usePaymentStore from '@/stores/usePaymentStore';
import useReservationStoreOne from '@/stores/useReservationStoreOne';

const PaymentSuccessPageForDirect = () => {
  const {
    customerKey,
    amount,
    reservationDate,
    startTime,
    endTime,
    groomingFee,
    deliveryFee,
    monitoringFee,
    totalPayment,
    petId,
    designerId,
    desiredService, // Make sure this is available in your store or define it here.
    lastGroomingDate,
    isDelivery,
    isMonitoring,
    additionalRequest,
    clearAll,
  } = useReservationStoreOne();

  const { paymentKey, orderId } = usePaymentStore();

  const navigate = useNavigate();

  const isReservationDataLoaded =
    typeof customerKey === 'string' &&
    typeof amount === 'number' &&
    typeof reservationDate === 'string' &&
    typeof startTime === 'string' &&
    typeof endTime === 'string' &&
    typeof groomingFee === 'number' &&
    typeof deliveryFee === 'number' &&
    typeof monitoringFee === 'number' &&
    typeof totalPayment === 'number' &&
    typeof petId === 'string' &&
    typeof designerId === 'string' &&
    typeof desiredService === 'string' &&
    typeof lastGroomingDate === 'string' &&
    typeof isDelivery === 'boolean' &&
    typeof isMonitoring === 'boolean' &&
    typeof additionalRequest === 'string';

  const {
    data: paymentProcessData,
    isLoading: isPaymentProcessLoading,
    isError: isPaymentProcessError,
    isSuccess: isPaymentProcessSuccess,
    error: paymentProcessError,
  } = useGetPaymentProcess({
    customerKey: customerKey!,
    orderId: orderId!,
    amount,
    enabled: isReservationDataLoaded && !!paymentKey && !!orderId,
  });

  useEffect(() => {
    if (!paymentKey || !orderId) {
      console.warn('PaymentSuccessPage - No paymentKey or orderId found in store.');
      navigate('/');
    }
  }, [paymentKey, orderId, navigate]);

  useEffect(() => {
    if (isReservationDataLoaded && paymentKey && orderId) {
      console.log('Posting payment data:', { customerKey, orderId, amount });
    }
  }, [isReservationDataLoaded, paymentKey, orderId, customerKey, amount]);

  const {
    mutate: postDirectReservationEstimateMutation,
    isPending: isPostingEstimate, // useMutation's isLoading is typically used instead of isPending
    isError: isPostEstimateError,
    isSuccess: isPostEstimateSuccess,
  } = usePostDirectReservationEstimate({
    onSuccess: (data) => {
      if (data.status === 'SUCCESS') {
        console.log('Reservation estimate posted successfully:', data);
        clearAll();
        navigate(`/reservation`);
      } else {
        console.warn('Failed to post reservation estimate:', data.message);
      }
    },
    onError: (error) => {
      console.error('Error posting reservation estimate:', error);
    },
  });

  useEffect(() => {
    if (isPaymentProcessSuccess && paymentProcessData?.status === 'SUCCESS') {
      console.log('Payment process succeeded:', paymentProcessData);

      const paymentDetails: DirectPaymentDetails = {
        paymentKey: paymentKey!,
        orderId: orderId!,
        amount,
        reservationDate: reservationDate!,
        startTime: startTime!,
        endTime: endTime!,
        groomingFee: groomingFee!,
        deliveryFee: deliveryFee!,
        monitoringFee: monitoringFee!,
        totalPayment,
        petId: petId!,
        designerId: designerId!,
        desiredService: desiredService!, // Ensure this is coming from the store.
        lastGroomingDate: lastGroomingDate!,
        isDelivery: isDelivery!,
        isMonitoring: isMonitoring!,
        additionalRequest: additionalRequest!,
      };

      postDirectReservationEstimateMutation(paymentDetails);
    } else if (isPaymentProcessSuccess && paymentProcessData?.status !== 'SUCCESS') {
      console.warn('Payment process did not succeed:', paymentProcessData?.message || 'Unknown error');
    }

    if (isPaymentProcessError) {
      console.error('Error during payment process:', paymentProcessError);
    }
  }, [
    isPaymentProcessSuccess,
    paymentProcessData,
    isPaymentProcessError,
    paymentProcessError,
    postDirectReservationEstimateMutation,
    paymentKey,
    orderId,
    amount,
    reservationDate,
    startTime,
    endTime,
    groomingFee,
    deliveryFee,
    monitoringFee,
    totalPayment,
    petId,
    designerId,
    desiredService,
    lastGroomingDate,
    isDelivery,
    isMonitoring,
    additionalRequest,
  ]);

  if (!isReservationDataLoaded) {
    return (
      <section className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
        <p>Loading payment details...</p>
      </section>
    );
  }

  return (
    <div className='p-8'>
      <h1 className='mb-4 text-2xl font-bold'>결제 성공!</h1>
      <div className='rounded bg-white p-6 shadow-lg'>
        <h2 className='mb-4 text-xl font-semibold'>결제 상세 정보</h2>
        <ul className='space-y-2 text-gray-800'>
          <li>
            <strong>Payment Key:</strong> {paymentKey || 'N/A'}
          </li>
          <li>
            <strong>Order ID:</strong> {orderId || 'N/A'}
          </li>
          <li>
            <strong>Customer Key:</strong> {customerKey || 'N/A'}
          </li>
          <li>
            <strong>Amount:</strong> {amount.toLocaleString()}원
          </li>
          <li>
            <strong>Reservation Date:</strong> {reservationDate || 'N/A'}
          </li>
          <li>
            <strong>Start Time:</strong> {startTime || 'N/A'}
          </li>
          <li>
            <strong>End Time:</strong> {endTime || 'N/A'}
          </li>
          <li>
            <strong>Grooming Fee:</strong> {groomingFee.toLocaleString()}원
          </li>
          <li>
            <strong>Delivery Fee:</strong> {deliveryFee.toLocaleString()}원
          </li>
          <li>
            <strong>Monitoring Fee:</strong> {monitoringFee.toLocaleString()}원
          </li>
          <li>
            <strong>Pet ID:</strong> {petId || 'N/A'}
          </li>
          <li>
            <strong>Designer ID:</strong> {designerId || 'N/A'}
          </li>
          <li>
            <strong>Desired Service:</strong> {desiredService || 'N/A'}
          </li>
          <li>
            <strong>Last Grooming Date:</strong> {lastGroomingDate || 'N/A'}
          </li>
          <li>
            <strong>Is Delivery:</strong> {isDelivery ? 'Yes' : 'No'}
          </li>
          <li>
            <strong>Is Monitoring:</strong> {isMonitoring ? 'Yes' : 'No'}
          </li>
          <li>
            <strong>Additional Request:</strong> {additionalRequest || 'N/A'}
          </li>
          <li className='mt-4 border-t pt-4 font-bold'>
            <strong>Total Payment:</strong> {totalPayment.toLocaleString()}원
          </li>
        </ul>
        {(isPaymentProcessLoading || isPostingEstimate) && (
          <p className='mt-4 text-blue-500'>Processing your payment details...</p>
        )}
        {(isPaymentProcessError || isPostEstimateError) && (
          <p className='mt-4 text-red-500'>Failed to process payment details. Please try again later.</p>
        )}
        {isPostEstimateSuccess && paymentProcessData?.status === 'SUCCESS' && (
          <p className='mt-4 text-green-500'>Payment details successfully processed!</p>
        )}
      </div>
      <div className='mt-6 flex justify-center'>
        <button
          onClick={() => navigate('/')}
          className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessPageForDirect;
