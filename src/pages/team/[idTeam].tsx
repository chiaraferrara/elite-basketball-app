import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { Team } from "../declarations/declarations";

export default function Team() {
  const { fetchTeam } = useContext(Context);
  const [team, setTeam] = useState<any>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { idTeam } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedTeam = await fetchTeam(Number(idTeam));
        // console.log("Team", fetchedTeam);
        setTeam(fetchedTeam);
      } catch (error) {
        console.error("Error fetching team:", error);
      }
    };

    fetchData().then(() => setLoading(false));
  }, [idTeam]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!team) {
    return <h1>Team not found</h1>;
  }

  return (
    <div>
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
