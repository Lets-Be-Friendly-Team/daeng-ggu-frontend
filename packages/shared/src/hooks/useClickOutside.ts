import { useCallback, useEffect, useRef } from 'react';

const useClickOutside = <T extends Node = HTMLElement>(callback: () => void) => {
  const ref = useRef<T>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    },
    [callback],
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // 추후에 리팩토링
  //   useEffect(() => {
  //     const unsubscribe = router.subscribe(callback);

  //     return () => {
  //       unsubscribe();
  //     };
  //   }, [callback]);

  return { targetRef: ref };
};

export default useClickOutside;
