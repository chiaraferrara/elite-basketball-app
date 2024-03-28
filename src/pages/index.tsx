import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import Link from "next/link";
import { Player, Team } from "./declarations/declarations";
import GamesList from "./components/GamesList";
import Leaderboard from "./components/Leaderboard";

export default function Home() {
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
      <GamesList />
      {/* <h1>Teams</h1> */}
      {/* {teams.map((team: any) => (
        <div key={team.id}>
          <img src={team.logo} alt="team logo" />
          <h1>{team.name}</h1>
          <Link href={`team/${team.team_id}`}>Go to team page</Link>
          <br />
        </div>
      ))} */}
      <Leaderboard />
    </>
  );
}
