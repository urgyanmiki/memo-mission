import { endGame, startGame } from "../redux/features/gameLogicSlice";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import { getNowDate } from "../utils/helpers";

export const useGame = () => {
    const dispatch = useAppDispatch();
    const { isGameRunning } = useAppSelector((state) => state.gameLogic);

    const handleStartGame = () => {
        if (isGameRunning) return;

        dispatch(startGame({
            counterStart: getNowDate()
        }));
    }

    const handleEndGame = () => {
        dispatch(endGame());
    }

    return { handleStartGame, handleEndGame }
}