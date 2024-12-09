// components/SSEHandler.tsx
import { useEffect } from 'react';

import { useNotificationStore } from '../../index.ts';

const SSEHandler = () => {
  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);

  useEffect(() => {
    const eventSource = new EventSource('엔드포인트');

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        // Assuming `data.unreadCount` is provided by the SSE
        if (typeof data.unreadCount === 'number') {
          setUnreadCount(data.unreadCount);
        }
      } catch (error) {
        console.error(' SSE data 에러:', error);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      // 재연결 로직
    };

    return () => {
      eventSource.close();
    };
  }, [setUnreadCount]);

  return null;
};

export default SSEHandler;
