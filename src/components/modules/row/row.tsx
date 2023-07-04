import { cn } from '@/lib/utils';
import { useAppSelector } from '@/stores/configureStore';
import React from 'react';

interface Props {
  index: number;
  children: React.ReactNode;
}

const Row: React.FC<Props> = ({ children, index }) => {
  const { selectedCell } = useAppSelector((state) => state.sheet);
  return (
    <tr
      className={cn('table-row', {
        'border border-red-600 shadow-lg': selectedCell?.row === index,
      })}
    >
      {children}
    </tr>
  );
};

export default Row;
