import { executeQuery } from "@/pages/mysqldb";

export default async function handler(req: any, res: any) {
  const { team_id } = req.query;

  if (req.method === "GET") {
    const team = await executeQuery("SELECT * FROM teams WHERE team_id = ?", [
      team_id,
    ]);
    res.status(200).json(team);
  }

  if (req.method == "PATCH") {
    const { points_scored, points_given, total_points, played_games } =
      req.body;
    const team = await executeQuery(
      "UPDATE teams SET points_scored =  points_scored + ?, points_given = points_given + ?, total_points = total_points + ?, played_games = played_games + ? WHERE team_id = ?",
      [points_scored, points_given, total_points, played_games, team_id]
    );
    res.status(200).json(team);
  }

  if (req.method === "DELETE") {
    const team = await executeQuery("DELETE FROM teams WHERE team_id = ?", [
      team_id,
    ]);
    res.status(200).json(team);
  }
}
