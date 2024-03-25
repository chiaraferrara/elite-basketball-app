import { executeQuery } from "@/pages/mysqldb";


export default async function handler(
  req : any,
  res : any
) {
    const { team_id } = req.query

    if (req.method === "GET") {
      const team = await executeQuery(
        'SELECT * FROM teams WHERE team_id = ?', [team_id]
      );
      res.status(200).json(team);
    }


    if (req.method === "DELETE") {
      const team = await executeQuery(
        'DELETE FROM teams WHERE team_id = ?', [team_id]
      );
      res.status(200).json(team);
    }
    
  } 
