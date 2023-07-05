import { setSheetSize } from '@/slices/sheet-slice';
import { useAppDispatch, useAppSelector } from '@/stores/configureStore';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { CELL_HEIGHT, CELL_WIDTH, alphabet } from './data';
import Sheet from './sheet';

interface Props {}

const Container: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { sheetSize } = useAppSelector((state) => state.sheet);
  const [size, setSize] = useState(sheetSize);
  const [isMounted, setIsMounted] = useState(false);

  const handleOnResize = useCallback(
    (e: SyntheticEvent, data: ResizeCallbackData) => {
      setSize(data.size);
      dispatch(setSheetSize(data.size));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return (
    <ResizableBox
      className=" relative flex w-full items-center justify-start overflow-hidden border border-black p-5"
      height={Math.max(size.height, 600)}
      width={size.width}
      onResize={handleOnResize}
      draggableOpts={{ grid: [CELL_WIDTH + 10, CELL_HEIGHT + 10] }}
      minConstraints={[600, 600]}
      maxConstraints={[CELL_WIDTH * alphabet.length, CELL_HEIGHT * 1000]}
    >
      {isMounted && (
        <div
          style={{
            width: size.width + 'px',
            height: size.height + 'px'
          }}
          className="relative h-full w-full "
        >
          <Sheet></Sheet>
        </div>
      )}
    </ResizableBox>
  );
};

export default Container;
