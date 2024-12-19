import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { loadPaymentWidget, PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

import usePaymentStore from '@/stores/usePaymentStore.ts';
import useReservationStoreTwo from '@/stores/useReservationStoreTwo.ts';

const PaymentPage = () => {
  const PAYMENT_KEY_CLIENT = import.meta.env.VITE_TOSS_PAYMENT_CLIENT;
  const navigate = useNavigate();
  const location = useLocation();

  const { reservationOrderId, reservationCustomerKey, reservationTotalPayment } = useReservationStoreTwo();
  const { setPaymentKey, setOrderId } = usePaymentStore();

  console.log('reservation id: ', reservationOrderId);
  console.log('customerKey: ', reservationCustomerKey);

  useEffect(() => {
    if (reservationOrderId === undefined || reservationCustomerKey === undefined) {
      console.error('PaymentPage - Missing reservation data.');
    }
  }, [reservationOrderId, reservationCustomerKey]);

  // Extract paymentKey and orderId from URL and navigate accordingly
  useEffect(() => {
    const url = window.location.href;
    const paymentKeyRegex = /[?&]paymentKey=([^&]+)/;
    const orderIdRegex = /[?&]orderId=([^&]+)/;
    const paymentKeyMatch = url.match(paymentKeyRegex);
    const orderIdMatch = url.match(orderIdRegex);

    if (paymentKeyMatch && orderIdMatch) {
      const paymentKey = decodeURIComponent(paymentKeyMatch[1]);
      const orderId = decodeURIComponent(orderIdMatch[1]);

      setPaymentKey(paymentKey);
      setOrderId(orderId);
      console.log('PaymentStore State:', usePaymentStore.getState());

      // Check current route to determine success route
      if (location.pathname.includes('/paymentDirect')) {
        console.log('eee');
        navigate('/paymentDirect/paymentDirectSuccess');
      } else {
        navigate('/payment/success');
      }
    }
  }, [setPaymentKey, setOrderId, navigate, location.pathname]);

  const isPaymentWidgetInitialized = useRef(false);
  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);

  useEffect(() => {
    const initializePaymentWidget = async () => {
      if (isPaymentWidgetInitialized.current) return;
      if (!PAYMENT_KEY_CLIENT) {
        console.error('Missing Toss Payment Client Key.');
        return;
      }

      const orderId = reservationOrderId;
      if (typeof orderId !== 'string') {
        console.error('Invalid reservationOrderId. It must be a string.');
        return;
      }

      const orderIdRegex = /^[A-Za-z0-9-_]{6,64}$/;
      if (!orderIdRegex.test(orderId)) {
        console.error('`orderId` must be valid.');
        return;
      }

      try {
        console.log('Initializing payment widget...');
        const paymentWidget = await loadPaymentWidget(PAYMENT_KEY_CLIENT, orderId);
        console.log('Payment widget loaded:', paymentWidget);

        const widgetContainer = document.querySelector('#payment-widget');
        if (!widgetContainer) {
          console.error('Cannot find #payment-widget element in the DOM.');
          return;
        }

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
    const url = window.location.href;
    const paymentKeyRegex = /[?&]paymentKey=([^&]+)/;
    const orderIdRegex = /[?&]orderId=([^&]+)/;
    const paymentKeyMatch = url.match(paymentKeyRegex);
    const orderIdMatch = url.match(orderIdRegex);

    // Only initialize if we have valid strings
    if (
      (typeof reservationOrderId === 'string' &&
        typeof reservationCustomerKey === 'string' &&
        !isPaymentWidgetInitialized.current) ||
      !paymentKeyMatch ||
      !orderIdMatch
    ) {
      console.log('render');
      initializePaymentWidget();
    }
  }, [PAYMENT_KEY_CLIENT, reservationTotalPayment, reservationOrderId, reservationCustomerKey]);

  const onRequestPayment = async () => {
    if (!paymentWidgetRef.current) {
      console.warn('Payment widget not ready.');
      return;
    }

    const orderId = reservationOrderId;
    const customerKey = reservationCustomerKey;
    if (typeof orderId !== 'string' || typeof customerKey !== 'string') {
      console.error('Invalid orderId or customerKey. Cannot proceed with payment.');
      return;
    }

    console.log('Ready to request payment with Order ID:', orderId, 'and Customer Key:', customerKey);

    // Depending on the route, set the successUrl
    let successUrl = `${window.location.origin}/payment`;
    let failUrl = `${window.location.origin}/payment/fail`;

    if (location.pathname.includes('/paymentDirect')) {
      successUrl = `${window.location.origin}/paymentDirect`;
      failUrl = `${window.location.origin}/paymentDirect/fail`;
    }

    try {
      await paymentWidgetRef.current.requestPayment({
        orderId,
        orderName: '댕송지 미용 서비스 결제',
        successUrl,
        failUrl,
        customerEmail: customerKey,
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

  const isDataReady = typeof reservationOrderId === 'string' && typeof reservationCustomerKey === 'string';

  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='w-full rounded-lg bg-white p-8 shadow-lg'>
        <h2 className='mb-6 text-2xl font-semibold text-gray-800'>결제하기</h2>
        <div id='payment-widget' className='mb-6 w-full'>
          {!isDataReady && <p>Loading payment details...</p>}
        </div>
        {/* Only enable the button once data is ready and widget is initialized */}
        {isDataReady ? (
          <button
            type='button'
            onClick={onRequestPayment}
            className='w-full rounded bg-blue-500 py-2 text-white transition hover:bg-blue-600'
          >
            {`${reservationTotalPayment.toLocaleString()}원 결제하기`}
          </button>
        ) : (
          <button type='button' disabled className='w-full cursor-not-allowed rounded bg-gray-300 py-2 text-white'>
            결제 준비중...
          </button>
        )}
      </div>
    </section>
  );
};

export default PaymentPage;
