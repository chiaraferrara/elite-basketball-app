import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import GamesList from "../components/GamesList";

export default function Game() {
  const [teams, setTeams] = useState<any>([]);
  const [id_team1, setTeam_id1] = useState<any>(0);
  const [id_team2, setTeam_id2] = useState<any>(0);
  const [team1Points, setTeam1Points] = useState<any>(0);
  const [team2Points, setTeam2Points] = useState<any>(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { setUpdate } = useContext(Context);
  const getTeams = async () => {
    const response = await fetch("/api/teams");
    const data = await response.json();
    setTeams(data);
  };

  const patchTeam = async (
    team_id: any,
    points_scored: number,
    points_given: number,
    total_points: number,
    played_games: number
  ) => {
    const response = await fetch(`/api/team/${team_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        points_scored: points_scored,
        points_given: points_given,
        total_points: total_points,
        played_games: played_games,
      }),
    });
    const data = await response.json();
  };

  const updateTeamPoints = async (
    team_id: any,
    points_team1: any,
    points_team2: any
  ) => {
    if (team_id == id_team1 && points_team1 > points_team2) {
      patchTeam(team_id, points_team1, points_team2, 2, 1);
    } else if (team_id == id_team2 && points_team2 > points_team1) {
      patchTeam(team_id, points_team2, points_team1, 2, 1);
    } else if (team_id == id_team1 && points_team1 < points_team2) {
      patchTeam(team_id, points_team1, points_team2, 0, 1);
    } else if (team_id == id_team2 && points_team2 < points_team1) {
      patchTeam(team_id, points_team2, points_team1, 0, 1);
    }
  };

  const addGameToDB = async (event: any) => {
    event.preventDefault();
    if (id_team1 != id_team2) {
      const response = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_team1: id_team1,
          id_team2: id_team2,
          date: date,
          team1_points: team1Points,
          team2_points: team2Points,
        }),
      });

      const data = await response.json();
    } else {
      alert("Select different teams");
    }
    setUpdate(true);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <>
      <GamesList />
      <div>
        <h1>Add Game</h1>

        <form
          method="post"
          onSubmit={async (event) => {
            addGameToDB(event);
            updateTeamPoints(id_team1, team1Points, team2Points).then(() => {
              updateTeamPoints(id_team2, team1Points, team2Points);
            });
          }}
        >
          <div>
            <h3>Home Team:</h3>

            <select
              onChange={(event) => {
                setTeam_id1(event.target.value);
              }}
            >
              <option>Select Home team</option>
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
              <option>Select away team</option>
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
              value={date ? date.toLocaleDateString() : ""}
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
