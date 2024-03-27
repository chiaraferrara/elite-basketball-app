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
      const { logo, name, coach , points_given, points_scored, total_points } = req.body;
      const team = await executeQuery(
        "INSERT INTO teams (logo, name, coach, points_given, points_scored, total_points) VALUES (?, ?, ?, ?, ?, ?)",
        [logo, name,coach, points_given, points_scored, total_points]
      );
      res.status(200).json(team);
    }

    
  } 
