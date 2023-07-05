import { cn } from '@/lib/utils';
import { cellsSelectors } from '@/slices/sheet-slice';
import { useAppSelector } from '@/stores/configureStore';
import React, { useMemo } from 'react';

interface Props {
  index: number;
  children: React.ReactNode;
}

const Row: React.FC<Props> = ({ children, index }) => {
  const { selectedCell } = useAppSelector((state) => state.sheet);
  const cells = useAppSelector((state) => cellsSelectors.selectAll(state));

  const hasErrors = useMemo(
    () => cells.some((c) => c.row === index && c.status === 'error'),
    [cells]
  );
  return (
    <tr
      className={cn('table-row h-10 bg-[#FAFAFA] transition-all duration-200', {
        'shadow-lg': selectedCell?.row === index,
        'bg-[#FFEFEF] ring-1 ring-red-600 ': hasErrors
      })}
    >
      {children}
    </tr>
  );
};

export default Row;
