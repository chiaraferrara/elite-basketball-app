export interface Team {
    id: number;
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

