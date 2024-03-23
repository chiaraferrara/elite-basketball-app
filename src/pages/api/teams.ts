import { executeQuery } from "@/pages/mysqldb";


export default async function handler(
  req : any,
  res : any
) {
    const { team_id } = req.query

    if (req.method === "GET") {
      const teams = await executeQuery(
        "SELECT * FROM teams", []
      );
      res.status(200).json(teams);
    }

    if(req.method === "POST") {
      const { name, coach, tournament_id } = req.body;
      const player = await executeQuery(
        "INSERT INTO teams (name, team_id) VALUES (?, ?, ?)",
        [name,coach]
      );
      res.status(200).json(player);
    }

    
  } 
