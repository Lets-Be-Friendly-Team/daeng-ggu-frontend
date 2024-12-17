// src/pages/PaymentPage.tsx

import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

import usePaymentStore from '@/stores/usePaymentStore.ts';
import useReservationStoreTwo from '@/stores/useReservationStoreTwo.ts';

const PaymentPage = () => {
  const PAYMENT_KEY_CLIENT = import.meta.env.VITE_TOSS_PAYMENT_CLIENT;
  const navigate = useNavigate();

  // **Retrieve data from Zustand stores**
  const { reservationOrderId, reservationCustomerKey, reservationTotalPayment } = useReservationStoreTwo();

  const { setPaymentKey, setOrderId } = usePaymentStore();

  // **Step 1: Ensure required data exists before proceeding**
  useEffect(() => {
    if (reservationOrderId === undefined || reservationCustomerKey === undefined) {
      console.error('PaymentPage - Missing reservation data. Redirecting to home.');
    }
  }, [reservationOrderId, reservationCustomerKey]);

  // **Step 2: Handle redirect from Toss Payments with paymentKey and orderId**
  useEffect(() => {
    const url = window.location.href;
    const paymentKeyRegex = /[?&]paymentKey=([^&]+)/;
    const orderIdRegex = /[?&]orderId=([^&]+)/;
    const paymentKeyMatch = url.match(paymentKeyRegex);
    const orderIdMatch = url.match(orderIdRegex);

    if (paymentKeyMatch && orderIdMatch) {
      const paymentKey = decodeURIComponent(paymentKeyMatch[1]);
      const orderId = decodeURIComponent(orderIdMatch[1]);
      console.log('Detected paymentKey in URL:', paymentKey);
      console.log('Detected orderId in URL:', orderId);

      // Store paymentKey and orderId in Zustand
      setPaymentKey(paymentKey);
      setOrderId(orderId);
      console.log('PaymentStore State:', usePaymentStore.getState());

      // Navigate to '/payment/success' without passing state
      navigate('/payment/success');
    }
  }, [setPaymentKey, setOrderId, navigate]);

  const isPaymentWidgetInitialized = useRef(false);
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  // **Step 3: Initialize the Toss Payment Widget**
  useEffect(() => {
    const initializePaymentWidget = async () => {
      if (isPaymentWidgetInitialized.current) return;
      if (!PAYMENT_KEY_CLIENT) {
        console.error('Missing Toss Payment Client Key.');
        return;
      }

      // Slight delay to ensure all data is set
      await new Promise((resolve) => setTimeout(resolve, 500));

      const orderId = reservationOrderId;

      // Type guard to ensure orderId is a string
      if (typeof orderId !== 'string') {
        console.error('Invalid reservationOrderId. It must be a string.');
        return;
      }

      const orderIdRegex = /^[A-Za-z0-9-_]{6,64}$/;
      if (!orderIdRegex.test(orderId)) {
        const errorMsg = '`orderId` must be valid.';
        console.error(errorMsg);
        return;
      }

      try {
        console.log('Initializing payment widget...');
        const paymentWidget = await loadPaymentWidget(PAYMENT_KEY_CLIENT, orderId);
        console.log('Payment widget loaded:', paymentWidget);

        await paymentWidget.renderPaymentMethods('#payment-widget', {
          value: reservationTotalPayment,
          currency: 'KRW',
        });

        paymentWidgetRef.current = paymentWidget;
        isPaymentWidgetInitialized.current = true;
        console.log('Payment widget rendered successfully.');
      } catch (widgetError) {
        console.error('Failed to load payment widget:', widgetError);
      }
    };

    // Adjust the condition to ensure TypeScript understands reservationOrderId is a string
    if (
      typeof reservationOrderId === 'string' &&
      typeof reservationCustomerKey === 'string' &&
      !isPaymentWidgetInitialized.current
    ) {
      initializePaymentWidget();
    }
  }, [PAYMENT_KEY_CLIENT, reservationTotalPayment, reservationOrderId, reservationCustomerKey]);

  // **Step 4: Handle Payment Request**
  const onRequestPayment = async () => {
    if (!paymentWidgetRef.current) {
      console.warn('Payment widget not ready.');
      return;
    }

    const orderId = reservationOrderId;
    const customerKey = reservationCustomerKey;

    // Type guard to ensure orderId and customerKey are strings
    if (typeof orderId !== 'string' || typeof customerKey !== 'string') {
      console.error('Invalid orderId or customerKey. Cannot proceed with payment.');
      return;
    }

    console.log('Ready to request payment with Order ID:', orderId, 'and Customer Key:', customerKey);

    const successUrl = `${window.location.origin}/payment`;
    const failUrl = `${window.location.origin}/payment/fail`;

    try {
      await paymentWidgetRef.current.requestPayment({
        orderId,
        orderName: '댕송지 미용 서비스 결제',
        successUrl,
        failUrl,
        customerEmail: customerKey, // Adjust if customerKey represents something else
        products: [
          {
            name: '미용 서비스',
            quantity: 1,
            unitAmount: reservationTotalPayment,
            currency: 'KRW',
            description: '강아지 미용 서비스',
          },
        ],
      });
      console.log('Payment request initiated successfully.');
    } catch (reqError) {
      console.error('Payment request failed:', reqError);
    }
  };

  // **Optional: Show loading state if necessary**
  if (typeof reservationOrderId !== 'string' || typeof reservationCustomerKey !== 'string') {
    return (
      <section className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
        <p>Loading payment details...</p>
      </section>
    );
  }

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
          {`${reservationTotalPayment.toLocaleString()}원 결제하기`}
        </button>
      </div>
    </section>
  );
};

export default PaymentPage;
