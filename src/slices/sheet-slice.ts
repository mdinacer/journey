import { SheetCell } from "@/models/sheet-cell";
import { RootState } from "@/stores/configureStore";
import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

interface SheetState {
    sheetSize: { width: number, height: number }
    selectedCell: SheetCell | null,
    status: 'idle' | 'pending' | 'error';
}

const initialState: SheetState = {
    sheetSize: {
        width: 600,
        height: 600
    },
    status: "idle",
    selectedCell: null
};

const sheetCellsAdapter = createEntityAdapter<SheetCell>({
    selectId: (cell) => cell.label,
    sortComparer: (a, b) => b.label.localeCompare(a.label)
});


export const sheetSlice = createSlice({
    name: 'sheet',
    initialState: sheetCellsAdapter.getInitialState<SheetState>(initialState),
    reducers: {
        addCell: sheetCellsAdapter.addOne,
        addCells: sheetCellsAdapter.setAll,
        removeCell: sheetCellsAdapter.removeOne,
        updateCell: sheetCellsAdapter.updateOne,
        updateCells: sheetCellsAdapter.updateMany,
        upsertCell: sheetCellsAdapter.upsertOne,
        setSelectedCell: (state, action) => {
            state.selectedCell = action.payload
        },
        setSheetSize: (state, action) => {
            state.sheetSize = action.payload
        }
    },
    extraReducers: {
    }
});

export const cellsSelectors = sheetCellsAdapter.getSelectors(
    (state: RootState) => state.sheet
);

export const {
    addCell,
    addCells,
    removeCell,
    updateCell,
    updateCells,
    upsertCell,
    setSelectedCell,
    setSheetSize
} = sheetSlice.actions;