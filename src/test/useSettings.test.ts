import { renderHook, act } from "@testing-library/react";
import { describe, test, expect, vi, afterEach, beforeEach, type Mock } from "vitest";
import { useSettings } from "../hooks/useSettings";
import { useAppSelector } from "../redux/store/hook";
import { saveSettings } from "../redux/features/gameLogicSlice";
import type { RootState } from "../redux/store/store";

const mockDispatch = vi.fn();
const mockHandleEndGame = vi.fn();

vi.mock("../redux/store/hook", () => ({
    useAppDispatch: () => mockDispatch,
    useAppSelector: vi.fn(),
}));

vi.mock("./useGame", () => ({
    useGame: () => ({
        handleEndGame: mockHandleEndGame,
    }),
}));

vi.mock("../redux/features/gameLogicSlice", async () => {
    const actual = await vi.importActual("../redux/features/gameLogicSlice");

    return {
        ...actual,
        saveSettings: vi.fn((payload) => ({
            payload,
        })),
    };
});

const initGameLogicSlice = {
    countdownTime: 60,
    numberOfPairs: 12,
    numberOfBadGuesses: 20,
    isGameRunning: false,

    counterStart: null,
    counterEnd: null,
    matches: 0,
    mistakes: 0,
}

const newGameSettings = {
    countdownTime: 90,
    numberOfPairs: 18,
    numberOfBadGuesses: 30,
}

const setMockGameState = (overrides = {}) => {
    (useAppSelector as Mock).mockImplementation((selector: (state: RootState) => unknown) =>
        selector({
            gameLogic: {
                ...initGameLogicSlice,
                ...overrides,
                isGameReset: null,
                isGameWon: false
            },
        })
    );
}

describe("useSettings", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    beforeEach(() => {
        setMockGameState()
    });

    afterEach(() => {
        vi.clearAllMocks();
    })

    test('useSettings hook should exist', () => {
        const hook = renderHook(() => useSettings());
        expect(hook).toBeDefined();
    });

    test('useSettings should return with: countdownTime, numberOfPairs, numberOfBadGuesses, handleSaveSettings', () => {
        const hook = renderHook(() => useSettings());

        expect(hook.result.current.countdownTime).toBe(initGameLogicSlice.countdownTime);
        expect(hook.result.current.numberOfPairs).toBe(initGameLogicSlice.numberOfPairs);
        expect(hook.result.current.numberOfBadGuesses).toBe(initGameLogicSlice.numberOfBadGuesses);

        expect(hook.result.current.handleSaveSettings).toBeDefined();
    });

    test('useSettings should dispatch saveSettings with the correct payload', () => {
        const hook = renderHook(() => useSettings());

        act(() => {
            hook.result.current.handleSaveSettings(newGameSettings.countdownTime, newGameSettings.numberOfPairs, newGameSettings.numberOfBadGuesses);
        });

        expect(saveSettings).toHaveBeenCalledWith({
            ...newGameSettings
        });

        expect(mockDispatch).toHaveBeenCalledWith({
            payload: {
                ...newGameSettings
            }
        })
    });

    test('Saving settings should not end the game if its running', () => {
        const hook = renderHook(() => useSettings());

        act(() => {
            hook.result.current.handleSaveSettings(newGameSettings.countdownTime, newGameSettings.numberOfPairs, newGameSettings.numberOfBadGuesses);
        });

        expect(mockHandleEndGame).not.toHaveBeenCalled();
    });
});
