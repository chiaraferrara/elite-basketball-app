
import { executeQuery } from "../../mysqldb";

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
      const { picture, name, age, team_id } = req.body;
      const player = await executeQuery(
        "INSERT INTO players (picture, name, age, team_id) VALUES (?, ?, ?, ?)",
        [picture, name, age, team_id]
      );
      res.status(200).json(player);
    }


    
  } 
