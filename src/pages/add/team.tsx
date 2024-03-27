import { useState } from "react";

export default function Team() {
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [points_given, setPointsGiven] = useState(0);
  const [points_scored, setPointsScored] = useState(0);
  const [total_points, setTotalPoints] = useState(0);

  const addTeamtoDB = async (event: any) => {
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
        points_given: points_given,
        points_scored: points_scored,
        total_points: total_points,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <div>
        <h1>Add Team</h1>

        <form
          method="post"
          onSubmit={(event) => {
            event.preventDefault();
            addTeamtoDB(event);
          }}
        >
          <div>
            <label htmlFor="teamName">Team Name:</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={teamName}
              onChange={(event) => {
                setTeamName(event.target.value);
                console.log(teamName);
              }}
            />
          </div>
          <div>
            <label>Coach:</label>
            <input
              type="text"
              id="coach"
              name="coach"
              value={coachName}
              onChange={(event) => {
                setCoachName(event.target.value);
                console.log(coachName);
              }}
            />
          </div>
          <div>
            <label htmlFor="logo">Logo:</label>
            <input
              type="text"
              id="logo"
              name="logo"
              value={logoSrc}
              onChange={(event) => {
                setLogoSrc(event.target.value);
                console.log(logoSrc);
              }}
            />
          </div>
          <button type="submit">Add Team</button>
        </form>
      </div>
    </>
  );
}
