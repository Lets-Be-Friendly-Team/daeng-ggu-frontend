// src/stores/usePaymentStore.ts

import { create } from 'zustand';

interface PaymentState {
  paymentKey?: string;
  orderId?: string;

  // Setters
  setPaymentKey: (_paymentKey: string) => void;
  setOrderId: (_orderId: string) => void;

  // Clear Functions
  clearPaymentKey: () => void;
  clearOrderId: () => void;
  clearAll: () => void;
}

const usePaymentStore = create<PaymentState>((set) => ({
  paymentKey: undefined,
  orderId: undefined,

  // Setters
  setPaymentKey: (paymentKey) => set({ paymentKey }),
  setOrderId: (orderId) => set({ orderId }),

  // Clear Functions
  clearPaymentKey: () => set({ paymentKey: undefined }),
  clearOrderId: () => set({ orderId: undefined }),
  clearAll: () => set({ paymentKey: undefined, orderId: undefined }),
}));

export default usePaymentStore;
