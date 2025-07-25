import type React from "react"

type CounterProps = {
    //getTimeLeft: () => number
    matches: number
    mistakes: number
    countdownTime: number
    counterRef: React.Ref<HTMLHeadingElement>
}

export const Counter = ({ matches, mistakes, countdownTime, counterRef }: CounterProps) => {
    return (
        <div className="counter">
            <div className="counter-box">
                <h1 className="time-left" ref={counterRef}>
                    {countdownTime}
                </h1>
                <div className="statistics">
                    <p>
                        {matches} matches
                    </p>
                    <p>
                        {mistakes} mistakes
                    </p>
                </div>
            </div>
        </div>
    )
}