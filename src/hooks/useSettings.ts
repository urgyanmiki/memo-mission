import { useCallback } from "react";
import { saveSettings } from "../redux/features/gameLogicSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import { useGame } from "./useGame";

export const useSettings = () => {
    const { handleEndGame } = useGame();

    const dispatch = useAppDispatch();
    const { countdownTime, numberOfPairs, numberOfBadGuesses, isGameRunning } = useAppSelector((state) => state.gameLogic);

    const handleSaveSettings = useCallback((countdownTime: number, numberOfPairs: number, numberOfBadGuesses: number) => {
        dispatch(saveSettings({
            countdownTime,
            numberOfPairs,
            numberOfBadGuesses
        }))

        if (isGameRunning) handleEndGame();
    }, [isGameRunning])

    return { countdownTime, numberOfPairs, numberOfBadGuesses, handleSaveSettings }
}