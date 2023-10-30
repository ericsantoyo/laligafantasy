import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
} from "@/database/client";
import TeamLayout from "@/app/components/team/TeamLayout"
import Paper from "@mui/material/Paper";
import Image from "next/image";

const formatter = new Intl.NumberFormat("en-GB", {});


const TeamCard = ({ data }) => {
  return (
    
    <Paper elevation={3} className="transition-all flex flex-col justify-center items-center w-full">
      <div className="">
        <Image
          src={data.image}
          alt={data.name}
          width={80}
          height={80}
          className="h-20 w-auto "
        />
      </div>
      <div className="">
        {/* <p>Team name</p> */}
        <h3 className="font-bold mx-auto	 ">
          {data.name} ({data.nickname})
        </h3>
      </div>
      <div className="flex">
        <p>Total points:</p>
        <h3>{data.totalPoints}</h3>
      </div>
      <div className="">
        <p>Total market value</p>
        <h3>{formatter.format(data.totalMarketValue)}</h3>
      </div>
      <div className="">
        <p>Players Available</p>
        <h3>
          {data.numberOfAvailablePlayers} /{data.numberOfPlayers}
        </h3>
      </div>
    </Paper>
  );
};

export default async function Team({ params }) {
  const { data: teamData, error }= await getTeamByTeamID(params.teamID);
  const team = teamData[0];
  const { data: playersData } = await getPlayersByTeamID(params.teamID);
  const players = playersData;
  const { data: matchesData } = await getAllMatches();
  const matches = matchesData;
  const { data: statsData } = await getAllStats();
  const stats = statsData;

  const getTotalPointsOfTeam = () => {
    let total = 0;
    for (let player in players) {
      if (players[player].status === "out_of_league") {
        continue;
      }
      total += players[player].points;
    }
    return total;
  };

  const getTotalMarketValueOfTeam = () => {
    let total = 0;
    for (let player in players) {
      if (players[player].status === "out_of_league") {
        continue;
      }
      total += players[player].marketValue;
    }
    return total;
  };

  const getNumberOfPlayersOfTeam = () => {
    let total = 0;
    for (let player in players) {
      if (players[player].status !== "out_of_league") {
        total++;
      }
    }
    return total;
  };

  const getNumberOfAvailablePlayersOfTeam = () => {
    let total = 0;
    for (let player in players) {
      if (players[player].status === "ok") {
        total++;
      }
    }
    return total;
  };

  const getSortedPlayersByPoints = () => {
    let sorted = [...players];
    sorted.sort((a, b) => {
      return b.points - a.points;
    });
    return sorted;
  };


  return (
    <div className=" flex flex-col gap-3">

      <TeamCard
        data={{
          name: team.name,
          nickname: team.nickname,
          image: team.image,
          totalPoints: getTotalPointsOfTeam(),
          totalMarketValue: getTotalMarketValueOfTeam(),
          numberOfPlayers: getNumberOfPlayersOfTeam(),
          numberOfAvailablePlayers: getNumberOfAvailablePlayersOfTeam(),
        }}
      />

      
      {/* <pre className="">{JSON.stringify(playersData, null, 2)}</pre> */}
      <TeamLayout allPlayersData={players} />
    </div>
  );
}
