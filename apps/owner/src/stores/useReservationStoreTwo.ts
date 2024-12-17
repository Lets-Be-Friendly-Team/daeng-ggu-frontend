// src/stores/useReservationStoreTwo.ts
/* eslint-disable no-unused-vars */

import { create } from 'zustand';

interface ReservationStateTwo {
  // Fields
  reservationOrderId?: string;
  reservationCustomerKey?: string;
  reservationTotalPayment: number;

  // Setters
  setReservationOrderId: (reservationOrderId: string) => void;
  setReservationCustomerKey: (reservationCustomerKey: string) => void;
  setReservationTotalPayment: (reservationTotalPayment: number) => void;

  // Clear Function
  clearAll: () => void;
}

const useReservationStoreTwo = create<ReservationStateTwo>((set) => ({
  // Initialize all fields appropriately
  reservationOrderId: undefined,
  reservationCustomerKey: undefined,
  reservationTotalPayment: 0,

  // Setters
  setReservationOrderId: (reservationOrderId) => set({ reservationOrderId }),
  setReservationCustomerKey: (reservationCustomerKey) => set({ reservationCustomerKey }),
  setReservationTotalPayment: (reservationTotalPayment) => set({ reservationTotalPayment }),

  // Clear All Fields
  clearAll: () =>
    set({
      reservationOrderId: undefined,
      reservationCustomerKey: undefined,
      reservationTotalPayment: 0,
    }),
}));

export default useReservationStoreTwo;
