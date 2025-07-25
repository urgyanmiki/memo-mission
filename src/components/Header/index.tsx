import { useRef } from "react";
import { useCountdown } from "../../hooks/useCountdown";
import { useAppSelector } from "../../redux/store/hook";
import { Counter } from "./Counter";
import { Logo } from "./Logo";
import { NavButtons } from "./NavButtons";
import { useGame } from "../../hooks/useGame";
import { useSettings } from "../../hooks/useSettings";

const Header = () => {
    const counterRef = useRef<HTMLHeadingElement | null>(null);

    const { handleEndGame } = useGame();
    const { countdownTime, numberOfPairs, numberOfBadGuesses, handleSaveSettings } = useSettings();
    useCountdown(counterRef);

    const { matches, mistakes } = useAppSelector((state) => state.gameLogic);

    return (
        <header>
            <nav>
                <div className="container">
                    <div className="nav-items">
                        <Logo />
                        <Counter matches={matches}
                            mistakes={mistakes}
                            countdownTime={countdownTime}
                            counterRef={counterRef}
                        />
                        <NavButtons countdownTime={countdownTime}
                            numberOfPairs={numberOfPairs}
                            numberOfBadGuesses={numberOfBadGuesses}
                            onSaveSettings={handleSaveSettings}
                            onEndGame={handleEndGame} />
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;