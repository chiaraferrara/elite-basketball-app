import { Dispatch, SetStateAction } from "react";

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
    setPlayers: Dispatch<SetStateAction<Player[]>>;
    teams: Team[];
    setTeams: Dispatch<SetStateAction<Team[]>>;
    fetchPlayersAndTeams: () => Promise<{ teams: any }>;
    fetchTeam : (id: number) => Promise<any>;};
   
