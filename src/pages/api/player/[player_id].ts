import { executeQuery } from "@/pages/mysqldb";


export default async function handler(
  req : any,
  res : any
) {
    const { player_id } = req.query

    if (req.method === "GET") {
      const player = await executeQuery(
        'SELECT * FROM players WHERE player_id = ?', [player_id]
      );
      res.status(200).json(player);
    }
    
  } 
