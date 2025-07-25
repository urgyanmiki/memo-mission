import type { Card as CardType } from "../../types/types";
import { Cover } from "./Cover";
import { Figure } from "./Figure";

type CardProps = {
    card: CardType
    isGameReset: boolean | null
    onFlip: (id: number) => void
}

const Card = ({ card, isGameReset, onFlip }: CardProps) => {

    return (
        <div className="card-container">
            <Cover id={card.id}
                onFlip={onFlip}
            />
            <Figure imgUrl={card.imgUrl}
                isFlipped={card.isFlipped}
                isGameReset={isGameReset}
            />
        </div>
    )
}

export default Card;