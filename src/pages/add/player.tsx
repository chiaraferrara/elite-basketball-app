import { Team } from "@/declarations";
import { use, useEffect, useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState("");
  const [age, setAge] = useState("");
  const [picSrc, setPicSrc] = useState("");
  const [team_id, setTeam_id] = useState("");
  const [teams, setTeams] = useState<any>([]);

  const getTeams = async () => {
    const response = await fetch("/api/teams");
    const data = await response.json();
    setTeams(data);
  };

  const addPlayerToDB = async (event: any) => {
    event.preventDefault();

    if (!playerName || !age || !picSrc) {
      console.log("Please fill all fields");
      return;
    }

    const response = await fetch("/api/players", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        picture: picSrc,
        name: playerName,
        age: age,
        team_id: team_id,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      <div>
        <h1>Add Player</h1>

        <form
          method="post"
          onSubmit={(event) => {
            addPlayerToDB(event);
            setTeam_id("");
            setAge("");
            setPlayerName("");
            setPicSrc("");
          }}
        >
          <div>
            <label htmlFor="teamName">Player Name:</label>
            <input
              type="text"
              id="playerName"
              name="playerName"
              value={playerName}
              onChange={(event) => {
                setPlayerName(event.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="coach">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>
          <div>
            <label>Photo:</label>
            <input
              type="text"
              id="picSrc"
              name="picSrc"
              value={picSrc}
              onChange={(event) => setPicSrc(event.target.value)}
            />
          </div>
          <div>
            <select
              onChange={(event) => {
                setTeam_id(event.target.value);
              }}
            >
              {teams.map((team: any) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit">Add Player</button>
        </form>
      </div>
    </>
  );
}
