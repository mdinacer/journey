import { SheetCell } from "@/models/sheet-cell";


interface Cell {
    [key: string]: string;
}



export function calculateFormula(formula: string, sheetData: Array<SheetCell>): number {
    const cellRegex = /([A-Z])0*([1-9]\d*)/g;
    const cellMatches = formula.matchAll(cellRegex);
    const referencedCells: Cell = {};

    for (const match of Array.from(cellMatches)) {
        const column = match[1];
        const row = parseInt(match[2]);
        const cellReference = `${column}${row}`;
        const referencedItem = sheetData.find(cell => cell.row === row && cell.col === column);

        if (referencedItem) {
            referencedCells[cellReference] = convertPercentage(referencedItem.value).toString();
        } else {
            console.warn(`Referenced cell ${cellReference} not found.`);
        }
    }

    const percentageRegex = /(\d+(?:\.\d+)?)%/g;
    const percentageMatch = formula.matchAll(percentageRegex);

    for (const match of Array.from(percentageMatch)) {
        formula = formula.replace(match[0], `${parseInt(match[1]) / 100}`)
    }

    let parsedFormula = formula.replace(cellRegex, (match) => {
        const cellReference = match.replace('$', '');
        const cellValue = referencedCells[cellReference];
        return typeof cellValue === 'string' ? cellValue : `${cellValue}`;
    });


    try {
        if (parsedFormula.startsWith("=")) {
            parsedFormula = parsedFormula.substring(1).trim()
        }
        const result = eval(parsedFormula);


        return typeof result === 'number' ? result : NaN;
    } catch (error) {
        console.error('Error calculating formula:', error);
        return NaN;
    }
}

function convertPercentage(value: string): number {
    if (typeof value === 'string') {
        const percentageRegex = /^(\d+(\.\d+)?)%$/;
        const match = value.match(percentageRegex);
        if (match) {
            const numericValue = parseFloat(match[1]);
            return isNaN(numericValue) ? 0 : numericValue / 100;
        }
    }
    return typeof value === 'number' ? value : +value;
}