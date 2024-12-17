// src/pages/PaymentSuccessPage.tsx

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useGetPaymentProcess from '@/hooks/queries/Payment/useGetPaymentProcess';
import usePaymentStore from '@/stores/usePaymentStore';
import useReservationStoreOne from '@/stores/useReservationStoreOne';

const PaymentSuccessPage = () => {
  // **Retrieve data from Zustand stores**
  const {
    customerKey,
    amount,
    estimateId,
    reservationDate,
    startTime,
    endTime,
    groomingFee,
    deliveryFee,
    monitoringFee,
    totalPayment,
    // clearAll, // Uncomment if you plan to use it
  } = useReservationStoreOne();

  const { paymentKey, orderId } = usePaymentStore();

  const navigate = useNavigate();

  // **Step 1: Define a variable to check if reservation data is loaded**
  const isReservationDataLoaded =
    typeof customerKey === 'string' &&
    typeof amount === 'number' &&
    (typeof estimateId === 'number' || estimateId === undefined) &&
    typeof reservationDate === 'string' &&
    typeof startTime === 'string' &&
    typeof endTime === 'string' &&
    typeof groomingFee === 'number' &&
    typeof deliveryFee === 'number' &&
    typeof monitoringFee === 'number' &&
    typeof totalPayment === 'number';

  // **Step 2: Initialize the useGetPaymentProcess hook unconditionally**
  const {
    data: paymentProcessData,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetPaymentProcess({
    customerKey: customerKey!,
    orderId: orderId!,
    amount,
    enabled: isReservationDataLoaded && !!paymentKey && !!orderId,
  });

  // **Step 3: Redirect to home if essential data is missing**
  useEffect(() => {
    if (!paymentKey || !orderId) {
      console.warn('PaymentSuccessPage - No paymentKey or orderId found in store.');
      navigate('/');
    }
  }, [paymentKey, orderId, navigate]);

  // **Step 4: Log data before making the API call**
  useEffect(() => {
    if (isReservationDataLoaded && paymentKey && orderId) {
      console.log('Posting payment data:', { customerKey, orderId, amount });
    }
  }, [isReservationDataLoaded, paymentKey, orderId, customerKey, amount]);

  // **Step 5: Handle the mutation's success and error states**
  useEffect(() => {
    if (isSuccess && paymentProcessData?.status === 'SUCCESS') {
      console.log('Payment process succeeded:', paymentProcessData);
      // Optionally, perform additional actions here, such as clearing the store or navigating to another page
      // clearAll(); // Uncomment if you wish to clear the store
    } else if (isSuccess && paymentProcessData?.status !== 'SUCCESS') {
      console.warn('Payment process did not succeed:', paymentProcessData?.message || 'Unknown error');
      // Optionally, navigate to an error page or display a message to the user
    }

    if (isError) {
      console.error('Error during payment process:', error);
      // Optionally, navigate to an error page or display a message to the user
    }
  }, [isSuccess, paymentProcessData, isError, error]);

  // **Step 6: Show loading state if data is not yet loaded**
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
            <strong>Estimate ID:</strong> {estimateId !== undefined ? estimateId : 'N/A'}
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
          <li className='mt-4 border-t pt-4 font-bold'>
            <strong>Total Payment:</strong> {totalPayment.toLocaleString()}원
          </li>
        </ul>
        {/* **Optional: Show loading or error states related to the POST request** */}
        {isLoading && <p className='mt-4 text-blue-500'>Processing your payment details...</p>}
        {isError && <p className='mt-4 text-red-500'>Failed to process payment details. Please try again later.</p>}
        {isSuccess && paymentProcessData?.status === 'SUCCESS' && (
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

export default PaymentSuccessPage;
