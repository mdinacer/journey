export type SheetCell = {
  label: string;
  value: string;
  row: number;
  col: string;
  status?: 'idle' | 'update' | 'error' | undefined;
};
