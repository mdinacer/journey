'use client';

import useSheet from '@/hooks/use-sheet';
import React, { useMemo } from 'react';
import Cell from '../cell/cell';
import Row from '../row/row';
import { CELL_HEIGHT, CELL_WIDTH, COLUMNS_LABELS } from './data';
import TableHeader from '../header/table-header';

interface Props {}

const Sheet: React.FC<Props> = () => {
  const { sheetSize } = useSheet();
  const { width, height } = sheetSize;

  const colsCount = useMemo(
    () => Math.min(26, Math.ceil(width / (CELL_WIDTH + 10))),
    [width]
  );
  const rowsCount = useMemo(
    () => Math.ceil((height - 60) / (CELL_HEIGHT + 8)),
    [height]
  );

  return (
    <table className="w-auto table-fixed border-separate border-spacing-y-2">
      <TableHeader colsCount={colsCount} />

      <tbody className="">
        {[...Array(rowsCount)].map((_, rowIndex) => (
          <Row index={rowIndex + 1} key={rowIndex}>
            {[...Array(colsCount)].map((_, colIndex) => (
              <Cell
                key={colIndex}
                textAlgin="center"
                col={COLUMNS_LABELS[colIndex]}
                row={rowIndex + 1}
              />
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
};

export default Sheet;
