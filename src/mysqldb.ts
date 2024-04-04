import mysql from "mysql2/promise";

// const connection = {
//   host: "localhost",
//   port: 3316,
//   user: "root",
//   password: "",
//   database: "basketball_tourney",
// };


export const executeQuery = async (query: any, data: any) => {
  try {
    const db = await mysql.createConnection({ //crea la connessione
      host: process.env.NEXT_PUBLIC_HOST,
      port: Number(process.env.NEXT_PUBLIC_PORT),
      user: process.env.NEXT_PUBLIC_USER,
      password: process.env.NEXT_PUBLIC_PASSWORD,
      database: process.env.NEXT_PUBLIC_DATABASE,
    });
    const [result] = await db.execute(query, data); //esegue la query
    await db.end(); //chiude la connessione
    console.log(result);
    return result;
  } catch (error: any) {
    console.log(error);
    return new Error(error);
  }
};
