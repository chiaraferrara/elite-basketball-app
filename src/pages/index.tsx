import { useEffect, useState } from "react";

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

  const fetchPlayersAndTeams = async () => {
    try {
      const teamsRes = await fetch("/api/teams");
      const teamsData = await teamsRes.json();

      //devo inizializzare l'array players per ogni team

      const teamsWithPlayerArray = teamsData.map((team: any) => ({
        ...team,
        players: [],
      }));

      setTeams(teamsWithPlayerArray);

      const playerRes = await fetch("/api/players");
      const playerData = await playerRes.json();

      //questo mi serve per associare il nome della squadra al giocatore
      playerData.forEach((player: any) => {
        const foundTeam = teams.find(
          (team: any) => team.team_id === player.team_id
        );
        if (foundTeam) {
          player.team = foundTeam.name;
          foundTeam.players.push(player);
        }
      });

      setPlayers(playerData);

      //aggiungo i giocatori ai team

      teamsData.forEach((team: any) => {
        const foundPlayers = playerData.filter(
          (player: any) => player.team_id === team.team_id
        );
        if (foundPlayers) {
          team.players = foundPlayers;
          console.log("Trovati giocatori", foundPlayers);
        }
      });

      setTeams(teamsData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          fetchPlayersAndTeams();
        }}
      >
        Show Players and Teams
      </button>

      {players.map((player: any) => (
        <div key={player.id}>
          <h1>{player.name}</h1>
          <p>
            Team:
            <h3>{player.team_id}</h3>
            <h1>{player.team}</h1>
          </p>
        </div>
      ))}
      <hr />

      {teams.map((team: any) => (
        <div key={team.id}>
          <img src={team.logo} alt="team logo" />
          <h1>{team.name}</h1>
          Coach: <h3>{team.coach}</h3>
          <p>Players:</p>
          {team.players.map((player: any) => (
            <div key={player.id}>
              <h1>{player.name}</h1>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}
