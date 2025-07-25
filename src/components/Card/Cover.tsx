import { CoverImg } from "./CoverImg"

type CoverProps = {
    id: number
    onFlip: (id: number) => void
}

export const Cover = ({ id, onFlip }: CoverProps) => {

    return (
        <div className="cover"
            onClick={() => onFlip(id)}
        >
            <CoverImg />
        </div>
    )
}