import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import { PageButton, PreviewPic, Row, RowWrap } from "@/styles/globals";
import { loadBindings } from "next/dist/build/swc";

export default function PlayersPage() {
  const { fetchPlayers, players, setPlayers } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlayers();
  }, [loading]);

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
      <Row
        style={{
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        {players.map((player) => (
          <div key={player.player_id}>
            <PreviewPic src={player.picture} alt="player pic" />
            <h2>{player.name}</h2>
            <p>Age : {player.age}</p>
            <PageButton
              onClick={() => {
                onClickDelete(player.player_id).then(() => {
                  setLoading(!loading);
                });
              }}
            >
              delete
            </PageButton>
          </div>
        ))}
      </Row>
    </div>
  );
}
