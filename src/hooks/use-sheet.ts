import { useAppSelector } from "@/stores/configureStore"



export default function useSheet() {
    const { sheetSize } = useAppSelector(state => state.sheet)
    return {
        sheetSize
    }
};
