import Link from "next/link";
import { Player, Team } from "../declarations/declarations";
import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import {
  BlackScreen,
  LinkInfo,
  LoadingIcon,
  PreviewPic,
  TeamDiv,
  TeamImg,
  TeamRow,
} from "@/styles/globals";
import loadingGif from "../assets/loading.gif";
import { Card } from "@mui/material";

export default function Teams() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const { fetchPlayersAndTeams } = useContext(Context);

  useEffect(() => {
    setTimeout(() => {
      const fetchData = async () => {
        const fetchedTeam = await fetchPlayersAndTeams();
        setTeams(fetchedTeam.teams);
      };
      fetchData();
    }, 500);
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Teams</h1>
      {teams.length > 0 ? (
        <TeamRow>
          {teams.map((team: any) => (
            <Card
              style={{
                padding: "6px",
                marginTop: "40px",
                marginBottom: "30px",
                marginInline: "10px",
                boxShadow: "0px -12px 0px 0.3px #ff3b3b",
                borderRadius: "0px",
                minWidth: "250px",
                textAlign: "center",
              }}
              key={team.id}
            >
              <Link href={`team/${team.team_id}`}>
                <PreviewPic src={team.logo} alt="team logo" />
              </Link>

              <h1>{team.name}</h1>
              <LinkInfo href={`/team/${team.team_id}`}>
                Go to teams info
              </LinkInfo>
              <br />
            </Card>
          ))}
        </TeamRow>
      ) : (
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            textAlign: "center",
          }}
        >
          <BlackScreen>
            <LoadingIcon src={loadingGif.src} alt="loading" />
          </BlackScreen>
        </div>
      )}
    </>
  );
}
