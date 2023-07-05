'use client';

import useSheet from '@/hooks/use-sheet';
import React, { useMemo } from 'react';
import Cell from '../cell/cell';
import Row from '../row/row';
import { CELL_HEIGHT, CELL_WIDTH, alphabet } from './data';

interface Props {}

const Sheet: React.FC<Props> = () => {
  const { sheetSize } = useSheet();
  const { width, height } = sheetSize;

  const colsCount = useMemo(
    () => Math.min(alphabet.length, Math.ceil(width / (CELL_WIDTH + 10))),
    [width]
  );
  const rowsCount = useMemo(
    () => Math.ceil((height - 60) / (CELL_HEIGHT + 8)),
    [height]
  );

  return (
    <table className="w-auto table-fixed border-separate border-spacing-y-2">
      <thead className="bg-gray-50 uppercase ">
        <tr>
          {[...Array(colsCount)].map((_, headerIndex) => (
            <th
              key={headerIndex}
              scope="col"
              className="table-cell w-full min-w-[200px] bg-[#EFEFEF] px-6 py-3 font-normal"
            >
              {alphabet[headerIndex]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {[...Array(rowsCount)].map((_, rowIndex) => (
          <Row index={rowIndex + 1} key={rowIndex}>
            {[...Array(colsCount)].map((_, colIndex) => (
              <Cell
                key={colIndex}
                textAlgin="center"
                col={alphabet[colIndex]}
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
