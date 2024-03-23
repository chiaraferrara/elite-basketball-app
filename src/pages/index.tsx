import { useEffect, useState } from "react";

interface Team {
  id: number;
  name: string;
  coach: string;
  tournament_id: number;
}

interface Player {
  id: number;
  name: string;
  age: number;
  team_id: number;
}
export default function Home() {
  // const [result, setResult] = useState<any>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  const showPlayers = async () => {
    const response = await fetch("/api/players");
    const data = await response.json();
    setPlayers(data);

  };

  const findTeam = async (team_id: number) => {
    const response = await fetch(`/api/teams/${team_id}`);
    const data = await response.json();
    return data;
  }

  
  const showTeams = async () => {
    const response = await fetch("/api/teams");
    const data = await response.json();
    setTeams(data);
  };

  useEffect(() => {}, []);

  return (
    <>
      <button
        onClick={() => {
          showPlayers();
        }}
      >
        Show Players
      </button>

      {players.map((team: any) => (
        <div key={team.id}>
          <h1>{team.name}</h1>
          <h3>{team.coach}</h3>
          <p>Team: 
            <h3>{team.team_id}</h3>
          </p>
        </div>
      ))}

      <button
        onClick={() => {
          showTeams();
        }}
      >
        Show Teams
      </button>

      {teams.map((team: any) => (
        <div key={team.id}>
          <h1>{team.name}</h1>
          Coach: <h3>{team.coach}</h3>
        </div>
      ))}
    </>
  );
}
