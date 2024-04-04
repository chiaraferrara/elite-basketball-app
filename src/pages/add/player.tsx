import {
  Button,
  CardForm,
  Input,
  PageButton,
  Select,
  TeamGameColumn,
} from "@/styles/globals";
import { Typography } from "@mui/material";
import { use, useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { useRouter } from "next/router";

export default function Player() {
  const [playerName, setPlayerName] = useState("");
  const [age, setAge] = useState("");
  const [picSrc, setPicSrc] = useState("");
  const [team_id, setTeam_id] = useState("");
  const [teams, setTeams] = useState<any>([]);

  const router = useRouter();

  const { setIsLogged, isLogged } = useContext(Context);
  const { update, setUpdate } = useContext(Context);

  const getTeams = async () => {
    try {
      const response = await fetch("/api/teams");
      if (!response.ok) {
        throw new Error("Failed to fetch teams");
      }
      const data = await response.json();
      setTeams(data);
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const addPlayerToDB = async (event: any) => {
    event.preventDefault();

    if (!playerName || !age || !picSrc || !team_id) {
      alert("Please fill all fields");
      return;
    } else if (isNaN(parseInt(age))) {
      alert("Age must be a number");
      return;
    } else {
      const response = await fetch("/api/players", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          picture: picSrc,
          name: playerName,
          age: age,
          team_id: team_id,
        }),
      });

      const data = await response.json();
      localStorage.removeItem("team");
      console.log(data);
    }
  };

  useEffect(() => {
    getTeams();
    const logged = localStorage.getItem("isLogged");
    if (logged) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  //controllo sul login

  if (!isLogged) {
    return (
      <TeamGameColumn>
        <h1>Log in to add a player</h1>
      </TeamGameColumn>
    );
  }

  return (
    <>
      <div>
        <TeamGameColumn>
          <h1>Add a Player</h1>
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
                onSubmit={(event) => {
                  addPlayerToDB(event);
                  setTeam_id("");
                  setAge("");
                  setPlayerName("");
                  setPicSrc("");
                  router.push(`/team/${team_id}`);
                }}
              >
                <div>
                  <legend>Player Name:</legend>
                  <Input
                    style={{
                      marginBottom: "20px",
                    }}
                    type="text"
                    placeholder="Player Name*"
                    id="playerName"
                    name="playerName"
                    value={playerName}
                    onChange={(event) => {
                      setPlayerName(event.target.value);
                      console.log(playerName);
                    }}
                  />
                </div>
                <div>
                  <legend>Age:</legend>
                  <Input
                    style={{
                      marginBottom: "20px",
                    }}
                    type="number"
                    placeholder="Age*"
                    id="age"
                    name="age"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                  />
                </div>
                <div>
                  <legend>Photo:</legend>
                  <Input
                    style={{
                      marginBottom: "20px",
                    }}
                    type="text"
                    placeholder="Photo URL*"
                    id="picSrc"
                    name="picSrc"
                    value={picSrc}
                    onChange={(event) => setPicSrc(event.target.value)}
                  />
                </div>
                <div>
                  <Select
                    onChange={(event) => {
                      setTeam_id(event.target.value);
                    }}
                  >
                    <option>Select Team*</option>
                    {teams?.map(
                      (
                        team: any // Remove unnecessary logical operator '&&'
                      ) => (
                        <option key={team.team_id} value={team.team_id}>
                          {team.name}
                        </option>
                      )
                    )}
                  </Select>
                </div>
                <PageButton type="submit">Add Player</PageButton>
              </form>
            ) : (
              <>
                <div style={{ display: "flex", flexFlow: "column" }}>
                  You can add a player once you have teams to associate with.
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
      </div>
    </>
  );
}
