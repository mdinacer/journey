import { Skeleton } from '@/components/ui/skeleton';
import useCell from '@/hooks/use-cell';
import { cn } from '@/lib/utils';
import { Edit3 } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '@/components/ui/input';

export type CellProps = {
  col: string;
  row: number;
  textAlgin?: 'left' | 'right' | 'center';
};

const Cell: React.FC<CellProps> = ({ col, row, textAlgin = 'left' }) => {
  const {
    cell,
    createCell,
    updateCellValue,
    handleCellSelect,
    isSelected,
    updateCellCalculatedValue,
    calculatedFormula,
    calculateCellFormula,
  } = useCell(`${col}${row}`);

  const [value, setValue] = useState<string>(cell?.value || '');
  const [isEditable, setIsEditable] = useState(false);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = event;
      setValue(target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleOnStartEdit = useCallback(() => {
    setValue(cell?.value || '');
    setIsEditable(true);
    handleCellSelect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell?.value]);

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      setIsEditable(false);
      if (!e.target.value.startsWith('=')) return;
      calculateCellFormula(e.target.value);
    },

    [calculateCellFormula]
  );

  useEffect(() => {
    createCell(col, row);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateCellValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    updateCellCalculatedValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell?.status]);

  if (!cell) {
    return (
      <div className='h-full w-full p-2'>
        <Skeleton className='h-full w-full'></Skeleton>
      </div>
    );
  }

  return isEditable ? (
    <Input
      value={value}
      onChange={handleOnChange}
      className={cn('  w-full rounded-none  ', {
        'text-center': textAlgin === 'center',
        'text-left': textAlgin === 'left',
        'text-right': textAlgin === 'right',
      })}
      autoFocus
      onBlur={handleOnBlur}
      type='text'
    />
  ) : (
    <div
      onDoubleClick={handleOnStartEdit}
      className={cn(
        'relative flex h-full w-full flex-row items-center hover:border  hover:border-sky-300 [&>.edit]:hover:block',
        { 'border-sky-600': isSelected }
      )}
    >
      <div className='  h-full flex-auto items-center justify-center overflow-auto px-2 '>
        <p
          className={cn('text-clip whitespace-nowrap', {
            'text-center': textAlgin === 'center',
            'text-left': textAlgin === 'left',
            'text-right': textAlgin === 'right',
          })}
        >
          {cell.value.startsWith('=') ? calculatedFormula : cell.value}
        </p>
      </div>

      <div className='edit  right-0  top-0 hidden aspect-square h-full'>
        <Button
          onClick={handleOnStartEdit}
          className='  h-full w-full rounded-none'
          variant={'secondary'}
          size={'icon'}
        >
          <Edit3 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  );
};

export default Cell;
