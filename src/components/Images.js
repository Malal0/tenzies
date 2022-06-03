import die1 from './images/die1.png'
import die2 from './images/die2.png'
import die3 from './images/die3.png'
import die4 from './images/die4.png'
import die5 from './images/die5.png'
import die6 from './images/die6.png'

export default function image(props) {

    let thisOne;

    if (props.number === 1) {
        thisOne = die1
    } else if (props.number === 2) {
        thisOne = die2
    } else if (props.number === 3) {
        thisOne = die3
    } else if (props.number === 4) {
        thisOne = die4
    } else if (props.number === 5) {
        thisOne = die5
    } else if (props.number === 6) {
        thisOne = die6
    } else {
        return
    }

    return (
        <>
            <img src={thisOne} alt={props.name} />
        </>
    )
}