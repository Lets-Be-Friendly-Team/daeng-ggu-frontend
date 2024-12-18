// src/stores/useReservationStoreOne.ts
/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define the interface for the reservation state
interface ReservationState {
  // Fields
  orderId?: string;
  customerKey?: string;
  amount: number;
  estimateId?: number;
  reservationDate?: string;
  startTime?: string;
  endTime?: string;
  groomingFee?: number;
  deliveryFee?: number;
  monitoringFee?: number;
  totalPayment: number;

  // Setters
  setOrderId: (orderId: string) => void;
  setCustomerKey: (customerKey: string) => void;
  setAmount: (amount: number) => void;
  setEstimateId: (estimateId: number) => void;
  setReservationDate: (reservationDate: string) => void;
  setStartTime: (startTime: string) => void;
  setEndTime: (endTime: string) => void;
  setGroomingFee: (groomingFee: number) => void;
  setDeliveryFee: (deliveryFee: number) => void;
  setMonitoringFee: (monitoringFee: number) => void;
  setTotalPayment: (totalPayment: number) => void;

  // Clear Functions
  clearAll: () => void;

  // Toggle persistence
  togglePersistence: (enabled: boolean) => void;
}

// Create the Zustand store with persistence
const useReservationStoreOne = create<ReservationState>()(
  persist(
    (set, get) => ({
      // Initialize all fields
      orderId: undefined,
      customerKey: undefined,
      amount: 0,
      estimateId: undefined,
      reservationDate: undefined,
      startTime: undefined,
      endTime: undefined,
      groomingFee: undefined,
      deliveryFee: undefined,
      monitoringFee: undefined,
      totalPayment: 0,

      // Setters
      setOrderId: (orderId) => set({ orderId }),
      setCustomerKey: (customerKey) => set({ customerKey }),
      setAmount: (amount) => set({ amount }),
      setEstimateId: (estimateId) => set({ estimateId }),
      setReservationDate: (reservationDate) => set({ reservationDate }),
      setStartTime: (startTime) => set({ startTime }),
      setEndTime: (endTime) => set({ endTime }),
      setGroomingFee: (groomingFee) => set({ groomingFee }),
      setDeliveryFee: (deliveryFee) => set({ deliveryFee }),
      setMonitoringFee: (monitoringFee) => set({ monitoringFee }),
      setTotalPayment: (totalPayment) => set({ totalPayment }),

      // Clear All Fields
      clearAll: () =>
        set({
          orderId: undefined,
          customerKey: undefined,
          amount: 0,
          estimateId: undefined,
          reservationDate: undefined,
          startTime: undefined,
          endTime: undefined,
          groomingFee: undefined,
          deliveryFee: undefined,
          monitoringFee: undefined,
          totalPayment: 0,
        }),

      // Toggle persistence
      togglePersistence: (enabled: boolean) => {
        if (enabled) {
          // Persistence is already handled by the persist middleware on store creation
          console.warn('Persistence is enabled. The store is already persisted.');
        } else {
          // Remove persisted state from localStorage
          localStorage.removeItem('reservation-storage');
          // Optionally, clear the store
          get().clearAll();
        }
      },
    }),
    {
      name: 'reservation-storage', // Key in localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage with proper typing

      // Optional: Whitelist all state properties explicitly
      // Since you want to whitelist all, you can omit this or include all keys
      // However, omitting it will persist the entire state by default
      // If you prefer to be explicit, uncomment and list all properties:
      /*
      partialize: (state) => ({
        orderId: state.orderId,
        customerKey: state.customerKey,
        amount: state.amount,
        estimateId: state.estimateId,
        reservationDate: state.reservationDate,
        startTime: state.startTime,
        endTime: state.endTime,
        groomingFee: state.groomingFee,
        deliveryFee: state.deliveryFee,
        monitoringFee: state.monitoringFee,
        totalPayment: state.totalPayment,
      }),
      */
    },
  ),
);

export default useReservationStoreOne;
