import { executeQuery } from "@/pages/mysqldb";


export default async function handler(
  req : any,
  res : any
) {
    const { game_id } = req.query

//ottenimento di un game
    if (req.method === "GET") {
      const game = await executeQuery(
        'SELECT * FROM games WHERE id_game = ?', [game_id]
      );
      res.status(200).json(game);
    }
    
//eliminazione del game
    if (req.method === "DELETE") {
      const game = await executeQuery(
        'DELETE FROM games WHERE id_game = ?', [game_id]
      );
      res.status(200).json(game);
    }
  } 
