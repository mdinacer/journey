import { setSheetSize } from '@/slices/sheet-slice';
import { useAppDispatch, useAppSelector } from '@/stores/configureStore';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function useSheetResize() {
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { sheetSize } = useAppSelector((state) => state.sheet);

  const getWidthAndHeight = () => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      dispatch(setSheetSize({ width, height }));
    }
    setIsMounted(true);
  };

  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();

      if (sheetSize.width < width) dispatch(setSheetSize({ width, height }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sheetSize.width]);

  useEffect(() => {
    getWidthAndHeight();
    if (containerRef.current) {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMounted,
    containerRef
  };
}
