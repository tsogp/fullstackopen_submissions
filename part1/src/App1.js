import { useState } from 'react'

const Button = (props) => {
    return (
        <button onClick={props.handleClick}>
            {props.text}
        </button>
    )
}

const StatisticLine = (props) => {
    return (
        <>
            <tr>
                <td>
                    {props.text} {props.value}
                </td>
            </tr>
        </>
    )
}

const Statistics = (props) => {
    const sum = props.good + props.neutral + props.bad

    if (sum > 0) {
        return (
            <>
                <h2>statistics</h2>
                <table>
                    <tbody>
                        <StatisticLine text="good" value={props.good} />
                        <StatisticLine text="neutral" value={props.neutral} />
                        <StatisticLine text="bad" value={props.bad} />
                        <StatisticLine text="all" value={sum} />
                        <StatisticLine text="average" value={(props.good - props.bad) / sum} />
                        <StatisticLine text="positive" value={(props.good / sum) * 100 + ' %'} />
                    </tbody>
                </table>
               
            </>
        ) 
    } else {
        return (
            <>
                <h2>statistics</h2>
                No feedback provided
            </>
        )
    }
       
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const incValue = (setter, value) => {
        setter(value + 1)
    }
    
    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={() => incValue(setGood, good)} text="good" />
            <Button handleClick={() => incValue(setNeutral, neutral)} text="neutral" />
            <Button handleClick={() => incValue(setBad, bad)} text="bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    )
}

export default App