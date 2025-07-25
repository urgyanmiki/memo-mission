import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { SettingsForm, InputRefActions } from "../types/types"
import { InputGroup } from "./InputGroup"
import { ModalBackdrop } from "./ModalBackdrop"
import { useRef, type FormEvent } from "react"

type SettingsModalProps = {
    isSettingsOpen: boolean
    onToggleSettings: () => void
} & SettingsForm

export const SettingsModal = ({
    isSettingsOpen,
    onToggleSettings,

    countdownTime,
    numberOfBadGuesses,
    numberOfPairs,
    onSaveSettings,
}: SettingsModalProps) => {
    const countdownRef = useRef<InputRefActions>(null);
    const badGuessesRef = useRef<InputRefActions>(null);
    const pairsRef = useRef<InputRefActions>(null);

    if (!isSettingsOpen) return;

    const handleSubmitForm = (e: FormEvent) => {
        e.preventDefault();

        const countdownTime = countdownRef.current?.getValidatedInputVal();
        const numberOfBadGuesses = badGuessesRef.current?.getValidatedInputVal();
        const numberOfPairs = pairsRef.current?.getValidatedInputVal();

        if (!countdownTime || !numberOfPairs || !numberOfBadGuesses) return;

        onSaveSettings(countdownTime, numberOfPairs, numberOfBadGuesses);
        onToggleSettings();
    }

    return (
        <ModalBackdrop>
            <div className="modal settings-modal">
                <div className="modal-header">
                    Game settings
                    <FontAwesomeIcon icon={faXmark}
                        className="close"
                        onClick={onToggleSettings}
                    />
                </div>
                <div className="modal-body">
                    <form onSubmit={(e: FormEvent) => handleSubmitForm(e)}>
                        <InputGroup name="pairs"
                            label="Number of pair of cards"
                            ref={pairsRef}
                            defaultValue={numberOfPairs}
                        />
                        <InputGroup name="countdown"
                            label="Countdown time (sec.)"
                            defaultValue={countdownTime}
                            ref={countdownRef}
                        />
                        <InputGroup name="badGuesses"
                            label="Number of Bad Guess"
                            defaultValue={numberOfBadGuesses}
                            ref={badGuessesRef}
                        />
                        <button className="btn btn-main color-primary w-100">
                            Save Settings
                        </button>
                    </form>
                </div>
            </div>
        </ModalBackdrop>
    )
}