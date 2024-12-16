// PaymentPage.tsx

import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

import useGetPaymentDetails from '@/hooks/queries/Payment/useGetPaymentDetail';

export interface PaymentDetails {
  customerKey: string;
  orderId: string;
}

const PaymentPage = () => {
  const PAYMENT_KEY_CLIENT = import.meta.env.VITE_TOSS_PAYMENT_CLIENT;

  const location = useLocation();
  const { price, customerName } = location.state as {
    price: number;
    customerName: string;
  };

  const { data: paymentDetails } = useGetPaymentDetails();

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  useEffect(() => {
    const initializePaymentWidget = async () => {
      if (!PAYMENT_KEY_CLIENT) {
        console.error('Toss Payment Client Key is missing');
        return;
      }

      if (!paymentDetails) {
        console.error('Payment details are not available');
        return;
      }

      const { orderId } = paymentDetails;
      console.log('Order ID:', orderId);

      const orderIdRegex = /^[A-Za-z0-9-_]{6,64}$/;
      if (!orderIdRegex.test(orderId)) {
        console.error('`orderId`는 영문 대소문자, 숫자, 특수문자(-, _) 만 허용합니다. 6자 이상 64자 이하여야 합니다.');
        alert('`orderId`는 영문 대소문자, 숫자, 특수문자(-, _) 만 허용합니다. 6자 이상 64자 이하여야 합니다.');
        return;
      }

      try {
        const paymentWidget = await loadPaymentWidget(PAYMENT_KEY_CLIENT, orderId);

        await paymentWidget.renderPaymentMethods('#payment-widget', {
          value: price,
          currency: 'KRW',
        });

        paymentWidgetRef.current = paymentWidget;
      } catch (error) {
        console.error('Failed to load payment widget:', error);
        alert('결제 위젯을 로드하는 데 실패했습니다. 나중에 다시 시도해주세요.');
      }
    };
    initializePaymentWidget();
  }, [PAYMENT_KEY_CLIENT, price, paymentDetails]);

  const onRequestPayment = async () => {
    if (!paymentWidgetRef.current) {
      console.error('Payment widget is not loaded');
      alert('결제 위젯이 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    if (!paymentDetails) {
      console.error('Payment details are not available');
      alert('결제 정보를 불러오는 데 실패했습니다. 나중에 다시 시도해주세요.');
      return;
    }

    const { orderId } = paymentDetails;
    console.log('Order ID:', orderId);

    // Validate orderId before initiating payment
    const orderIdRegex = /^[A-Za-z0-9-_]{6,64}$/;
    if (!orderIdRegex.test(orderId)) {
      console.error('`orderId`는 영문 대소문자, 숫자, 특수문자(-, _) 만 허용합니다. 6자 이상 64자 이하여야 합니다.');
      alert('`orderId`는 영문 대소문자, 숫자, 특수문자(-, _) 만 허용합니다. 6자 이상 64자 이하여야 합니다.');
      return;
    }

    // Construct successUrl and failUrl without query parameters
    const successUrl = `${window.location.origin}/payment/success`;
    const failUrl = `${window.location.origin}/payment/fail`;

    try {
      await paymentWidgetRef.current.requestPayment({
        orderId: orderId,
        orderName: '댕송지 미용 서비스 결제',
        successUrl,
        failUrl,
        customerName,
        customerEmail: 'honggildong@example.com', // Ideally, fetch this from user data
        products: [
          {
            name: '미용 서비스',
            quantity: 1,
            unitAmount: price,
            currency: 'KRW',
            description: '강아지 미용 서비스',
          },
        ],
      });
    } catch (error) {
      console.error('Payment request failed:', error);
      alert('결제 요청에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='w-full rounded-lg bg-white p-8 shadow-lg'>
        <h2 className='mb-6 text-2xl font-semibold text-gray-800'>결제하기</h2>
        <div id='payment-widget' className='mb-6 w-full'></div>
        <button
          type='button'
          onClick={onRequestPayment}
          className='w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600'
        >
          {`${price.toLocaleString()}원 결제하기`}
        </button>
      </div>
    </section>
  );
};

export default PaymentPage;
