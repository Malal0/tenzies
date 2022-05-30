export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDice}>{props.value}</div>
        /*<div className="die active">1</div>*/
    )
}