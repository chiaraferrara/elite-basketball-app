import { useEffect, useState } from "react";

export default function Game() {
  const [teams, setTeams] = useState<any>([]);
  const [id_team1, setTeam_id1] = useState<any>(0);
  const [id_team2, setTeam_id2] = useState<any>(0);
  const [team1Points, setTeam1Points] = useState<any>(0);
  const [team2Points, setTeam2Points] = useState<any>(0);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const getTeams = async () => {
    const response = await fetch("/api/teams");
    const data = await response.json();
    setTeams(data);
  };

  const addGameToDB = async (event: any) => {
    event.preventDefault();

    const response = await fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_team1: id_team1,
        id_team2: id_team2,
        team1_points: team1Points,
        team2_points: team2Points,
      }),
    });

    const data = await response.json();
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      <div>
        <h1>Add Game</h1>

        <form
          method="post"
          onSubmit={(event) => {
            addGameToDB(event);
          }}
        >
          <div>
            <h3>Home Team:</h3>

            <select
              onChange={(event) => {
                setTeam_id1(event.target.value);
              }}
            >
              {teams.map((team: any) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h3>Away Team:</h3>

            <select
              onChange={(event) => {
                setTeam_id2(event.target.value);
              }}
            >
              {teams.map((team: any) => (
                <option key={team.team_id} value={team.team_id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={date ? date.toISOString().slice(0, 10) : ""}
              onChange={(event) => {
                const selectedDate = new Date(event.target.value);
                setDate(selectedDate);
                console.log(selectedDate);
              }}
            />
          </div>
          <div>
            <p>Add Home Team points :</p>
            <label>Points:</label>
            <input
              type="number"
              id="homePoints"
              name="homePoints"
              value={team1Points}
              onChange={(event) => {
                setTeam1Points(event.target.value);
              }}
            />

            <hr />

            <p>Add Away Team points :</p>
            <label>Points:</label>
            <input
              type="number"
              id="awayPoints"
              name="awayPoints"
              value={team2Points}
              onChange={(event) => {
                setTeam2Points(event.target.value);
              }}
            />
          </div>
          <button type="submit">Add Game</button>
        </form>
      </div>
    </>
  );
}
