import { useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import type { Card, CardFigure } from "../types/types";
import { CARD_FIGURES } from "../utils/helpers";
import { findEmptyIndex } from "../utils/helpers";
import { increaseMatches, increaseMistakes, endReset } from "../redux/features/gameLogicSlice";

export const useCard = () => {
    const [cards, setCards] = useState<Array<Card>>([]);
    const timeoutId = useRef(0);

    const dispatch = useAppDispatch();
    const { numberOfPairs, isGameReset } = useAppSelector((state) => state.gameLogic);

    useEffect(() => {
        prepareCards();
    }, [numberOfPairs]);

    useEffect(() => {
        if (isGameReset) {
            setTimeout(() => {
                prepareCards();
                dispatch(endReset());
            }, 400);
        }
    }, [isGameReset])

    const prepareCards = () => {
        setCards(shuffleCards);
    }

    const handleCardFlip = (cardId: number) => {
        const flippedCard = cards.find((card: Card) => card.id === cardId);

        if (!flippedCard || flippedCard.isFlipped) return;

        setCards(prev =>
            prev.map(card =>
                card.id === flippedCard.id ? { ...card, isFlipped: true } : card
            )
        );

        const prevFlippedCard = cards.find((card: Card) => card.isFlipped && !card.isFoundMatch);
        if (!prevFlippedCard) return;

        timeoutId.current = setTimeout(() => {
            if (prevFlippedCard.figure === flippedCard.figure) {
                dispatch(increaseMatches());

                return setCards(prev =>
                    prev.map(card => {
                        if (card.id === prevFlippedCard.id || card.id === flippedCard.id) {
                            return { ...card, isFoundMatch: true };
                        }
                        return card;
                    })
                );
            } else {
                dispatch(increaseMistakes());

                return setCards(prev =>
                    prev.map(card => {
                        if (card.id === prevFlippedCard.id || card.id === flippedCard.id) {
                            return { ...card, isFlipped: false };
                        }
                        return card;
                    })
                );
            }
        }, 200);
    };

    const shuffleCards = () => {
        const numberOfCards = numberOfPairs * 2;
        let numberOfRepeat = Math.ceil(numberOfCards / 12);

        let populatedCards: Array<Card> = [];
        let cardIndex = 0;

        do {
            for (const cardFigure of CARD_FIGURES) {
                if (cardIndex === numberOfCards) break;

                const cardAIndex = findEmptyIndex<Card>(populatedCards, numberOfCards)
                populatedCards[cardAIndex] = getCard(cardFigure, cardIndex, null)
                cardIndex++;

                const cardBIndex = findEmptyIndex<Card>(populatedCards, numberOfCards)
                populatedCards[cardBIndex] = getCard(cardFigure, cardIndex, null)
                cardIndex++;
            }

            numberOfRepeat--;
        } while (numberOfRepeat > 0)

        populatedCards = populatedCards.filter(() => true);
        return populatedCards;
    };

    const getCard = (cardFigure: CardFigure, cardIndex: number, background = null) => {
        return {
            id: cardIndex + 1,
            figure: cardFigure,
            imgUrl: `/figures/${cardFigure.toLocaleLowerCase()}.png`,
            background: background,
            isFoundMatch: false,
            isFlipped: false
        } as Card
    }

    return { cards, handleCardFlip, prepareCards }
}