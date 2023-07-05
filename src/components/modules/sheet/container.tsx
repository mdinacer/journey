import { setSheetSize } from '@/slices/sheet-slice';
import { useAppDispatch, useAppSelector } from '@/stores/configureStore';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { CELL_HEIGHT, CELL_WIDTH } from './data';
import Sheet from './sheet';

interface Props {}

const Container: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const { sheetSize } = useAppSelector((state) => state.sheet);
  const [size, setSize] = useState(sheetSize);

  const handleOnResize = useCallback(
    (e: SyntheticEvent, data: ResizeCallbackData) => {
      setSize(data.size);
      dispatch(setSheetSize(data.size));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    setSize(sheetSize);
  }, [sheetSize]);

  return (
    <ResizableBox
      className=" relative flex w-full items-center justify-start overflow-hidden"
      height={size.height}
      width={size.width}
      onResize={handleOnResize}
      draggableOpts={{ grid: [CELL_WIDTH + 10, CELL_HEIGHT + 10] }}
      minConstraints={[600, 600]}
      maxConstraints={[CELL_WIDTH * 27, CELL_HEIGHT * 1000]}
    >
      <div
        style={{
          width: size.width + 'px',
          height: size.height + 'px'
        }}
        className="relative h-full w-full "
      >
        <Sheet />
      </div>
    </ResizableBox>
  );
};

export default Container;
