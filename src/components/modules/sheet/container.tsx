import React, { useCallback, useEffect, useRef, useState } from 'react';
import Sheet from './sheet';
import { useAppDispatch } from '@/stores/configureStore';
import { setSheetSize } from '@/slices/sheet-slice';

interface Props {
  children?: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className='relative h-full w-full'>
      <Sheet></Sheet>

      {/* <div
        ref={ref}
        draggable
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className=' absolute bottom-0 right-0 h-4 w-4 translate-x-1/2 translate-y-1/2 rounded bg-black  opacity-25 hover:opacity-100'
      ></div> */}
    </div>
  );
};

export default Container;
