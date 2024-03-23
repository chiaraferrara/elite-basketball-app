import { useState } from "react";

export default function Team() {
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");

  const addTeamtoDB = async (event: any) => {
    event.preventDefault();

    if (!teamName || !coachName || !logoSrc) {
      console.log("Please fill all fields");
      return;
    }

    const response = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logo: logoSrc,
        name: teamName,
        coach: coachName,
        points: 0,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div>
        <h1>Add Team</h1>

        <form method="post" onSubmit={addTeamtoDB}>
          <div>
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={teamName}
              onChange={(event) => {
                setTeamName(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="coach">Coach:</label>
            <input
              type="text"
              id="coach"
              name="coach"
              value={coachName}
              onChange={(event) => setCoachName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="logo">Logo:</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={logoSrc}
              onChange={(event) => setLogoSrc(event.target.value)}
            />
          </div>
          <button type="submit">Add Team</button>
        </form>
      </div>
    </>
  );
}
