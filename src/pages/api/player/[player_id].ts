import { executeQuery } from "@/mysqldb";

export default async function handler(req: any, res: any) {
  const { player_id } = req.query;

  //ottenimento di un player
  if (req.method === "GET") {
    const player = await executeQuery(
      "SELECT * FROM players WHERE player_id = ?",
      [player_id]
    );
    res.status(200).json(player);
  }

  //modifica del player
  if (req.method === "PUT") {
    const { picture, name, age, team_id, player_id } = req.body;
    const player = await executeQuery(
      "UPDATE players SET picture = ?, name = ?, age = ?, team_id = ? WHERE player_id = ?",
      [picture, name, age, team_id, player_id]
    );
    res.status(200).json(player);
  }

  //eliminazione dei player
  if (req.method === "DELETE") {
    const player = await executeQuery(
      "DELETE FROM players WHERE player_id = ?",
      [player_id]
    );
    res.status(200).json(player);
  }


  if (req.method === "PATCH") {
    const { picture, name, age, player_id} = req.body;
    const player = await executeQuery(
      "UPDATE players SET name = ? , picture = ?, age = ? WHERE player_id = ?",
      [ name,picture, age, player_id]
    );
    res.status(200).json(player);
  }
}
