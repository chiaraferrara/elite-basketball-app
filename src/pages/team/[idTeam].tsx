import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";
import { Team } from "../declarations/declarations";
import Link from "next/link";
import {
  Button,
  PlayerName,
  PointsDetail,
  PreviewPic,
  Row,
  RowWrap,
  TeamWrapper,
  Wrapper,
} from "@/styles/globals";

export default function Team() {
  const { fetchTeam } = useContext(Context);
  const [team, setTeam] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { isLogged, setIsLogged } = useContext(Context);

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
      {/* to add check on login */}

      <Wrapper>
        {" "}
        <RowWrap>
          <TeamWrapper>
            <h1>{team?.[0]?.name}</h1>
            <PointsDetail>
              <div style={{ margin: "10px", textAlign: "center" }}>
                Total Points:
                <br />
                {team?.[0]?.total_points}
              </div>
              <div style={{ margin: "10px", textAlign: "center" }}>
                Points scored:
                <br />
                {team?.[0]?.points_scored}
              </div>

              <div style={{ margin: "10px", textAlign: "center" }}>
                Points Given:
                <br />
                {team?.[0]?.points_given}
              </div>
            </PointsDetail>
            {team?.[0]?.logo && (
              <PreviewPic src={team[0].logo} alt="team logo" />
            )}
            <p>
              Coach:
              <br /> {team?.[0]?.coach}
            </p>
            {team?.[0]?.players.length > 0 && (
              <div>
                <Row>
                  {team?.[0]?.players.map((player: any) => (
                    <div style={{ textAlign: "center" }} key={player.player_id}>
                      <PreviewPic src={player.picture} alt="player pic" />
                      <PlayerName>{player.name}</PlayerName>
                      <p>Age: {player.age}</p>
                    </div>
                  ))}
                </Row>
              </div>
            )}
          </TeamWrapper>
        </RowWrap>{" "}
        {isLogged ? (
          <>
            <Button>Edit Team</Button>
            <Button>Delete Team</Button>
          </>
        ) : (
          <></>
        )}
      </Wrapper>
    </div>
  );
}
