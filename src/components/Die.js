export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <img src="./images/die1.png" alt={props.value} height="30px" />
        </div>
    )
}