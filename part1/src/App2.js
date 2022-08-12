import {useState} from 'react'

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Button = (props) => {
    return (
        <>
            <button onClick={props.handleClick}>
                {props.text}
            </button>
        </>
    )
}

const App2 = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
    ]

    const [selected, setSelected] = useState(0)
    const guessAnecdote = () => {
        setSelected(getRandomInt(0, 6))
    }

    const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
    const incPoints = (pos) => {
        const data = [...points]
        data[pos] += 1
        setPoints(data)
    }

    return (
        <div>
            <h1>Anectode of the day</h1>
            {anecdotes[selected]} <br></br>
            has {points[selected]} votes <br></br>
            <Button handleClick={() => incPoints(selected)} text="vote" />
            <Button handleClick={() => guessAnecdote()} text="next anecdote" />

            <h1>Anecdote with most views</h1>
            {anecdotes[points.indexOf(Math.max(...points))]} <br></br>
            has {Math.max(...points)} points
        </div>
    )
}

export default App2