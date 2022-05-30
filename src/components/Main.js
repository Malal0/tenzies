import React from "react"
import Die from "./Die"
import { nanoid } from "nanoid"

export default function Main() {

    const [dice, setDice] = React.useState(allNewDice)

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            })
        }
        return newDice
    }

    function rollDice() {
        setDice(allNewDice())
    }

    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} />
    ))

    console.log(dice)

    return (
        <section>
            <div className="main">
                <h1 className="title">tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
                <div className="dieContainer">
                    {diceElements}
                </div>
                <button className="rollBtn" onClick={rollDice}>roll</button>
            </div>
        </section>
    )
}