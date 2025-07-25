import { faGear } from "@fortawesome/free-solid-svg-icons/faGear"
import { faRepeat } from "@fortawesome/free-solid-svg-icons/faRepeat"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState } from "react"
import type { SettingsForm } from "../../types/types"
import { SettingsModal } from "../SettingsModal"

type NavButtonProps = {
    onEndGame: () => void
} & SettingsForm

export const NavButtons = ({ onEndGame, ...settingsFormProps }: NavButtonProps) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const handleToggleSettings = () => {
        setIsSettingsOpen(prev => !prev);
    }

    return (
        <div className="nav-buttons">
            <div className="buttons-box">
                <FontAwesomeIcon icon={faGear}
                    onClick={handleToggleSettings}
                    aria-label="Open settings"
                    role="button"
                />
                <span className="divider"></span>
                <FontAwesomeIcon icon={faRepeat}
                    onClick={onEndGame}
                    aria-label="Repeat the game"
                    role="button"
                />

                <SettingsModal isSettingsOpen={isSettingsOpen}
                    onToggleSettings={handleToggleSettings}
                    {...settingsFormProps} />
            </div>
        </div>
    )
}

