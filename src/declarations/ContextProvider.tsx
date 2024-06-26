import React, { ReactNode, createContext, useState } from "react";
import { Player, TContext, Team } from "./declarations";

export const Context = createContext<TContext>({
  players: [],
  setPlayers: () => {},
  teams: [],
  fetchPlayers: async () => [],
  fetchPlayersAndTeams: async () => ({ teams: [] }),
  fetchTeam: async () => ({}),
  isLogged: false,
  setIsLogged: () => {},
  fetchGames: async () => [],
  games: [],
  setGames: () => {},
  update: false,
  setUpdate: () => {},
  updateLeaderboard: false,
  setUpdateLeaderboard: () => {},
  associateGamesToTeam: async () => [],
});

interface Props {
  children: ReactNode;
}

export default function ContextProvider({ children }: Props) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLogged, setIsLogged] = useState(false);
  const [games, setGames] = useState<any[]>([]);
  const [update, setUpdate] = useState(false); //per fare il refresh dei games
  const [updateLeaderboard, setUpdateLeaderboard] = useState(false);

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
      setPlayers(playerData);
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

      // console.log("GIOCATORI", playerData);
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

  const fetchGames = async () => {
    try {
      const gamesRes = await fetch("/api/games");
      const gamesData = await gamesRes.json();

      const teamsRes = await fetch("/api/teams");
      const teamsData = await teamsRes.json();

      const gamesWithTeams = gamesData.map((game: any) => {
        const homeTeam = teamsData.find(
          (team: any) => team.team_id === game.id_team1
        );
        const awayTeam = teamsData.find(
          (team: any) => team.team_id === game.id_team2
        );

        return {
          ...game,
          home_team: homeTeam,
          away_team: awayTeam,
        };
      });

      setGames(gamesWithTeams);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const associateGamesToTeam = async (teamId: number) => {
    try {
      const gamesRes = await fetch("/api/games");
      const gamesData = await gamesRes.json();

      const teamsRes = await fetch("/api/teams");
      const teamsData = await teamsRes.json();

      const gamesWithTeams = gamesData.map((game: any) => {
        const homeTeam = teamsData.find(
          (team: any) => team.team_id === game.id_team1
        );
        const awayTeam = teamsData.find(
          (team: any) => team.team_id === game.id_team2
        );

        return {
          ...game,
          home_team: homeTeam,
          away_team: awayTeam,
        };
      });

      const teamGames = gamesWithTeams.filter(
        (game: any) => game.id_team1 === teamId || game.id_team2 === teamId
      );

      return teamGames;
    } catch (error) {
      console.error("Error fetching games:", error);
      return [];
    }
  };

  const checkIsLogged = async () => {
    const logged = localStorage.getItem("isLogged");
    if (logged) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  };

  return (
    <Context.Provider
      value={{
        players,
        setPlayers,
        teams,
        fetchPlayers,
        fetchPlayersAndTeams,
        fetchTeam,
        isLogged,
        setIsLogged,
        fetchGames,
        games,
        setGames,
        update,
        setUpdate,
        updateLeaderboard,
        setUpdateLeaderboard,
        associateGamesToTeam,
      }}
    >
      {children}
    </Context.Provider>
  );
}
