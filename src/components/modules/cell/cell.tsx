import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useCell from '@/hooks/use-cell';
import { cn } from '@/lib/utils';
import { Edit3 } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../ui/button';

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
    isSelected = false,
    calculatedFormula,
    calculateCellFormula
  } = useCell(`${col}${row}`);

  const [value, setValue] = useState<string>(cell?.value || '');
  const [isEditable, setIsEditable] = useState(false);

  const handleOnStartEdit = useCallback(() => {
    setValue(cell?.value || '');
    setIsEditable(true);
    handleCellSelect(cell);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell?.value]);

  const handleOnSelect = useCallback(
    () => {},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cell]
  );

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const {
        target: { value }
      } = e;
      setIsEditable(false);
      handleCellSelect();
      if (!value.startsWith('=')) return;
      calculateCellFormula(value);
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [calculateCellFormula]
  );

  useEffect(() => {
    if (!cell) {
      createCell(col, row);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateCellValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (!cell) {
    return (
      <td className="h-full w-full p-2">
        <Skeleton className="h-full w-full"></Skeleton>
      </td>
    );
  }

  return (
    <td
      className={cn(
        'table-cell h-full w-full min-w-[112px] overflow-hidden border-r  border-border hover:border hover:border-slate-300',
        {
          'text-center': textAlgin === 'center',
          'text-left': textAlgin === 'left',
          'text-right': textAlgin === 'right',
          'border border-l border-r border-slate-600': isSelected
        }
      )}
    >
      {isEditable ? (
        <Input
          value={value}
          onChange={({ target }) => setValue(target.value)}
          className={cn(' h-8 w-full  rounded-none', {
            'text-center': textAlgin === 'center',
            'text-left': textAlgin === 'left',
            'text-right': textAlgin === 'right'
          })}
          autoFocus
          onBlur={handleOnBlur}
          type="text"
        />
      ) : (
        <div
          onDoubleClick={handleOnStartEdit}
          onClick={handleOnSelect}
          className={cn(
            'relative flex h-8  w-full flex-row items-stretch hover:border [&>.edit]:hover:block',
            {
              'text-center': textAlgin === 'center',
              'text-left': textAlgin === 'left',
              'text-right': textAlgin === 'right'
            }
          )}
        >
          <div className="flex h-full flex-auto items-center justify-center overflow-auto px-2 ">
            <p className={cn('text-clip whitespace-nowrap')}>
              {cell?.value && cell.value.startsWith('=')
                ? calculatedFormula
                : cell.value}
            </p>
          </div>

          <div className="edit  right-0  top-0 hidden aspect-square h-full">
            <Button
              onClick={handleOnStartEdit}
              className="  h-full w-full rounded-none"
              variant={'secondary'}
              size={'icon'}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </td>
  );
};

export default Cell;
