import { CardForm, Input, PageButton, TeamGameColumn } from "@/styles/globals";
import { useContext, useEffect, useState } from "react";
import { Context } from "../declarations/ContextProvider";

export default function Team() {
  const [teamName, setTeamName] = useState("");
  const [coachName, setCoachName] = useState("");
  const [logoSrc, setLogoSrc] = useState("");
  const [points_given, setPointsGiven] = useState(0);
  const [points_scored, setPointsScored] = useState(0);
  const [total_points, setTotalPoints] = useState(0);
  const { setIsLogged, isLogged } = useContext(Context);

  const addTeamtoDB = async (event: any) => {
    if (!teamName || !coachName || !logoSrc) {
      console.log("Please fill all fields");
      return;
    }

    const response = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        logo: logoSrc,
        name: teamName,
        coach: coachName,
        points_given: points_given,
        points_scored: points_scored,
        total_points: total_points,
      }),
    });

    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {
    const logged = localStorage.getItem("isLogged");
    if (logged) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  if (!isLogged) {
    return (
      <TeamGameColumn>
        <h1>Log in to add a team</h1>
      </TeamGameColumn>
    );
  }
  return (
    <>
      <TeamGameColumn>
        <h1>Add Team</h1>
        <CardForm
          style={{
            paddingBlock: "5%",
            paddingInline: "9%",
            textAlign: "center",
            width: "fit-content",
          }}
        >
          <form
            method="post"
            onSubmit={(event) => {
              event.preventDefault();
              addTeamtoDB(event);
              setTeamName("");
              setCoachName("");
              setLogoSrc("");
            }}
          >
            <div>
              <legend>Team Name:</legend>
              <Input
                type="text"
                id="teamName"
                name="teamName"
                placeholder="Team Name*"
                value={teamName}
                onChange={(event) => {
                  setTeamName(event.target.value);
                  console.log(teamName);
                }}
              />
            </div>
            <div>
              <legend>Coach:</legend>
              <Input
                type="text"
                id="coach"
                name="coach"
                placeholder="Coach Name*"
                value={coachName}
                onChange={(event) => {
                  setCoachName(event.target.value);
                  console.log(coachName);
                }}
              />
            </div>
            <div>
              <legend>Logo:</legend>
              <Input
                type="text"
                id="logo"
                name="logo"
                placeholder="Logo URL*"
                value={logoSrc}
                onChange={(event) => {
                  setLogoSrc(event.target.value);
                  console.log(logoSrc);
                }}
              />
            </div>
            <PageButton type="submit">Add Team</PageButton>
          </form>
        </CardForm>
      </TeamGameColumn>
    </>
  );
}
