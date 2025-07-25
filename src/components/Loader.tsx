import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import { faFaceSadTear } from "@fortawesome/free-solid-svg-icons/faFaceSadTear";
import { faFaceLaughBeam } from "@fortawesome/free-solid-svg-icons/faFaceLaughBeam";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLayoutEffect, useRef } from "react";

type LoaderProps = {
    isGameReset: boolean | null
    isGameWon: boolean
}
export const Loader = ({ isGameReset, isGameWon }: LoaderProps) => {
    const loaderRef = useRef<HTMLDivElement | null>(null)

    useLayoutEffect(() => {
        if (!loaderRef || !loaderRef.current) return;

        if (isGameReset) {
            loaderRef.current.classList = 'loader show';

        } else if (isGameReset !== null) {
            setTimeout(() => {
                loaderRef.current!.classList = 'loader hide';

                setTimeout(() => {
                    loaderRef.current!.classList = 'loader d-none';
                }, 150);
            }, 200)
        }
    }, [isGameReset]);

    return (
        <div className="loader d-none" ref={loaderRef}>
            {isGameWon && <WonGameResult />}
            {!isGameWon && <LostGameResult />}
            <h3 className="shuffle">
                <FontAwesomeIcon icon={faCircleNotch} spin /> The cards are being shuffled...
            </h3>
        </div>
    )
}

const LostGameResult = () => {
    return (
        <h2 className="game-result">
            You lost this time! <FontAwesomeIcon icon={faFaceSadTear} />
        </h2>
    )
}

const WonGameResult = () => {
    return (
        <h2 className="game-result won">
            You won the game! <FontAwesomeIcon icon={faFaceLaughBeam} bounce />
        </h2>
    )
}