import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { CardForm } from "@/styles/globals";
import sadFace from "../assets/sad.svg";
import basketBall from "../assets/basketball.svg";
import {
  DateRow,
  GameWrapper,
  GamesRow,
  PageButton,
  PreviewPic,
  TeamGameColumn,
  TeamName,
} from "@/styles/globals";

export default function Games() {
  const [loading, setLoading] = useState(true);
  const { fetchGames } = useContext(Context);
  const { games, setGames } = useContext(Context);
  const { update } = useContext(Context);
  const { isLogged } = useContext(Context);
  const { updateLeaderboard, setUpdateLeaderboard } = useContext(Context);

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
    id_team1: any,
    id_team2: any,
    points_team1: any,
    points_team2: any,
    sum: boolean
  ) => {
    if (team_id == id_team1 && points_team1 > points_team2) {
      patchTeam(id_team1, points_team1, points_team2, 2, 1, sum);
    } else if (team_id == id_team2 && points_team2 > points_team1) {
      patchTeam(id_team2, points_team2, points_team1, 2, 1, sum);
    } else if (team_id == id_team1 && points_team1 < points_team2) {
      patchTeam(id_team1, points_team1, points_team2, 0, 1, sum);
    } else if (team_id == id_team2 && points_team2 < points_team1) {
      patchTeam(id_team2, points_team2, points_team1, 0, 1, sum);
    }
  };

  const onClickDelete = async (game_id: any) => {
    const response = await fetch(`/api/game/${game_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setLoading(true);
    }
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    fetchGames().then(() => setLoading(false));
    const recentGames = games.reverse().slice(0, 4);
    setGames(recentGames);
  }, [update, loading]);

  //metodo per formattare la data da "2024-03-13T23:00:00.000Z" a "13/03/2024"
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    //padStart serve per aggiungere uno 0 davanti ai numeri < 10
    const day = date.getDate().toString().padStart(2, "0");
    //i mesi partono da 0 quindi aggiungo 1
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const gamesToDisplay = games
    ? games.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
    : [];

  if (loading) return <GamesRow>Loading games...</GamesRow>;

  return (
    <>
      <h1 style={{ textAlign: "center" }}>League games</h1>

      {gamesToDisplay.length > 0 ? (
        <GamesRow>
          {gamesToDisplay?.map((game: any) => (
            <div key={game.id}>
              <DateRow>{formatDate(game.date)}</DateRow>
              <GameWrapper>
                <TeamGameColumn>
                  <span>
                    <PreviewPic src={game.home_team.logo} />
                  </span>
                  <TeamName>{game.home_team.name}</TeamName>
                  <p> {game.team1_points}</p>
                </TeamGameColumn>
                <br />
                <p>vs</p>{" "}
                <TeamGameColumn>
                  <span>
                    <PreviewPic src={game.away_team.logo} />
                  </span>
                  <TeamName>{game.away_team.name}</TeamName>
                  <p> {game.team2_points}</p>{" "}
                </TeamGameColumn>
              </GameWrapper>
              {isLogged ? (
                <PageButton
                  onClick={() => {
                    updateTeamPoints(
                      game.id_team1,
                      game.id_team1,
                      game.id_team2,
                      game.team1_points,
                      game.team2_points,
                      false
                    )
                      .then(() => {
                        updateTeamPoints(
                          game.id_team2,
                          game.id_team1,
                          game.id_team2,
                          game.team1_points,
                          game.team2_points,
                          false
                        );
                      })
                      .then(() => {
                        setUpdateLeaderboard(!updateLeaderboard);
                      });
                    onClickDelete(game.id_game);
                  }}
                  type="button"
                >
                  delete
                </PageButton>
              ) : (
                <></>
              )}
            </div>
          ))}
        </GamesRow>
      ) : (
        <>
          <CardForm>
            <div
              style={{
                display: "flex",
                flexFlow: "column",
                textAlign: "center",
              }}
            >
              <div>
                {" "}
                <img
                  style={{ width: "40px" }}
                  src={sadFace.src}
                  alt="sad face"
                />
                <img
                  style={{ width: "40px" }}
                  src={basketBall.src}
                  alt="basketball"
                />
              </div>
              <p>Unfortunately there&rsquo;s no game to display.</p>
            </div>
          </CardForm>
        </>
      )}
    </>
  );
}
