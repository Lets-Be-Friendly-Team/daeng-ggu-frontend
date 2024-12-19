// useCalendarStore.ts
/* eslint-disable no-unused-vars */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CalendarState {
  year: number;
  month: number;
  setYearMonth: (year: number, month: number) => void;
}

export const useCalendarStore = create<CalendarState>()(
  persist(
    (set) => ({
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      setYearMonth: (year, month) => set({ year, month }),
    }),
    {
      name: 'calendar-storage',
    },
  ),
);
