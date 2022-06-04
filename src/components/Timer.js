export default function Timer(props) {
    return (
        <div className="timer">{props.min}m:{props.sec}s:{props.millisec}ms</div>
    )
}