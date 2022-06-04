import React from "react"
import Die from "./Die"
import Count from "./Count"
import Timer from "./Timer"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function Main() {

    const [dice, setDice] = React.useState(allNewDice)

    const [tenzies, setTenzies] = React.useState(false)

    const [count, setCount] = React.useState(0)

    const [gameTime, setGameTime] = React.useState({
        milliseconds: 0,
        seconds: 0,
        minutes: 0
    })

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won")

            stopTimer()
            console.log("stopped")
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice

    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    generateNewDie()
            }))
            countIncrease()
        } else {
            setTenzies(false)
            countReset()
            setDice(allNewDice())
        }
    }

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }

    function countIncrease() {
        setCount(prevCount => prevCount + 1)
    }

    function countReset() {
        setCount(prevCount => prevCount = 0)
    }

    let ms = 0
    let sec = 0
    let min = 0

    function recordTime() {
        setInterval(() => {
            ms += 250
            setGameTime(prevTime => ({
                ...prevTime,
                milliseconds: ms
            }))

            if (ms >= 1000) {
                ms = 0
                sec++
                setGameTime(prevTime => ({
                    ...prevTime,
                    seconds: sec,
                }))
            }
            if (sec >= 60) {
                sec = 0
                min++
                setGameTime(prevTime => ({
                    ...prevTime,
                    minutes: min,
                }))
            }
        }, 250)
    }

    React.useEffect(() => {
        const someHeld = dice.some(die => die.isHeld)
        const allHeld = dice.every(die => die.isHeld)

        if (tenzies === false && count === 0 && !someHeld) {
            ms = 0
            setGameTime(prevTime => ({
                minutes: 0,
                seconds: 0,
                milliseconds: 0
            }))
            console.log("reseted")
        } else if (someHeld || count > 0) {
            recordTime()
        }
    }, [dice])

    function stopTimer() {
        clearInterval(recordTime())
    }

    return (
        <section>
            <div className="main">
                {tenzies && <Confetti />}
                <Timer
                    min={gameTime.minutes >= 10 ? gameTime.minutes : "0" + gameTime.minutes}
                    sec={gameTime.seconds >= 10 ? gameTime.seconds : "0" + gameTime.seconds}
                    millisec={gameTime.milliseconds >= 10 ? gameTime.milliseconds : "0" + gameTime.milliseconds}
                />
                <Count count={count} />
                <h1 className="title">tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
                <div className="dieContainer">
                    {diceElements}
                </div>
                <button className="rollBtn" onClick={rollDice}>{tenzies ? "new game" : "roll"}</button>
            </div>
        </section>
    )
}