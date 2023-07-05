import { toast } from '@/components/ui/use-toast';
import { setColumnsLabels } from '@/slices/sheet-slice';
import { useAppDispatch, useAppSelector } from '@/stores/configureStore';
import React, { useCallback } from 'react';
import TableHeaderCell from './table-header-cell';

interface Props {
  colsCount: number;
}
const TableHeader: React.FC<Props> = ({ colsCount }) => {
  const dispatch = useAppDispatch();
  const { columnsLabels } = useAppSelector((state) => state.sheet);

  const handleLabelChange = useCallback(
    (newValue: string, oldValue: string) => {
      if (!newValue || newValue === oldValue) return;
      if (columnsLabels.includes(newValue)) {
        toast({
          variant: 'destructive',
          title: 'Duplicate label',
          description: 'The table already has a column with that name'
        });
        return;
      }

      const items = columnsLabels.map((label) =>
        label === oldValue ? newValue : label
      );

      dispatch(setColumnsLabels(items));
    },
    [columnsLabels, dispatch]
  );

  return (
    <thead className="bg-gray-50 uppercase ">
      <tr>
        {[...Array(colsCount)].map((_, headerIndex) => (
          <th
            key={headerIndex}
            scope="col"
            className="table-cell w-full min-w-[200px] bg-[#EFEFEF] px-6 py-3 font-normal capitalize"
          >
            <TableHeaderCell
              label={columnsLabels[headerIndex]}
              onLabelChange={(value) =>
                handleLabelChange(value, columnsLabels[headerIndex])
              }
            />
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
