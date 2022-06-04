import React from "react"
import Die from "./Die"
import Count from "./Count"
import Timer from "./Timer"
import { nanoid } from "nanoid"

export default function Main() {

    const [dice, setDice] = React.useState(allNewDice)

    const [tenzies, setTenzies] = React.useState(false)

    const [count, setCount] = React.useState(0)

    const [gameTime, setGameTime] = React.useState({
        milliseconds: 0,
        seconds: 0,
        minutes: 0
    })

    const [gameStarted, setGameStarted] = React.useState(false)

    const [interv, setInterv] = React.useState()

    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won")
            setGameStarted(false)
        }
        gameHasStarted()
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
            timerReset()
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

    let ms = gameTime.milliseconds
    let sec = gameTime.seconds
    let min = gameTime.minutes

    const start = () => {
        console.log("start timer")
        run()
        setInterv(setInterval(run, 10))
    }

    const stop = () => {
        clearInterval(interv)
        console.log("stop function ran")
    }

    const run = () => {
        if (ms > 99) {
            sec++
            ms = 0
        }
        if (sec === 60) {
            min++
            sec = 0
        }
        ms++
        return setGameTime({ milliseconds: ms, seconds: sec, minutes: min })
    }

    function timerReset() {
        setGameTime({ milliseconds: 0, seconds: 0, minutes: 0 })
    }

    function gameHasStarted() {
        const someHeld = dice.some(die => die.isHeld)
        if (someHeld && count === 0) {
            setGameStarted(true)
            console.log("the game has begun")
        } else if (!someHeld && count > 0) {
            setGameStarted(true)
            console.log("the game has begun")
        }
    }

    React.useEffect(() => {
        if (gameStarted) {
            start()
            console.log(gameStarted)
        } else {
            stop()
        }
    }, [gameStarted])
    //  main part of the Main.js    //
    return (
        <section>
            <div className={tenzies ? "main winning" : "main"}>
                <Timer
                    min={gameTime.minutes >= 10 ? gameTime.minutes : "0" + gameTime.minutes}
                    sec={gameTime.seconds >= 10 ? gameTime.seconds : "0" + gameTime.seconds}
                    millisec={gameTime.milliseconds >= 10 ? gameTime.milliseconds + "0" : "0" + gameTime.milliseconds + "0"}
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