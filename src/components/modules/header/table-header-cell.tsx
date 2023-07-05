import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Edit3 } from 'lucide-react';
import React, { useCallback, useState } from 'react';

interface Props {
  label: string;
  onLabelChange: (value: string) => void;
}
const TableHeaderCell: React.FC<Props> = ({ label, onLabelChange }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(label);

  const handleOnBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement, Element>) => {
      const {
        target: { value }
      } = e;
      onLabelChange(value);
      setIsEdit(false);
    },
    [onLabelChange]
  );
  return isEdit ? (
    <div>
      <Input
        className=" h-8 w-full  rounded-none focus-visible:border-none focus-visible:ring-0"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        autoFocus
        onBlur={handleOnBlur}
        type="text"
      />
    </div>
  ) : (
    <div
      className={cn(
        'relative flex h-8  w-full flex-row items-stretch hover:border [&>.edit]:hover:block'
      )}
    >
      <div className="flex h-full flex-auto items-center justify-center overflow-auto px-2 ">
        <p className={'text-clip whitespace-nowrap capitalize'}>{label}</p>
      </div>

      <div className="edit  right-0  top-0 hidden aspect-square h-full">
        <Button
          onClick={() => setIsEdit(true)}
          className="  h-full w-full rounded-none"
          variant={'secondary'}
          size={'icon'}
        >
          <Edit3 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default TableHeaderCell;
