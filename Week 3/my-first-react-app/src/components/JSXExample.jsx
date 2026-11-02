export default function JSXExamples() {
    const name = "React Developer"
    const isLearning = true
    const skills = ['JavaScript', 'React', 'CSS']

    return (
        <div> {/* Single parent element*/}
            {/* 1. Embedding JavaScript expressions */}
            <h1>Hello, {name}!</h1>

            {/* 2. Conditional rendering */}
            <p>{isLearning ? "Currently learning React" : "React expert"}</p>

            {/* 3. Using className instead of class */}
            <div className="skill-container"></div>
            <h3>Skills:</h3>
            {/* 4. Rendering lists */}
            <ul>
                {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                ))}
            </ul>


            {/* 5. Self-closing tags */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIz5uOudZkMABs9edvPsBmCY3P_pq_vA6md7VKo8Xdtg&shttps://thumb.wikimedia.org/wikipedia/commons/thumb/f/f1/Vitejs-logo.svg/1280px-Vitejs-logo.svg.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbna" alt="Vite logo" />
            <br />
            <hr />
        </div>

    )
}