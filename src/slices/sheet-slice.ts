import { createSlice } from "@reduxjs/toolkit";

interface SheetState {
    sheetSize: { width: number, height: number }

    status: 'idle' | 'pending' | 'error';
}

const initialState: SheetState = {
    sheetSize: {
        width: 600,
        height: 600
    },
    status: "idle"
};


export const sheetSlice = createSlice({
    name: 'sheet',
    initialState,

    reducers: {



    },
    extraReducers: {

    }
});