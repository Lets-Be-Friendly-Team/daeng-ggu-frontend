import { useEffect } from 'react';

import useToastStore from '../stores/useToastStore';

interface Props {
  durationMinute?: number;
}

const useToast = (props?: Props) => {
  const { toast, type, showToast, hideToast } = useToastStore();

  const { durationMinute = 2 } = props || {};

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        hideToast();
      }, durationMinute * 1000);
      return () => clearTimeout(timer);
    }
  }, [toast, durationMinute, hideToast]);

  return { toast, type, showToast };
};

export default useToast;
