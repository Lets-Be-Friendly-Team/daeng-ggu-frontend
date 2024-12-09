import { create } from 'zustand';

type NotificationState = {
  unreadCount: number;
  setUnreadCount: (_count: number) => void;
};

const useNotificationStore = create<NotificationState>((set) => ({
  unreadCount: 0,
  setUnreadCount: (_count) => set({ unreadCount: _count }),
}));

export default useNotificationStore;
