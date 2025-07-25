import { createPortal } from "react-dom";
import type { ReactNodeProps } from "../types/types";

export const ModalBackdrop = ({ children }: ReactNodeProps) => {
    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) return null;

    return createPortal(
        <div className="modal-backdrop">
            {children}
        </div>,
        modalRoot
    );
};
