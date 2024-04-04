import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import {
  CardForm,
  PageButton,
  PreviewPic,
  Row,
  RowWrap,
} from "@/styles/globals";

import sadFace from "../assets/sad.svg";
import basketBall from "../assets/basketball.svg";

export default function PlayersPage() {
  const { fetchPlayers, players, setPlayers } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const { isLogged, setIsLogged } = useContext(Context);

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
      <h1 style={{ textAlign: "center" }}>Players</h1>
      {players.length > 0 ? (
        <>
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

                {isLogged && (
                  <>
                    <PageButton
                      onClick={() => {
                        onClickDelete(player.player_id).then(() => {
                          setLoading(!loading);
                        });
                      }}
                    >
                      delete
                    </PageButton>
                  </>
                )}
              </div>
            ))}
          </Row>
        </>
      ) : (
        <>
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
                <p>Unfortunately there's no players to display.</p>
              </div>
            </CardForm>
          </>
        </>
      )}
    </div>
  );
}
