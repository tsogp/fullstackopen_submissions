import React from 'react'

const CourseLine = ({ course }) => {
    return (
        <li>{course.name} {course.exercises}</li>
    )
}

const Course = ({ course }) => {
    const sum = course.parts.reduce((s, part) => {
        return s + part.exercises
    }, 0)

    return (
        <>
            <h1>{course.name}</h1>
            <ul>
                {course.parts.map(c => 
                    <CourseLine key={c.id} course={c} />
                )}
            </ul>
            <h3>total of {sum} exercises</h3>
        </>
    )
}

export default Course