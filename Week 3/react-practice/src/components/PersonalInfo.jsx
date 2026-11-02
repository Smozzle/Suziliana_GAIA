function PersonalInfo() {
  const name = "Suzy";
  const favoriteLanguage = "JavaScript";

  const hobbies = [
    "Reading",
    "Running",
    "Designing"
  ];

  const currentDate = new Date().toLocaleString();

  return (
    <div>
      <h1>{name}</h1>

      <p>
        My favorite programming language is {favoriteLanguage}.
      </p>

      <h2>My Hobbies</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>

      <p>
        <strong>Current Date & Time:</strong> {currentDate}
      </p>

      <img
        src="https://images.unsplash.com/photo-1499750310107-5fef28a66643"
        alt="Workspace"
        width="300"
      />
    </div>
  );
}

export default PersonalInfo;