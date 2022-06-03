import Image from "./Images"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    return (
        <div className="die" style={styles} onClick={props.holdDice}>
            <Image name={props.value} number={props.value} />
        </div>
    )
}