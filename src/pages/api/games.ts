import { executeQuery } from "@/mysqldb";

export default async function handler(req: any, res: any) {
  if (req.method === "GET") {
    const games = await executeQuery("SELECT * FROM games", []);
    res.status(200).json(games);
  }

  if (req.method === "POST") {
    const { id_team1, id_team2, date, team1_points, team2_points } = req.body;
    const player = await executeQuery(
      "INSERT INTO games (id_team1, id_team2, date, team1_points, team2_points) VALUES (?, ?, ?, ?, ?)",
      [id_team1, id_team2, date, team1_points, team2_points]
    );
    res.status(200).json(player);
  }
}
