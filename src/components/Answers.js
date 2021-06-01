import Answer from './Answer';


export default function Answers(props) {
    const {answers} = props;
    return(
            answers && answers.map((answer, idx) => (
                <Answer key={idx.toString()} answer={answer} />
            ))
    )
}