import { LeaderboardRow, Table, Td, Th, Thead, Tr } from "@/styles/globals";
import { TableBody, TableHead, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [teams, setTeams] = useState<any>([]);
  const router = useRouter();

  const onClickTeam = (team_id: any) => {
    router.push(`/team/${team_id}`);
  };

  const fetchTeams = async () => {
    try {
      const teamsRes = await fetch("/api/teams");
      const teamsData = await teamsRes.json();
      const sortedTeams = sortTeamsByPoints(teamsData);
      setTeams(sortedTeams);
      return teamsData;
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  };

  const sortTeamsByPoints = (teams: any) => {
    return teams.sort((a: any, b: any) => b.total_points - a.total_points); //sort per punti per la classifica
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedTeams = await fetchTeams();
      console.log(fetchedTeams);
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h2 style={{ textTransform: "uppercase", marginTop: "25px" }}>
          Leaderboard
        </h2>
      </div>
      <LeaderboardRow>
        <Table>
          <Thead>
            <Tr>
              <Th>Position</Th>

              <Th>Team</Th>
              <Th>PS</Th>
              <Th>Points</Th>
            </Tr>
          </Thead>
          <TableBody>
            {teams.map((team: any, index: number) => (
              <tr key={team.team_id}>
                <Td style={{ textAlign: "center" }}>{index + 1}</Td>
                <Td style={{ marginLeft: "40px" }}>
                  <Link href={`/team/${team.team_id}`}>{team.name}</Link>
                </Td>
                <Td style={{ textAlign: "center" }}>{team.points_scored}</Td>
                <Td style={{ textAlign: "center" }}>{team.total_points}</Td>
              </tr>
            ))}
          </TableBody>
        </Table>
      </LeaderboardRow>
    </>
  );
}
