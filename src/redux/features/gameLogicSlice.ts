import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SetSettingsPayload, GameLogicSlice, StartTimerPayload } from '../../types/types'

const initialState: GameLogicSlice = {
  counterStart: null,
  counterEnd: null,
  countdownTime: 60,

  matches: 0,
  mistakes: 0,

  numberOfBadGuesses: 100,
  numberOfPairs: 12,

  isGameRunning: false,
  isGameReset: null,
  isGameWon: false
}

const resetGame = (state: GameLogicSlice) => {
  state.counterStart = null;
  state.counterEnd = null;

  state.matches = 0;
  state.mistakes = 0;

  state.isGameRunning = false;
  state.isGameReset = true;
}

const gameLogicReducer = createSlice({
  name: 'gameLogic',
  initialState,
  reducers: {
    startGame: (state, action: PayloadAction<StartTimerPayload>) => {
      state.counterStart = action.payload.counterStart;
      state.counterEnd = action.payload.counterStart + state.countdownTime;

      state.isGameRunning = true;
      state.isGameWon = false;
    },
    endGame: (state) => {
      resetGame(state);
    },
    endReset: (state) => {
      state.isGameReset = false;
    },

    increaseMatches: (state) => {
      state.matches = state.matches + 1;

      if (state.matches === state.numberOfPairs) {
        resetGame(state);
        state.isGameWon = true;
      }
    },
    increaseMistakes: (state) => {
      state.mistakes = state.mistakes + 1;

      if (state.mistakes === state.numberOfBadGuesses) {
        resetGame(state);
        state.isGameWon = false;
      }
    },

    saveSettings: (state, action: PayloadAction<SetSettingsPayload>) => {
      state.countdownTime = action.payload.countdownTime;
      state.numberOfPairs = action.payload.numberOfPairs;
      state.numberOfBadGuesses = action.payload.numberOfBadGuesses;
    }
  }
})

export const { startGame, endGame, endReset, increaseMatches, increaseMistakes, saveSettings } = gameLogicReducer.actions;
export default gameLogicReducer.reducer