import {
  getAllPlayers,
  getAllMatches,
  getAllStats,
  getTeamByTeamID,
  getPlayersByTeamID,
} from "@/database/client";
import TeamLayout from "@/app/components/team/TeamRoster";

import TeamInfoCard from "@/app/components/team/TeamInfoCard";


export default async function Team({ params }: { params: { teamID: number } }) {
  const { data: teamData } = await getTeamByTeamID(params.teamID);
  const team = teamData[0];
  const { data: playersData } = await getPlayersByTeamID(params.teamID);
  const players = playersData;
  const { data: matchesData } = await getAllMatches();
  const matches = matchesData;
  const { allStats: fetchedStats } = await getAllStats();
  // const stats = fetchedStats;

  function formatPlayersWithStats(players, stats) {
    const formattedPlayers = [];

    for (const player of players) {
      const playerStats = stats.filter(
        (stat) => stat.playerID === player.playerID
      );
      formattedPlayers.push({ playerData: player, stats: playerStats });
    }

    return formattedPlayers;
  }

  const playersWithStats = formatPlayersWithStats(playersData, fetchedStats);

  const getSortedPlayersByPoints = () => {
    let sorted = [...players];
    sorted.sort((a, b) => {
      return b.points - a.points;
    });
    return sorted;
  };

  const sortedPlayers = getSortedPlayersByPoints();

  return (
    <div className=" flex flex-col gap-3">
      <TeamInfoCard teamInfo={team} playerInfo={players} />
      <TeamLayout teamPlayers={sortedPlayers} playerStats={playersWithStats} />
    </div>
  );
}
