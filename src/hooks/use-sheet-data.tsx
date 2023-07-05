import { COLUMNS_LABELS } from '@/components/modules/sheet/data';
import { calculateFormula } from '@/helpers/formula-helper';
import { SheetCell } from '@/models/sheet-cell';
import { cellsSelectors } from '@/slices/sheet-slice';
import { useAppSelector } from '@/stores/configureStore';
import { useCallback, useEffect, useState } from 'react';
import useDataManager from './use-data-manager';

export default function useSheetData() {
  const { columnsLabels } = useAppSelector((state) => state.sheet);
  const cells = useAppSelector((state) => cellsSelectors.selectAll(state));
  const { isPolling, saveData } = useDataManager();
  const [busy, setBusy] = useState(false);

  const getCellsWithValues = useCallback(() => {
    return cells.filter((cell) => cell.value !== '');
  }, [cells]);

  const getAxisCount = useCallback((): {
    cols: number;
    rows: number;
  } => {
    const cellsWithValues = getCellsWithValues();
    let rowsCount = cellsWithValues.reduce((max, cell) => {
      if (cell.row > max) {
        max = cell.row;
      }
      return max;
    }, 0);

    const colsCount = Array.from(
      new Set<string>(cellsWithValues.map((c) => c.col))
    ).length;

    return { cols: colsCount, rows: rowsCount };
  }, [getCellsWithValues]);

  const exportCSV = useCallback(() => {
    return new Promise<any>((resolve, reject) => {
      const cellsWithValues = getCellsWithValues();

      if (cellsWithValues.length === 0) return undefined;

      const { cols: colsCount, rows: rowsCount } = getAxisCount();

      if (rowsCount === 0) reject(undefined);

      let rowsData: Array<string> = [];

      rowsData.push(columnsLabels.slice(0, colsCount).join(','));

      rowsData.push(
        ...Array.from({ length: rowsCount }, (_, index) => {
          const rowCells = cellsWithValues
            .filter((cell) => cell.row === index + 1)
            .sort((a, b) => a.col.localeCompare(b.col));

          return rowCells
            .map((c) =>
              c.value.startsWith('=')
                ? calculateFormula(c.value, cells).toFixed(2)
                : c.value
            )
            .join(',');
        })
      );
      resolve(rowsData.join('\n'));
      // return rowsData.join('\n');
    });
  }, [cells, columnsLabels, getAxisCount, getCellsWithValues]);

  const parseCSV = (csvData: string): Array<SheetCell> => {
    const lines = csvData.split('\n');
    const columns = lines[0].split(',');
    const cells: SheetCell[] = [];

    for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
      const rowValues = lines[rowIndex].split(',');

      if (rowValues.length !== columns.length) {
        // Skip invalid rows with inconsistent number of values
        continue;
      }

      for (let cellIndex = 0; cellIndex < rowValues.length; cellIndex++) {
        const colLabel = COLUMNS_LABELS[cellIndex];
        const value = rowValues[cellIndex];

        const cell: SheetCell = {
          row: rowIndex,
          col: colLabel,
          label: `${colLabel}${rowIndex}`,
          value
        };

        cells.push(cell);
      }
    }

    return cells;
  };

  const handleSaveData = useCallback(async () => {
    if (busy) {
      return;
    }
    try {
      setBusy(true);
      const csvData = await exportCSV();
      await saveData(csvData);
    } catch (error) {
      console.error(error);
    } finally {
      setBusy(false);
    }
  }, [busy, exportCSV, saveData]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      handleSaveData();
    }, 500);

    return () => {
      clearTimeout(timeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells, columnsLabels]);

  return {
    cells,
    isPolling,
    busy,
    exportCSV
  };
}
