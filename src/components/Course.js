const Header = ({ name }) => {
    return <h3>{name}</h3>
}

const Total = ({ total }) => {
    return <b> Number of exercises {total}</b>
}

const Part = ({ part }) => {
    const { name, exercises } = part
    return (
        <p>
            <li>
                {name} - {exercises}
            </li>
        </p>

    )
}

const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => {
                return <Part key={part.id} part={part} />
            })}
        </div>
    )
}

const Course = ({ course }) => {
    const sum = course.parts.reduce((s, p) => s + p.exercises, 0)
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total total={sum} />
        </div>
    )
}

export default Course