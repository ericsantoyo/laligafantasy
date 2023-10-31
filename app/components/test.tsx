

import React from "react";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { slugById } from "@/utils"; // You can move the utility function to a shared location

const SheetGames = ({
  handlePrevWeek,
  selectedWeek,
  handleWeekChange,
  handleNextWeek,
  matches,
}) => {
  return (
    <div className="flex flex-col justify-start items-center h-full overflow-y-auto">
      <div className="flex flex-row justify-center items-center w-full mt-5">
        <p className="text-xl font-semibold">PARTIDOS</p>
      </div>

      <div className="flex justify-between items-center m-auto mt-4 mb-5 gap-4">
        <IconButton onClick={handlePrevWeek}>
          <ChevronLeftIcon />
        </IconButton>
        <Select value={selectedWeek} onValueChange={handleWeekChange}>
          <SelectTrigger>
            <SelectValue>{`Week ${selectedWeek}`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 38 }, (_, index) => (
              <SelectItem key={index + 1} value={index + 1}>
                {`Week ${index + 1}`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <IconButton onClick={handleNextWeek}>
          <ChevronRightIcon />
        </IconButton>
      </div>

      <div className="grid grid-cols-2 gap-4 mx-auto">
        {/* Display matches for the selected week */}
        {matches
          .filter((match) => match.week === selectedWeek)
          .sort((a, b) => new Date(a.matchDate) - new Date(b.matchDate))
          .map((match) => (
            <div key={match.matchID}>
              <Paper
                elevation={2}
                className="flex flex-col justify-between items-center w-[150px] h-full py-1 text-center"
              >
                <p className="text-[11px]">
                  {new Date(match.matchDate).toLocaleDateString("es-EU", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <div className="flex flex-row justify-between items-center text-center">
                  <Image
                    src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                    alt="home"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className="h-7 mr-3"
                  />
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex">
                      <p className="font-semibold">{match.localScore}</p>
                      <p className="mx-1">-</p>
                      <p className="font-semibold">{match.visitorScore}</p>
                    </div>
                  </div>
                  <Image
                    src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                    alt="home"
                    width={48}
                    height={48}
                    style={{ objectFit: "contain" }}
                    className="h-7 ml-3"
                  />
                </div>
                <p className="text-[11px]">
                  {new Date(match.matchDate).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </p>
              </Paper>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SheetGames;








  // const { data: playersData } = await getPlayersByTeamID(params.teamID);

  // function formatPlayersWithStats(players, stats) {
  //   const formattedPlayers = [];

  //   for (const player of players) {
  //     const playerStats = stats.filter(
  //       (stat) => stat.playerID === player.playerID
  //     );
  //     formattedPlayers.push({ playerData: player, stats: playerStats });
  //   }

  //   return formattedPlayers;
  // }

  // const playersWithStats = formatPlayersWithStats(playersData, statsData);



  <Paper
                  elevation={2}
                  className="flex flex-col justify-between items-center w-[150px] h-full py-1 text-center"
                >
                  <p className="text-[11px]">
                    {new Date(match.matchDate).toLocaleDateString("es-EU", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <div className="flex flex-row justify-between items-center text-center">
                    <Image
                      src={`/teamLogos/${slugById(match.localTeamID)}.png`}
                      alt="home"
                      width={48}
                      height={48}
                      style={{ objectFit: "contain" }}
                      className="h-7 mr-3"
                    />
                    <div className="flex flex-col justify-center items-center">
                      <div className="flex">
                        <p className="font-semibold">{match.localScore}</p>
                        <p className="mx-1">-</p>
                        <p className="font-semibold">{match.visitorScore}</p>
                      </div>
                    </div>
                    <Image
                      src={`/teamLogos/${slugById(match.visitorTeamID)}.png`}
                      alt="home"
                      width={48}
                      height={48}
                      style={{ objectFit: "contain" }}
                      className="h-7 ml-3"
                    />
                  </div>
                  <p className="text-[11px]">
                    {new Date(match.matchDate).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </p>
                </Paper>