import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { Team } from "../declarations/declarations";
import Link from "next/link";
import {
  Button,
  Input,
  PlayerName,
  PointsDetail,
  PreviewPic,
  Row,
  RowWrap,
  TeamWrapper,
  Wrapper,
} from "@/styles/globals";
import GamesList from "../components/GamesList";
import { Box, Modal, Typography } from "@mui/material";

export default function Team() {
  const { fetchTeam } = useContext(Context);
  const [team, setTeam] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { isLogged, setIsLogged } = useContext(Context);

  //una volta che aggiorno il team devo fare un fetch per aggiornare i dati
  const [update, setUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // new team fields

  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [coach, setCoach] = useState("");

  const router = useRouter();
  const { idTeam } = router.query;
  const teamId = Number(idTeam);

  //funzione che mi ritorna i dati del team
  const fetchDataFromAPI = async () => {
    try {
      const fetchedTeam = await fetchTeam(teamId);
      setTeam(fetchedTeam);
      setName(fetchedTeam[0].name);
      setCoach(fetchedTeam[0].coach);
      setLogo(fetchedTeam[0].logo);

      localStorage.setItem("team", JSON.stringify(fetchedTeam));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const loadTeamFromLocalStorage = () => {
    const lsTeam = localStorage.getItem("team");
    if (lsTeam) {
      const parsedTeam = JSON.parse(lsTeam);

      //se il team_id del team in local storage è uguale a quello passato nell'url ritorno il team
      //altrimenti ritorno null
      return parsedTeam?.[0]?.team_id === teamId ? parsedTeam : null;
    }
    return null;
  };

  const editTeam = async () => {
    try {
      const response = await fetch(`/api/team/${teamId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          logo: logo,
          coach: coach,
          team_id: teamId,
        }),
      });
      if (response.ok) {
        //l'update mi serve per fare il refresh dei dati
        setUpdate(!update);
        handleClose();
      } else {
        console.error("Didn't update team");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    // const data = await response.json();
    // console.log(data);
  };

  const onClickDelete = async () => {
    const response = await fetch(`/api/team/${teamId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setLoading(true);
      router.push("/teams");
    }
    const data = await response.json();
    console.log(data);
  };

  const deletePlayers = async (player_id: any) => {
    const response = await fetch(`/api/player/${player_id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      console.log("Players deleted");
    }
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const loadTeam = async () => {
      const lsTeam = loadTeamFromLocalStorage();
      if (lsTeam && !update) {
        setTeam(lsTeam);
        console.log(lsTeam);
        //se voglio modificare è più comodo avere i dati in uno stato già, quindi nell'input già ritrovo i dati (value = {name} ecc...)
        setName(lsTeam[0].name);
        setCoach(lsTeam[0].coach);
        setLogo(lsTeam[0].logo);
        setLoading(false);
      } else {
        await fetchDataFromAPI();
        setLoading(false);
      }
    };
    if (idTeam) {
      loadTeam();
    }
  }, [idTeam, update]); //ogni volta che modifico, devono rifare il fetch

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!team) {
    return <h1>Team not found</h1>;
  }

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

  return (
    <div>
      {/* to add check on login */}
      {/* <GamesList /> */}
      <Wrapper>
        {" "}
        <RowWrap>
          <TeamWrapper>
            <h1>{team?.[0]?.name}</h1>
            <PointsDetail>
              <div style={{ margin: "10px", textAlign: "center" }}>
                Total Points:
                <br />
                {team?.[0]?.total_points}
              </div>
              <div style={{ margin: "10px", textAlign: "center" }}>
                Points scored:
                <br />
                {team?.[0]?.points_scored}
              </div>

              <div style={{ margin: "10px", textAlign: "center" }}>
                Points Given:
                <br />
                {team?.[0]?.points_given}
              </div>
            </PointsDetail>
            {team?.[0]?.logo && (
              <PreviewPic src={team[0].logo} alt="team logo" />
            )}
            <p>
              Coach:
              <br /> {team?.[0]?.coach}
            </p>
            {team?.[0]?.players.length > 0 && (
              <div>
                <Row>
                  {team?.[0]?.players.map((player: any) => (
                    <div style={{ textAlign: "center" }} key={player.player_id}>
                      <PreviewPic src={player.picture} alt="player pic" />
                      <PlayerName>{player.name}</PlayerName>
                      <p>Age: {player.age}</p>
                    </div>
                  ))}
                </Row>
              </div>
            )}
          </TeamWrapper>
        </RowWrap>{" "}
        {isLogged ? (
          <>
            <Button onClick={handleOpen}>Edit Team</Button>
            <Button
              onClick={async () => {
                if (team && team[0] && team[0].players) {
                  //promise.all mi permette di fare un array di promise e aspettare che tutte le promise siano risolte
                  await Promise.all(
                    team[0].players.map(async (player: any) => {
                      await deletePlayers(player.player_id);
                    })
                  );
                  onClickDelete();
                }
              }}
            >
              Delete Team
            </Button>
          </>
        ) : (
          <></>
        )}
      </Wrapper>

      {/* update modal */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit the team
          </Typography>
          <hr />
          <form
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              editTeam();
              setName("");
              setCoach("");
              setLogo("");
            }}
          >
            <div>
              <legend>Team Name:</legend>
              <Input
                type="text"
                id="teamName"
                name="teamName"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div>
              <legend>Coach:</legend>
              <Input
                type="text"
                id="coach"
                name="coach"
                value={coach}
                onChange={(event) => {
                  setCoach(event.target.value);
                }}
              />
            </div>
            <div>
              <legend>Logo:</legend>
              <Input
                type="text"
                id="logo"
                name="logo"
                value={logo}
                onChange={(event) => {
                  setLogo(event.target.value);
                }}
              />
            </div>
            <Button type="submit">Edit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
