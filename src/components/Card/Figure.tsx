import { useRef, useLayoutEffect } from "react"

type FigureProps = {
    imgUrl: string
    isFlipped: boolean
    isGameReset: boolean | null
}
export const Figure = ({ imgUrl, isFlipped, isGameReset }: FigureProps) => {
    const isInitialLoad = useRef<boolean>(true);
    const figureRef = useRef<HTMLDivElement | null>(null)

    const timeoutId = useRef<number>(0);

    useLayoutEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false;
            return;
        }

        if (!figureRef.current) return;


        if (isFlipped) {
            figureRef.current.classList.add('show');
            figureRef.current.classList.remove('hide');
        } else {
            timeoutId.current = setTimeout(() => {
                if (!figureRef.current) return;
                figureRef.current.classList.remove('show');
                figureRef.current.classList.add('hide');
            }, 400);
        }

        return () => clearTimeout(timeoutId.current)
    }, [isFlipped]);

    useLayoutEffect(() => {
        if (!figureRef.current) return;

        figureRef.current.classList.remove('show');
        figureRef.current.classList.add('hide');
    }, [isGameReset])

    return (
        <div ref={figureRef}
            className="figure"
        >
            <img src={imgUrl} alt="Figure image" className="figure-img" />
        </div>
    )
}