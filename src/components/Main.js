export default function Main() {
    return (
        <section>
            <div className="main">
                <h1 className="title">tenzies</h1>
                <p className="instructions">Roll until all dice are the same. Click each die to freeze it at it's current value between rolls.</p>
                <div className="dieContainer">
                    <div className="die active">1</div>
                    <div className="die">2</div>
                    <div className="die active">1</div>
                    <div className="die">4</div>
                    <div className="die">5</div>
                    <div className="die">3</div>
                    <div className="die">3</div>
                    <div className="die">5</div>
                    <div className="die">6</div>
                    <div className="die active">1</div>
                </div>
                <button className="rollBtn">roll</button>
            </div>
        </section>
    )
}