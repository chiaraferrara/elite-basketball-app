export interface Team {
  id: number;
  logo: string;
  name: string;
  coach: string;
  players: Player[];
  tournament_id: number;
}

export interface Player {
  player_id: number;
  picture: string;
  name: string;
  age: number;
  team: string;
  team_id: number;

}

  export interface TContext {
    players: Player[];
    setPlayers: (value: Player[]) => void;
    teams: Team[];
    fetchPlayers: () => Promise<Player[]>;
    fetchPlayersAndTeams: () => Promise<{ teams: any }>;
    fetchTeam : (id: number) => Promise<any>;
    isLogged: boolean;
    setIsLogged:  (value: boolean) => void;
    fetchGames: () => Promise<any>;
    games: any[];
    setGames: (value: any) => void;
    update: boolean;
    setUpdate: (value: boolean) => void;
    updateLeaderboard : boolean;
    setUpdateLeaderboard: (value: boolean) => void;
  }
   
