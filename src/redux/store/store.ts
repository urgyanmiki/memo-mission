// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit'
import gameLogicSlice from '../features/gameLogicSlice'

export const store = configureStore({
    reducer: {
        gameLogic: gameLogicSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
