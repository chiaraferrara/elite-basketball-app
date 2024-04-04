import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import {
  CardForm,
  Input,
  Page,
  PageButton,
  PreviewPic,
  Row,
  RowWrap,
} from "@/styles/globals";

import sadFace from "../assets/sad.svg";
import basketBall from "../assets/basketball.svg";
import { Box, Modal, Typography } from "@mui/material";

export default function PlayersPage() {
  const { fetchPlayers, players, setPlayers } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const { isLogged, setIsLogged } = useContext(Context);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [updatePlayers, setUpdatePlayers] = useState(false);

  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [picture, setPicture] = useState("");
  const [playerId, setPlayerId] = useState(0);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const editPlayer = async (player_id: Number) => {
    if (name === "" || age <= 18 || picture === "") {
      handleClose();
      return alert("Please fill all the fields or insert correct values.");
    }
    try {
      const response = await fetch(`/api/player/${playerId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          picture: picture,
          age: age,
          player_id: playerId,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        //l'update mi serve per fare il refresh dei dati
        setUpdatePlayers(!updatePlayers);
        handleClose();
      } else {
        console.error("Didn't update player");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, [loading, updatePlayers]);

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
                    <PageButton
                      onClick={() => {
                        handleOpen();
                        setName(player.name);
                        setAge(player.age);
                        setPicture(player.picture);
                        setPlayerId(player.player_id);
                      }}
                    >
                      edit
                    </PageButton>
                  </>
                )}
              </div>
            ))}
          </Row>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <form
                method="post"
                onSubmit={(event) => {
                  event.preventDefault();
                  editPlayer(playerId);
                  setName("");
                  setPicture("");
                  setAge(0);
                }}
              >
                <legend>Name</legend>
                <Input value={name} onChange={(e) => setName(e.target.value)} />

                <legend>Age</legend>
                <Input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                />
                <legend>Picture</legend>
                <Input
                  value={picture}
                  onChange={(e) => setPicture(e.target.value)}
                />
                <br />
                <PageButton type="submit">Edit</PageButton>
              </form>
            </Box>
          </Modal>
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
