import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import {
  DateRow,
  GameWrapper,
  GamesRow,
  PlayerName,
  PreviewPic,
  Row,
  TeamGameColumn,
  TeamName,
} from "@/styles/globals";

export default function GamesList() {
  const { fetchGames } = useContext(Context);
  const { games } = useContext(Context);

  useEffect(() => {
    fetchGames();
    console.log(games);
  }, []);
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
        </div>
      ))}
    </GamesRow>
  );
}
