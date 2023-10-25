import {
  getAllStats,
  getAllTeams,
  getPaginatedPlayers,
} from "@/database/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

import SearchFilters from "@/components/stats/SearchFilters";
import { slugById } from "@/utils/utils";

// function getRevalidateInterval(): number {
//   // Get the current time
//   const currentTime = new Date();
  
//   // Define revalidation intervals
//   let revalidateInterval = 60 * 60; // 1 hour by default
  
//   // Check if the current time is within the specified window (CEST 00:00 to CEST 00:30)
//   if (
//     currentTime.getUTCHours() === 22 && // 00:00 CEST in UTC
//     currentTime.getUTCMinutes() >= 0 &&
//     currentTime.getUTCMinutes() <= 30
//   ) {
//     revalidateInterval = 60; // 1 minute within the specified window
//   }

//   return revalidateInterval;
// }

// Export revalidate constant with the condition
export const revalidate = 0;

type Props = {};

//teamsSlugs and teamIDs
const teamsSlugsByID = [
  { id: 21, slug: "d-alaves" },
  { id: 1, slug: "ud-almeria" },
  { id: 3, slug: "athletic-club" },
  { id: 2, slug: "atletico-de-madrid" },
  { id: 4, slug: "fc-barcelona" },
  { id: 5, slug: "real-betis" },
  { id: 162, slug: "cadiz-cf" },
  { id: 6, slug: "rc-celta" },
  { id: 9, slug: "getafe-cf" },
  { id: 28, slug: "girona-fc" },
  { id: 10, slug: "granada-cf" },
  { id: 31, slug: "ud-las-palmas" },
  { id: 33, slug: "rcd-mallorca" },
  { id: 13, slug: "c-a-osasuna" },
  { id: 14, slug: "rayo-vallecano" },
  { id: 15, slug: "real-madrid" },
  { id: 16, slug: "real-sociedad" },
  { id: 17, slug: "sevilla-fc" },
  { id: 18, slug: "valencia-cf" },
  { id: 20, slug: "villarreal-cf" },
];

function getPositionBadge(positionID: number): JSX.Element {
  switch (positionID) {
    case 1:
      return (
        <div className="flex justify-center items-center h-full">
          <div className="shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-r from-[#d85912] to-[#ff7e00] dark:bg-orange-600 text-gray-50">
            POR
          </div>
        </div>
      );
    case 2:
      return (
        <div className="flex justify-center items-center h-full">
          <div className="shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-r from-[#8023a7] to-[#ce32dc] dark:bg-purple-600 text-gray-50">
            DEF
          </div>
        </div>
      );
    case 3:
      return (
        <div className="flex justify-center items-center h-full">
          <div className="shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-tr from-[#0094ff] to-[#4bafe3] dark:bg-blue-600 text-gray-50">
            CEN
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex justify-center items-center h-full">
          <div className="shadow-sm shadow-neutral-400 border-gray-600 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-tr from-[#ee9015] to-[#f3c832] dark:bg-red-600 text-gray-50">
            DEL
          </div>
        </div>
      );
    case 5:
      return (
        <div className="flex justify-center items-center h-full">
          <div className="shadow-sm shadow-neutral-400 dark:shadow-neutral-800 w-9 text-center text-[12px] leading-5 font-semibold rounded bg-gradient-to-br from-[#02da67] to-[#449fcf] dark:bg-green-600 text-gray-50">
            ENT
          </div>
        </div>
      );
    default:
      return <div className=""></div>; // Default case
  }
}

function getWeeksTotalPointsFromStats(player) {
  const stats = player.stats;
  const maxWeeks = 5; // Maximum number of weeks to display
  // console.log(stats);
  let points = [];

  // Create a map to store points by week
  const pointsByWeek = new Map();

  // Calculate points for each week from the player's stats
  for (const stat of stats) {
    const week = stat.week;
    const totalPoints = stat.totalPoints;

    // Update the points for the corresponding week
    pointsByWeek.set(week, totalPoints);
  }

  // Determine the maximum week
  let maxWeek = Math.max(...stats.map((stat) => stat.week));
  // console.log(maxWeek);
  // Get the last 5 weeks (or fewer if less than 5 weeks of data)
  for (let i = maxWeek; i > maxWeek - maxWeeks && i >= 1; i--) {
    points.push({
      week: i,
      points: pointsByWeek.get(i) || 0, // Use 0 if there are no stats for the week
    });
  }

  // Sort points by week in ascending order
  points.sort((a, b) => a.week - b.week);

  return points;
}

//To format the value
const formatter = new Intl.NumberFormat("en-GB", {});

//To get the teamSlugs by teamID


StatsPage.defaultProps = {
  searchParams: {
    page: "1",
    limit: "12",
    search: "",
    team: "",
  },
};

export default async function StatsPage({searchParams,}: {searchParams: { [key: string]: string | string[] | undefined };}) {
  const page = typeof searchParams.page === "string" ? Number(searchParams.page) : 1;
  const limit = typeof searchParams.limit === "string" ? Number(searchParams.limit) : 12;
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined;
  const team = typeof searchParams.team === "string"
      ? Number(searchParams.team)
      : undefined;
  const { paginatedPlayers: fetchedPlayers } = await getPaginatedPlayers({
    page,
    limit,
    playerName: search,
    teamID: team,
  });
  const { allStats: fetchedStats } = await getAllStats();
  const { allTeams: fetchedTeams } = await getAllTeams();

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

  const playersWithStats = formatPlayersWithStats(fetchedPlayers, fetchedStats);

  const getColor = (points) => {
    if (points >= 10)
      return "bg-green-600 text-neutral-50 font-bold text-shadow";
    if (points >= 5)
      return "bg-green-500 text-neutral-50 font-bold text-shadow";
    if (points >= 2)
      return "bg-orange-500 text-neutral-50 font-bold text-shadow";
    if (points >= 0) return "bg-red-500 text-neutral-50 font-bold text-shadow";
    return "bg-red-700 text-neutral-50 font-bold text-shadow";
  };

  const lastChangeStyle = (lastChange) => {
    if (lastChange >= 0) return " text-green-600 dark:text-green-400";
    return "text-red-500";
  };

  return (
    <div className="max-w-6xl flex flex-col justify-center px-4  mx-auto w-full">
      {/* <h1 className="text-xl font-bold text-center">STATS Page</h1> */}
      <SearchFilters />
      {/* PLAYERS GRID */}
      <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {playersWithStats.map((player) => (
          <div
            className=" transition-all py-3 px-4 bg-buttons rounded-md border-[1px] border-neutral-300 shadow-neutral-300 dark:border-neutral-700 shadow dark:shadow-neutral-800 "
            key={player.playerData.playerID}
          >
            {/* PLAYER TOP ROW DATA */}
            <div className="flex justify-between items-center gap-2  ">
              <Link
                className="w-[110px] flex-none text-center "
                href={`/player/${player.playerData.playerID}`}
              >
                <div className="flex flex-col justify-center items-center w-30  ">
                  <Image
                    width={50}
                    height={50}
                    className="rounded "
                    alt="player image"
                    src={player.playerData.image}
                  />
                  <p className="font-normal truncate ">
                    {player.playerData.nickname}
                  </p>
                </div>
              </Link>
              <div className="flex flex-col justify-center items-center">
                <div
                  className={`font-semibold ${lastChangeStyle(
                    player.playerData.lastMarketChange
                  )}`}
                >
                  {formatter.format(player.playerData.lastMarketChange)}
                </div>
                <p className="text-xs">Last Change</p>
              </div>
              <div className="flex flex-col justify-center items-center">
                <div className="font-medium">
                  {formatter.format(player.playerData.marketValue)}
                </div>
                <p className="text-xs">Market Value</p>
              </div>
            </div>

            {/* PLAYER BOTTOM ROW DATA */}
            <div className="flex gap-2 justify-between items-center">
              <div className="">
                {getPositionBadge(player.playerData.positionID)}
              </div>

              <Link
                className="w-[30px] flex-none"
                href={`/team/${player.playerData.teamID}`}
              >
                <div className="flex justify-center items-center ">
                  <Image
                    height={35}
                    width={35}
                    className="h-7 w-auto"
                    alt="player image"
                    src={`/teamLogos/${slugById(player.playerData.teamID)}.png`}
                  />
                </div>
              </Link>
              <div className="flex flex-row justify-between items-center gap-1">
                {getWeeksTotalPointsFromStats(player).map((point) => (
                  <div
                    className="flex flex-col justify-center items-center "
                    key={point.week}
                  >
                    <div
                      className={`text-center border-[0.5px] w-6 h-6 border-neutral-700   rounded-sm  flex justify-center items-center  ${getColor(
                        point.points
                      )}`}
                    >
                      <p className={`text-[14px] items-center align-middle`}>
                        {point.points}
                      </p>
                    </div>
                    <div className="text-center text-[11px]">J{point.week}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-col justify-center items-center pl-4">
                <p className="text-xl font-bold">{player.playerData.points}</p>
                <p className="text-xs">Points</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION BUTTONS */}

      <div className="flex justify-between mt-4 gap-4 ">
        {/* First Page Button */}
        <div className="flex flex-start">
          <Link
            className="flex-none"
            href={
              `/stats?page=1` + (team && team !== "-1" ? `&team=${team}` : "")
            }
          >
            <Button
              variant="stardard"
              size="default"
              className={`transition-all w-14`}
            >
              First
            </Button>
          </Link>
        </div>
        {/* Previous Page Button */}

        <div className="flex flex-start gap-4">
        <Link
          href={
            `/stats?page=${page > 1 ? page - 1 : 1}` +
            (team && team !== "-1" ? `&team=${team}` : "")
          }
          className={`${page ? "" : ""}`}
        >
          <Button
            variant="stardard"
            size="default"
            className={` transition-all w-24 uppercase`}
          >
            Previous
          </Button>
        </Link>

        {/* Next Page Button */}
        <Link
          href={
            `/stats?page=${
              playersWithStats.length === limit ? page + 1 : page
            }` + (team && team !== "-1" ? `&team=${team}` : "")
          }
          className={`${page ? "" : ""}`}
        >
          <Button
            variant="stardard"
            size="default"
            className={` transition-all w-24 uppercase `}
          >
            Next
          </Button>
        </Link>
        </div>
        <div className="flex flex-end w-14"></div>
      </div>
    </div>
  );
}
