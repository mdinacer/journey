import React, { useMemo } from 'react';
import Row from '../row/row';
import Column from '../column/column';
import Cell from '../cell/cell';
import useSheet from '@/hooks/use-sheet';
import { CELL_HEIGHT, CELL_WIDTH, alphabet } from './data';

interface Props {}

const Sheet: React.FC<Props> = () => {
  const { sheetSize } = useSheet();

  const colsCount = useMemo(
    () => Math.ceil(sheetSize.width / CELL_WIDTH),
    [sheetSize.width]
  );
  const rowsCount = useMemo(
    () => Math.ceil(sheetSize.height / CELL_HEIGHT),
    [sheetSize.height]
  );

  return (
    <table className='w-full table-fixed border-spacing-0'>
      <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
        <tr>
          {[...Array(Math.min(colsCount, 24))].map((_, headerIndex) => (
            <th key={headerIndex} scope='col' className='px-6 py-3'>
              {alphabet[headerIndex]}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...Array(rowsCount)].map((_, rowIndex) => (
          <Row index={rowIndex + 1} key={rowIndex}>
            {[...Array(Math.min(colsCount, 24))].map((_, colIndex) => (
              <Column key={colIndex}>
                <Cell
                  textAlgin='center'
                  col={alphabet[colIndex]}
                  row={rowIndex + 1}
                ></Cell>
              </Column>
            ))}
          </Row>
        ))}
      </tbody>
    </table>
  );
};

export default Sheet;
