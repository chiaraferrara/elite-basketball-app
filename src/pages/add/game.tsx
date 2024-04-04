import { useContext, useEffect, useState } from "react";
import { Context } from "../../declarations/ContextProvider";
import {
  CardForm,
  Input,
  PageButton,
  Select,
  TeamGameColumn,
} from "@/styles/globals";
import { useRouter } from "next/router";

export default function Game() {
  const [teams, setTeams] = useState<any>([]);
  const [id_team1, setTeam_id1] = useState<any>(0);
  const [id_team2, setTeam_id2] = useState<any>(0);
  const [team1Points, setTeam1Points] = useState<any>(0);
  const [team2Points, setTeam2Points] = useState<any>(0);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const { setUpdate } = useContext(Context);
  const { setIsLogged, isLogged } = useContext(Context);
  const router = useRouter();

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
    played_games: number,
    sum: boolean
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
        sum: sum,
      }),
    });
    const data = await response.json();
  };

  const updateTeamPoints = async (
    team_id: any,
    points_team1: any,
    points_team2: any,
    sum: boolean
  ) => {
    if (team_id == id_team1 && points_team1 > points_team2) {
      patchTeam(team_id, points_team1, points_team2, 2, 1, sum);
    } else if (team_id == id_team2 && points_team2 > points_team1) {
      patchTeam(team_id, points_team2, points_team1, 2, 1, sum);
    } else if (team_id == id_team1 && points_team1 < points_team2) {
      patchTeam(team_id, points_team1, points_team2, 0, 1, sum);
    } else if (team_id == id_team2 && points_team2 < points_team1) {
      patchTeam(team_id, points_team2, points_team1, 0, 1, sum);
    }
  };

  const addGameToDB = async (event: any) => {
    event.preventDefault();
    if (
      id_team1 != id_team2 &&
      date != undefined &&
      team1Points != 0 &&
      team2Points != 0
    ) {
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
      alert("Select different teams or fill all the fields");
    }
    setUpdate(true);
  };

  useEffect(() => {
    getTeams();

    const logged = localStorage.getItem("isLogged");
    if (logged) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  });

  if (!isLogged) {
    return (
      <TeamGameColumn>
        <h1>Log in to add a game</h1>
      </TeamGameColumn>
    );
  }
  return (
    <>
      {/* <GamesList /> */}
      <TeamGameColumn>
        <h1>Add Game</h1>
        <CardForm
          style={{
            paddingInline: "9%",
            textAlign: "center",
            width: "fit-content",
          }}
        >
          {teams.length > 0 ? (
            <form
              method="post"
              onSubmit={async (event) => {
                addGameToDB(event);
                updateTeamPoints(id_team1, team1Points, team2Points, true).then(
                  () => {
                    setUpdate(true);
                    updateTeamPoints(id_team2, team1Points, team2Points, true);
                    setTeam1Points(0);
                    setTeam2Points(0);
                    setDate(undefined);
                  }
                );
              }}
            >
              <div>
                <h3>Home Team:</h3>

                <Select
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
                </Select>
              </div>
              <div>
                <h3>Away Team:</h3>

                <Select
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
                </Select>
              </div>
              <br />
              <div>
                <legend>Date:</legend>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={date ? date.toISOString().split("T")[0] : ""} // YYYY-MM-DDTHH:mm:ss.sssZ, dove "T" separa la data dalla parte dell'ora e "Z" rappresenta il fuso orario UTC.
                  onChange={(event) => {
                    const selectedDate = new Date(event.target.value);
                    setDate(selectedDate);
                  }}
                />
              </div>
              <br />
              <div>
                <legend>Add Home Team points :</legend>
                <Input
                  type="number"
                  id="homePoints"
                  name="homePoints"
                  value={team1Points}
                  onChange={(event) => {
                    setTeam1Points(event.target.value);
                  }}
                />

                <hr />

                <legend>Add Away Team points :</legend>
                <Input
                  type="number"
                  id="awayPoints"
                  name="awayPoints"
                  value={team2Points}
                  onChange={(event) => {
                    setTeam2Points(event.target.value);
                  }}
                />
              </div>
              <PageButton type="submit">Add Game</PageButton>
            </form>
          ) : (
            <>
              <div style={{ display: "flex", flexFlow: "column" }}>
                You can add a game once you have teams to associate with.
                <br />
                Add a team first.
                <PageButton
                  onClick={() => {
                    router.push("/add/team");
                  }}
                >
                  Add your team
                </PageButton>
              </div>
            </>
          )}
        </CardForm>
      </TeamGameColumn>
    </>
  );
}
