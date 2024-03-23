import mysql from "mysql2/promise";

const connection = {
  host: "localhost",
  port: 3316,
  user: "root",
  password: "",
  database: "basketball_tourney",
};

// export const createDBIfNotExists = async () => {
//   try {
//     const db = await mysql.createConnection(connection);
//     await db.execute(`CREATE DATABASE IF NOT EXISTS "basketball_tourney"`);
//     await db.execute("USE basketball_tourney");
//     await db.execute(`CREATE TABLE IF NOT EXISTS team(
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             city VARCHAR(255) NOT NULL,
//             coach VARCHAR(255) NOT NULL,
//         )`);
//     await db.execute(`CREATE TABLE IF NOT EXISTS player(
//             id INT AUTO_INCREMENT PRIMARY KEY,
//             name VARCHAR(255) NOT NULL,
//             team_id INT,
//             FOREIGN KEY (team_id) REFERENCES team(id)
//         )`);
//     await db.end();
//   } catch (error: any) {
//     console.log(error);
//     return new Error(error);
//   }
// };

export const executeQuery = async (query: any, data: any) => {
  try {
    const db = await mysql.createConnection(connection); //crea la connessione
    const [result] = await db.execute(query, data); //esegue la query
    await db.end(); //chiude la connessione
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return new Error(error);
  }
};
