import { useEffect, useRef, type RefObject } from "react";
import { useAppSelector } from "../redux/store/hook"
import { useGame } from "./useGame";

export const useCountdown = (counterRef: RefObject<HTMLHeadingElement | null>) => {
    const isCounting = useRef<boolean>(false);
    const elapsedTime = useRef<number>(0);

    const intervalId = useRef<number>(0);

    const { handleEndGame } = useGame();
    const { countdownTime, isGameRunning, isGameReset } = useAppSelector((state) => state.gameLogic);

    useEffect(() => {
        if (isGameRunning && !isCounting.current) {
            isCounting.current = false;

            intervalId.current = setInterval(() => {
                if (elapsedTime.current < countdownTime) {
                    elapsedTime.current++;

                    if (counterRef && counterRef.current) {
                        counterRef.current.innerText = `${countdownTime - elapsedTime.current}`;
                    }
                } else {
                    handleEndGame();
                    resetCounter();

                    return 0;
                }
            }, 1000)

            return () => clearInterval(intervalId.current);
        }
    }, [isGameRunning, isCounting]);

    useEffect(() => {
        resetCounter();
    }, [isGameReset]);

    const resetCounter = () => {
        if (counterRef && counterRef.current) {
            counterRef.current.innerText = `${countdownTime}`;
        }

        elapsedTime.current = 0;
        isCounting.current = false;

        clearInterval(intervalId.current);
    }
}