export interface Team {
  id: number;
  logo: string;
  name: string;
  coach: string;
  players: Player[];
  tournament_id: number;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  team: string;
  team_id: number;

}

  export interface TContext {
    players: Player[];
    teams: Team[];
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
   
