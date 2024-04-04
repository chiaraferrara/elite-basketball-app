import { useContext, useEffect } from "react";
import { Context } from "./declarations/ContextProvider";
import { PreviewPic } from "@/styles/globals";

export default function PlayersPage() {
  const { fetchPlayers, players, setPlayers } = useContext(Context);
  useEffect(() => {
    fetchPlayers();
  }, []);

  const onClickDelete = async (player_id: any) => {
    const response = await fetch(`/api/player/${player_id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <h1>Players</h1>

      {players.map((player) => (
        <div key={player.player_id}>
          <button
            onClick={() => {
              onClickDelete(player.player_id);
            }}
          >
            delete
          </button>
          <PreviewPic src={player.picture} alt="player pic" />
          <h2>{player.name}</h2>
          <p>{player.age}</p>
          <p>{player.team_id}</p>
        </div>
      ))}
    </div>
  );
}
