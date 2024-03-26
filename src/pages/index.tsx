import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import Link from "next/link";

interface Team {
  id: number;
  name: string;
  coach: string;
  players: Player[];
  tournament_id: number;
}

interface Player {
  id: number;
  name: string;
  age: number;
  team: string;
  team_id: number;
}
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
      <h1>Teams</h1>
      {teams.map((team: any) => (
        <div key={team.id}>
          <img src={team.logo} alt="team logo" />
          <h1>{team.name}</h1>
          <Link href={`team/${team.team_id}`}>Go to team page</Link>
          <br />
          Coach: <h3>{team.coach}</h3>
          {team.players.length > 0 && <p>Players:</p>}
          {team.players.map((player: any) => (
            <div key={player.id}>
              <h1>{player.name}</h1>
            </div>
          ))}
          {team.players.length === 0 && (
            <p>There's no players in this team yet...</p>
          )}
        </div>
      ))}
    </>
  );
}
