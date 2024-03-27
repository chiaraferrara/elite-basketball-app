import { ReactNode, createContext, useState } from "react";
import { Player, TContext, Team } from "./declarations";

export const Context = createContext<TContext>({
  players: [],
  setPlayers: () => {},
  teams: [],
  setTeams: () => {},
  fetchPlayersAndTeams: async () => ({ teams: [] }),
  fetchTeam: async () => ({}),
  isLogged: false,
  setIsLogged: () => {},
});

interface Props {
  children: ReactNode;
}

export default function ContextProvider({ children }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLogged, setIsLogged] = useState(false);

  //questo mi ritorna i team
  const fetchTeams = async () => {
    try {
      const teamsRes = await fetch("/api/teams");
      const teamsData = await teamsRes.json();
      return teamsData;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  //questo mi ritorna i giocatori
  const fetchPlayers = async () => {
    try {
      const playerRes = await fetch("/api/players");
      const playerData = await playerRes.json();
      return playerData;
    } catch (error) {
      console.error("Error", error);
      return [];
    }
  };

  const fetchPlayersAndTeams = async () => {
    try {
      const teamsData = await fetchTeams();
      //   console.log("Teams data", teamsData);
      const playerData = await fetchPlayers();

      //aggiungo ai team i giocatori associati a quel team_id
      teamsData.forEach((team: any) => {
        team.players = playerData.filter(
          (player: any) => player.team_id === team.id
        );
      });
      //   console.log("Teams data with players", teamsData);
      return { teams: teamsData };
    } catch (error) {
      console.error("Errore durante il recupero di giocatori e team:", error);
      return { teams: [] };
    }
  };

  //questo mi ritorna il team singolo con i giocatori associati
  const fetchTeam = async (id: number) => {
    try {
      const playerData = await fetchPlayers();
      const teamRes = await fetch(`/api/team/${id}`);
      const teamData = await teamRes.json();

      console.log("GIOCATORI", playerData);
      teamData[0].players = playerData.filter(
        (player: any) => player.team_id === id
      );
      // console.log("Questo è il teamData del Context", teamData);
      return teamData;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  };

  return (
    <Context.Provider
      value={{
        players,
        setPlayers,
        teams,
        setTeams,
        fetchPlayersAndTeams,
        fetchTeam,
        isLogged,
        setIsLogged,
      }}
    >
      {children}
    </Context.Provider>
  );
}
