import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { Team } from "../declarations/declarations";
import Link from "next/link";

export default function Team() {
  const { fetchTeam } = useContext(Context);
  const [team, setTeam] = useState<any>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { idTeam } = router.query;
  const teamId = Number(idTeam);

  //funzione che mi ritorna i dati del team
  const fetchDataFromAPI = async () => {
    try {
      const fetchedTeam = await fetchTeam(teamId);
      setTeam(fetchedTeam);
      localStorage.setItem("team", JSON.stringify(fetchedTeam));
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  const loadTeamFromLocalStorage = () => {
    const lsTeam = localStorage.getItem("team");
    if (lsTeam) {
      const parsedTeam = JSON.parse(lsTeam);

      //se il team_id del team in local storage è uguale a quello passato nell'url ritorno il team
      //altrimenti ritorno null
      return parsedTeam?.[0]?.team_id === teamId ? parsedTeam : null;
    }
    return null;
  };

  useEffect(() => {
    const loadTeam = async () => {
      const lsTeam = loadTeamFromLocalStorage();
      if (lsTeam) {
        setTeam(lsTeam);
        setLoading(false);
      } else {
        await fetchDataFromAPI();
        setLoading(false);
      }
    };
    if (idTeam) {
      loadTeam();
    }
  }, [idTeam]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!team) {
    return <h1>Team not found</h1>;
  }

  return (
    <div>
      <Link href="/">Go back</Link>
      <h1>{team?.[0]?.name}</h1>

      {team?.[0]?.logo && <img src={team[0].logo} alt="team logo" />}
      <h2>Coach: {team?.[0]?.coach}</h2>
      <ul>
        <li>Total Points : {team?.[0]?.total_points}</li>
      </ul>

      <h2>Players:</h2>
      <ul>
        {team?.[0]?.players.map((player: any) => (
          <li key={player.player_id}>
            <p>Name: {player.name}</p>
            <p>Age: {player.age}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
