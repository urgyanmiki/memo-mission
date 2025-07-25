import React, { forwardRef, useImperativeHandle, useRef } from "react"
import type { InputRefActions } from "../types/types"

type InputGroupProps = {
    label: string
    name: string
    defaultValue: number
    ref: React.RefObject<HTMLInputElement>
}

export const InputGroup = forwardRef<InputRefActions, InputGroupProps>(({ label, name, ...inputProps }, ref) => {
    const inputElRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        getValidatedInputVal: () => {
            const el = inputElRef.current;

            if (el && +el.value > 0) {
                el.className = 'default-input sm text-center';
                return +el.value;
            } else {
                el!.className = 'default-input sm text-center invalid';
                return false;
            }
        },
    }));

    return (
        <div className="input-group mb-3">
            <label htmlFor={name}>
                {label}
            </label>
            <input type="number"
                className="default-input sm text-center"
                ref={inputElRef}
                id={name}
                name={name}
                {...inputProps}
            />
        </div>
    )
})