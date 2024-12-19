// // src/stores/useDirectReservationStoreOne.ts
// /* eslint-disable no-unused-vars */
//
// import { create } from 'zustand';
// import { createJSONStorage, persist, StoreApi } from 'zustand/middleware';
//
// // Define the interface for the reservation state
// interface DirectReservationState {
//   // Fields
//   orderId?: string;
//   customerKey?: string;
//   amount: number;
//   petId?: number;
//   designerId?: number;
//   reservationDate?: string; // Stored as YYYY-MM-DD string
//   startTime?: string; // Stored as HH:MM:SS string
//   endTime?: string; // Stored as HH:MM:SS string
//   groomingFee?: number;
//   deliveryFee?: number;
//   monitoringFee?: number;
//   totalPayment: number;
//   desiredService?: string;
//   lastGroomingDate?: string; // e.g. '2023-10-10' or '잘 모르겠어요.'
//   isDelivery?: boolean;
//   isMonitoring?: boolean;
//   additionalRequest?: string;
//
//   // Setters
//   setOrderId: (orderId: string) => void;
//   setCustomerKey: (customerKey: string) => void;
//   setAmount: (amount: number) => void;
//   setPetId: (petId: number) => void;
//   setDesignerId: (designerId: number) => void;
//   setReservationDate: (reservationDate: string) => void;
//   setStartTime: (startTime: string) => void;
//   setEndTime: (endTime: string) => void;
//   setGroomingFee: (groomingFee: number) => void;
//   setDeliveryFee: (deliveryFee: number) => void;
//   setMonitoringFee: (monitoringFee: number) => void;
//   setTotalPayment: (totalPayment: number) => void;
//   setDesiredService: (desiredService: string) => void;
//   setLastGroomingDate: (lastGroomingDate: string) => void;
//   setIsDelivery: (isDelivery: boolean) => void;
//   setIsMonitoring: (isMonitoring: boolean) => void;
//   setAdditionalRequest: (additionalRequest: string) => void;
//
//   // Clear Functions
//   clearAll: () => void;
//
//   // Toggle persistence
//   togglePersistence: (enabled: boolean) => void;
// }
//
// // Create the Zustand store with persistence
// const useDirectReservationStoreOne = create<DirectReservationState>()(
//   persist(
//     (set, get) => ({
//       // Initialize all fields
//       orderId: undefined,
//       customerKey: undefined,
//       amount: 0,
//       petId: undefined,
//       designerId: undefined,
//       reservationDate: undefined,
//       startTime: undefined,
//       endTime: undefined,
//       groomingFee: undefined,
//       deliveryFee: undefined,
//       monitoringFee: undefined,
//       totalPayment: 0,
//       desiredService: undefined,
//       lastGroomingDate: undefined,
//       isDelivery: undefined,
//       isMonitoring: undefined,
//       additionalRequest: undefined,
//
//       // Setters
//       setOrderId: (orderId) => set({ orderId }),
//       setCustomerKey: (customerKey) => set({ customerKey }),
//       setAmount: (amount) => set({ amount }),
//       setPetId: (petId) => set({ petId }),
//       setDesignerId: (designerId) => set({ designerId }),
//       setReservationDate: (reservationDate) => set({ reservationDate }),
//       setStartTime: (startTime) => set({ startTime }),
//       setEndTime: (endTime) => set({ endTime }),
//       setGroomingFee: (groomingFee) => set({ groomingFee }),
//       setDeliveryFee: (deliveryFee) => set({ deliveryFee }),
//       setMonitoringFee: (monitoringFee) => set({ monitoringFee }),
//       setTotalPayment: (totalPayment) => set({ totalPayment }),
//       setDesiredService: (desiredService) => set({ desiredService }),
//       setLastGroomingDate: (lastGroomingDate) => set({ lastGroomingDate }),
//       setIsDelivery: (isDelivery) => set({ isDelivery }),
//       setIsMonitoring: (isMonitoring) => set({ isMonitoring }),
//       setAdditionalRequest: (additionalRequest) => set({ additionalRequest }),
//
//       // Clear All Fields
//       clearAll: () =>
//         set({
//           orderId: undefined,
//           customerKey: undefined,
//           amount: 0,
//           petId: undefined,
//           designerId: undefined,
//           reservationDate: undefined,
//           startTime: undefined,
//           endTime: undefined,
//           groomingFee: undefined,
//           deliveryFee: undefined,
//           monitoringFee: undefined,
//           totalPayment: 0,
//           desiredService: undefined,
//           lastGroomingDate: undefined,
//           isDelivery: undefined,
//           isMonitoring: undefined,
//           additionalRequest: undefined,
//         }),
//
//       // Toggle persistence
//       togglePersistence: (enabled: boolean) => {
//         if (enabled) {
//           console.warn('Persistence is enabled. The store is already persisted.');
//         } else {
//           localStorage.removeItem('direct-reservation-storage');
//           get().clearAll();
//         }
//       },
//     }),
//     {
//       name: 'direct-reservation-storage', // Key in localStorage
//       storage: createJSONStorage(() => localStorage), // Use localStorage with proper typing
//
//       // Optional: Whitelist all state properties explicitly
//       // Since you want to whitelist all, you can omit this or include all keys
//       // However, omitting it will persist the entire state by default
//       /*
//       partialize: (state) => ({
//         orderId: state.orderId,
//         customerKey: state.customerKey,
//         amount: state.amount,
//         petId: state.petId,
//         designerId: state.designerId,
//         reservationDate: state.reservationDate,
//         startTime: state.startTime,
//         endTime: state.endTime,
//         groomingFee: state.groomingFee,
//         deliveryFee: state.deliveryFee,
//         monitoringFee: state.monitoringFee,
//         totalPayment: state.totalPayment,
//         desiredService: state.desiredService,
//         lastGroomingDate: state.lastGroomingDate,
//         isDelivery: state.isDelivery,
//         isMonitoring: state.isMonitoring,
//         additionalRequest: state.additionalRequest,
//       }),
//       */
//     },
//   ),
// );
//
// export default useDirectReservationStoreOne;
