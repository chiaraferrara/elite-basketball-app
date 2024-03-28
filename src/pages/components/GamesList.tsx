import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import {
  Button,
  DateRow,
  GameWrapper,
  GamesRow,
  PlayerName,
  PreviewPic,
  Row,
  TeamGameColumn,
  TeamName,
} from "@/styles/globals";
import { Typography } from "@mui/material";

export default function GamesList() {
  const [loading, setLoading] = useState(true);
  const { fetchGames } = useContext(Context);
  const { games, setGames } = useContext(Context);
  const { update } = useContext(Context);
  const { isLogged } = useContext(Context);

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

  if (loading) return <GamesRow>Loading games...</GamesRow>;
  return (
    <GamesRow>
      {games?.map((game: any) => (
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
            <Button
              onClick={() => {
                onClickDelete(game.id_game);
              }}
              type="button"
            >
              Delete
            </Button>
          ) : (
            <></>
          )}
        </div>
      ))}
    </GamesRow>
  );
}
