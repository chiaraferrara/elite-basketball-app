import Link from "next/link";
import { Player, Team } from "./declarations/declarations";
import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import { CardForm, TeamDiv, TeamImg, TeamRow } from "@/styles/globals";
import sadFace from "../assets/sad.svg";
import basketBall from "../assets/basketball.svg";

export default function Teams() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const { fetchPlayersAndTeams } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTeam = await fetchPlayersAndTeams();
      setTeams(fetchedTeam.teams);
    };

    fetchData();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Teams</h1>
      {teams.length > 0 ? (
        <TeamRow>
          {teams.map((team: any) => (
            <TeamDiv key={team.id}>
              <Link href={`team/${team.team_id}`}>
                <TeamImg src={team.logo} alt="team logo" />
              </Link>

              <Link href={`team/${team.team_id}`}>
                <h1>{team.name}</h1>
              </Link>
              <br />
            </TeamDiv>
          ))}
        </TeamRow>
      ) : (
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
              <img style={{ width: "40px" }} src={sadFace.src} alt="sad face" />
              <img
                style={{ width: "40px" }}
                src={basketBall.src}
                alt="basketball"
              />
            </div>
            <p>Unfortunately there&rsquo;s no teams to display.</p>
          </div>
        </CardForm>
      )}
    </>
  );
}
