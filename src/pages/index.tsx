import { useContext, useEffect, useState } from "react";
import { Context } from "./declarations/ContextProvider";
import Link from "next/link";
import { Player, Team } from "./declarations/declarations";
import GamesList from "./components/GamesList";
import Leaderboard from "./components/Leaderboard";

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const { fetchPlayersAndTeams } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTeam = await fetchPlayersAndTeams();
      setTeams(fetchedTeam.teams);
    };

    fetchData();
  }, []);

  return (
    <>
      <GamesList />
      <Leaderboard />
    </>
  );
}
