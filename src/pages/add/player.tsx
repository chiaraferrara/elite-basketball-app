import {
  Button,
  CardForm,
  Input,
  PageButton,
  Select,
  TeamGameColumn,
} from "@/styles/globals";
import { Typography } from "@mui/material";
import { use, useEffect, useState } from "react";

export default function Player() {
  const [playerName, setPlayerName] = useState("");
  const [age, setAge] = useState("");
  const [picSrc, setPicSrc] = useState("");
  const [team_id, setTeam_id] = useState("");
  const [teams, setTeams] = useState<any>([]);

  const getTeams = async () => {
    const response = await fetch("/api/teams");
    const data = await response.json();
    setTeams(data);
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
      console.log(data);
    }
  };

  useEffect(() => {
    getTeams();
  }, []);

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
            <form
              method="post"
              onSubmit={(event) => {
                addPlayerToDB(event);
                setTeam_id("");
                setAge("");
                setPlayerName("");
                setPicSrc("");
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
                  {teams.map((team: any) => (
                    <option key={team.team_id} value={team.team_id}>
                      {team.name}
                    </option>
                  ))}
                </Select>
              </div>
              <PageButton type="submit">Add Player</PageButton>
            </form>
          </CardForm>
        </TeamGameColumn>
      </div>
    </>
  );
}
