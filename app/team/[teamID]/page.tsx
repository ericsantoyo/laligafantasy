import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
} from "@/database/client";
import TeamLayout from "@/components/team/TeamLayout";
import Paper from "@mui/material/Paper";

const formatter = new Intl.NumberFormat("en-GB", {});


const TeamCard = ({ data }) => {
  return (
    <Paper className="transition-all flex flex-col content-center p-5 mb-5 bg-neutral-50 dark:bg-neutral-500/30 rounded-md border-[1px] border-neutral-300 shadow-neutral-300 dark:border-neutral-700 shadow dark:shadow-neutral-800">
      <div className="">
        {/* <img src={} alt="team" /> */}
      </div>
      <div className="">
        {/* <p>Team name</p> */}
        <h3 className="font-bold mx-auto	 ">
          {data.name} ({data.nickname})
        </h3>
      </div>
      <div className="">
        <p>Total points</p>
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
    <div className="text-md text-center">

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

      <h2 className="text-xl font-bold">TEAM {team.name}</h2>
      <h2>Team ID: {team.teamID}</h2>
      
      {/* <pre className="">{JSON.stringify(playersData, null, 2)}</pre> */}
      <TeamLayout playersWithStats={players} />
    </div>
  );
}
