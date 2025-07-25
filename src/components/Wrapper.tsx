import type { ReactNodeProps } from "../types/types"

export const Wrapper = ({ children }: ReactNodeProps) => {
    return (
        <main className="wrapper">
            {children}
        </main>
    )
}