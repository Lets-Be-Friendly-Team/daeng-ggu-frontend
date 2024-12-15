// SuccessPage.tsx

import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useGetPaymentDetail from '@/hooks/queries/Payment/useGetPaymentDetail';

export interface PaymentQueryParams {
  paymentType?: string;
  orderId?: string;
  paymentKey?: string;
  amount?: string;
}

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();

  // Extract query parameters
  const params: PaymentQueryParams = {
    paymentType: searchParams.get('paymentType') || undefined,
    orderId: searchParams.get('orderId') || undefined,
    paymentKey: searchParams.get('paymentKey') || undefined,
    amount: searchParams.get('amount') || undefined,
  };

  // Fetch payment details using the hook
  const { data: paymentDetails } = useGetPaymentDetail();

  const customerId = paymentDetails?.customerKey || 'Unknown';
  const amount = params.amount ? Number(params.amount) : 0;

  useEffect(() => {
    // Log the extracted parameters
    console.log('Payment Type:', params.paymentType);
    console.log('Customer ID:', customerId);
    console.log('Payment Key:', params.paymentKey);
    console.log('Amount:', amount);
  }, [params.paymentType, customerId, params.paymentKey, amount]);

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-lg'>
        <h1 className='mb-4 text-3xl font-semibold text-green-600'>결제 성공</h1>
        {customerId && (
          <div className='mb-2'>
            <span className='font-medium'>고객 ID:</span> {customerId}
          </div>
        )}
        {params.paymentKey && (
          <div className='mb-2'>
            <span className='font-medium'>결제 키:</span> {params.paymentKey}
          </div>
        )}
        {amount > 0 && (
          <div className='mb-4'>
            <span className='font-medium'>결제 금액:</span> {amount.toLocaleString()}원
          </div>
        )}
        <p className='mb-6 text-gray-700'>감사합니다! 결제가 완료되었습니다.</p>
        <div className='flex justify-center'>
          <a href='/' className='rounded bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'>
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
