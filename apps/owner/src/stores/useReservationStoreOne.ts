// src/stores/useReservationStoreOne.ts
/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Define the interface for the reservation state
interface ReservationState {
  // Existing Fields
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

  // New Fields
  petId?: number;
  designerId?: number;
  desiredService?: string;
  lastGroomingDate?: string; // e.g., '2023-10-10' or '잘 모르겠어요.'
  isDelivery?: boolean;
  isMonitoring?: boolean;
  additionalRequest?: string;

  // Setters for Existing Fields
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

  // Setters for New Fields
  setPetId: (petId: number) => void;
  setDesignerId: (designerId: number) => void;
  setDesiredService: (desiredService: string) => void;
  setLastGroomingDate: (lastGroomingDate: string) => void;
  setIsDelivery: (isDelivery: boolean) => void;
  setIsMonitoring: (isMonitoring: boolean) => void;
  setAdditionalRequest: (additionalRequest: string) => void;

  // Clear Functions
  clearAll: () => void;

  // Toggle persistence
  togglePersistence: (enabled: boolean) => void;
}

// Create the Zustand store with persistence
const useReservationStoreOne = create<ReservationState>()(
  persist(
    (set, get) => ({
      // Initialize all existing fields
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

      // Initialize new fields
      petId: undefined,
      designerId: undefined,
      desiredService: undefined,
      lastGroomingDate: undefined,
      isDelivery: false,
      isMonitoring: false,
      additionalRequest: undefined,

      // Setters for Existing Fields
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

      // Setters for New Fields
      setPetId: (petId) => set({ petId }),
      setDesignerId: (designerId) => set({ designerId }),
      setDesiredService: (desiredService) => set({ desiredService }),
      setLastGroomingDate: (lastGroomingDate) => set({ lastGroomingDate }),
      setIsDelivery: (isDelivery) => set({ isDelivery }),
      setIsMonitoring: (isMonitoring) => set({ isMonitoring }),
      setAdditionalRequest: (additionalRequest) => set({ additionalRequest }),

      // Clear All Fields
      clearAll: () =>
        set({
          // Clear existing fields
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

          // Clear new fields
          petId: undefined,
          designerId: undefined,
          desiredService: undefined,
          lastGroomingDate: undefined,
          isDelivery: false,
          isMonitoring: false,
          additionalRequest: undefined,
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
        petId: state.petId,
        designerId: state.designerId,
        desiredService: state.desiredService,
        lastGroomingDate: state.lastGroomingDate,
        isDelivery: state.isDelivery,
        isMonitoring: state.isMonitoring,
        additionalRequest: state.additionalRequest,
      }),
      */
    },
  ),
);

export default useReservationStoreOne;
