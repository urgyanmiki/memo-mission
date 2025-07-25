import type { CardFigure } from "../types/types";

export const CARD_FIGURES: Array<CardFigure> = [
    "FOX", "DOG", "CAT", "MOUSE", "RABBIT", "MONKEY", "BEAR", "PANDA", "KOALA", "TIGER", "LION", "PIG"
];

export const getNowDate = () => {
    return Date.now();
}

export const findEmptyIndex = <T>(arr: Array<T>, numberOfCards: number) => {
    let emptyIndex = -1;

    do {
        const randIndex = Math.floor(Math.random() * numberOfCards);
        if (!arr[randIndex]) {
            emptyIndex = randIndex;
        }
    } while (emptyIndex < 0);

    return emptyIndex;
}