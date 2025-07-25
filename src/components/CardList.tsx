import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCard } from "../hooks/useCard"
import { useAppSelector } from "../redux/store/hook";
import Card from "./Card";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons/faStopwatch";
import { useGame } from "../hooks/useGame";
import { Loader } from "./Loader";

export const CardList = () => {
    const { cards, handleCardFlip } = useCard();
    const { handleStartGame } = useGame();

    const { isGameRunning, isGameReset, isGameWon } = useAppSelector((state) => state.gameLogic);

    const handleFlip = (cardId: number) => {
        if (!isGameRunning) handleStartGame();
        handleCardFlip(cardId);
    }

    return (
        <div className="container">
            <section className="card-list-section position-relative">
                <div className="text-center">
                    <span className="game-status">
                        {isGameRunning && <>
                            <FontAwesomeIcon icon={faStopwatch} beatFade /> You have started the game!
                        </>}
                        {!isGameRunning && <>
                            <FontAwesomeIcon icon={faPlay} /> Please flip the first card to start the game!
                        </>}
                    </span>
                </div>
                <div className="card-list-grid">
                    {cards && cards.map((card) =>
                        <Card key={card.id}
                            isGameReset={isGameReset}
                            card={card}
                            onFlip={handleFlip}
                        />
                    )}
                </div>
                <Loader isGameReset={isGameReset}
                    isGameWon={isGameWon}
                />
            </section>
        </div>
    )
}