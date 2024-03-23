
import { executeQuery } from "../mysqldb";

export default async function handler(
  req : any,
  res : any
) {

    if (req.method === "GET") {
      const players = await executeQuery(
        "SELECT * FROM players", []
      );
      res.status(200).json(players);
    }

    if(req.method === "POST") {
      const { name, team_id } = req.body;
      const player = await executeQuery(
        "INSERT INTO players (name, team_id) VALUES (?, ?)",
        [name, team_id]
      );
      res.status(200).json(player);
    }

    
  } 
