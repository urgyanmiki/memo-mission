import type React from "react"

export type GameLogicSlice = {
    counterStart: number | null
    counterEnd: number | null

    matches: number
    mistakes: number

    countdownTime: number
    numberOfBadGuesses: number
    numberOfPairs: number

    isGameRunning: boolean
    isGameReset: boolean | null
    isGameWon: boolean
}

export type SetTimerPayload = {
    countdownTime: number
}

export type StartTimerPayload = {
    counterStart: number
}

export type ResetTimerPayload = {
    counterStart: number
}

export type SetSettingsPayload = {
    numberOfPairs: number
    countdownTime: number
    numberOfBadGuesses: number
}

export type CardFigure = "FOX" | "DOG" | "CAT" | "MOUSE"
    | "RABBIT" | "MONKEY" | "BEAR" | "PANDA"
    | "KOALA" | "TIGER" | "LION" | "PIG"

export type Card = {
    id: number
    figure: CardFigure

    imgUrl: string
    background: string | null

    isFoundMatch: boolean
    isFlipped: boolean
}

export type ReactNodeProps = {
    children: React.ReactNode
}

export type SettingsForm = {
    countdownTime: number
    numberOfBadGuesses: number
    numberOfPairs: number
    onSaveSettings: (countdownTime: number, numberOfBadGuesses: number, numberOfPairs: number) => void
}

export type InputRefActions = {
    getValidatedInputVal: () => number | false
}