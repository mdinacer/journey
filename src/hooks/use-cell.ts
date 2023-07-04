import { calculateFormula } from "@/helpers/formula-helper";
import { SheetCell } from "@/models/sheet-cell";
import { addCell, cellsSelectors, setSelectedCell, updateCell, updateCells } from "@/slices/sheet-slice";
import { useAppDispatch, useAppSelector } from "@/stores/configureStore";
import { useCallback, useState } from "react";

export default function useCell(label: string) {
    const dispatch = useAppDispatch()
    const { selectedCell } = useAppSelector(state => state.sheet)
    const cells = useAppSelector(state => cellsSelectors.selectAll(state));
    const cell = cells.find(c => c.label === label) //useAppSelector(state => cellsSelectors.selectById(state, label));
    const [calculatedFormula, setCalculatedFormula] = useState("")



    const createCell = useCallback(
        (col: string, row: number) => {
            // Gen mockup

            let value = "";
            Math.floor(Math.random() * 26) + 5;
            switch (col) {
                case "A":
                    value = (Math.floor(Math.random() * 2001) + 500).toString()
                    break;
                case "B":
                    value = `${(Math.floor(Math.random() * 26) + 5)}%`;
                    break;
                case "C":
                    value = `= A${row} * B${row} `
                    break;
            }
            const cell: SheetCell = {
                label: `${col}${row}`,
                value: value?.toString() || "",
                row,
                col
            }

            dispatch(addCell(cell))
        },
        [dispatch],
    )

    const updateCellValue = useCallback(
        (value: any) => {
            if (!cell) return
            dispatch(updateCell({ id: label, changes: { ...cell, value } }))
            updateDependant()
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cell, label],
    )

    const handleCellSelect = useCallback(
        () => {
            if (!cell) return;

            dispatch(setSelectedCell(cell))
        },
        [cell, dispatch],
    )


    const calculateCellFormula = useCallback(
        (formula: string) => {
            const calculated = calculateFormula(formula, cells)
            setCalculatedFormula(calculated % 1 !== 0 ? calculated.toFixed(2) : calculated.toString())
        },
        [cells],
    )


    // const getCalculatedValue = useCallback(
    //     (value: string) => {
    //         return calculateFormula(value, cells)
    //     },
    //     [cells],
    // )

    const updateCellCalculatedValue = useCallback(
        () => {
            if (!cell || !cell.value.startsWith("=") || cell.status !== "update") return;
            calculateCellFormula(cell.value)
            dispatch(updateCell({ id: cell.label, changes: { ...cell, status: undefined } }))

        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [cell, cells],
    )


    const updateDependant = useCallback(
        () => {
            if (!cell) return;
            const regexPattern = new RegExp(`\\b${cell.label}\\b`);
            const dependant = cells.filter(c => c.value.startsWith("=") && regexPattern.test(c.value))
            dispatch(updateCells(dependant.map(c => ({ id: c.label, changes: { ...c, status: "update" } }))))
        },
        [cell, cells, dispatch],
    )




    return {
        cell,
        createCell,
        updateCellValue,
        handleCellSelect,
        isSelected: selectedCell?.label === label,
        //getCalculatedValue,
        updateCellCalculatedValue,
        calculatedFormula,
        calculateCellFormula
    }

};
