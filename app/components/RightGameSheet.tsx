"use client";
import useSWR from "swr";
import React, { useEffect, useState } from "react";

import { getAllMatches } from "@/database/client";

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
import { slugById } from "@/utils/utils";

import { Skeleton } from "@/components/ui/skeleton";

const getCurrentWeek = (matchesData) => {
  const today = new Date();

  for (const match of matchesData) {
    const matchDate = new Date(match.matchDate);

    const formattedMatchDate = new Date(matchDate.toISOString());

    if (
      today >= formattedMatchDate &&
      today <= new Date(formattedMatchDate).setHours(23, 59, 59)
    ) {
      return match.week;
    }

    const allMatchesForWeek = matchesData.filter(
      (m) => m.week === match.week
    );
    const allMatchesFinished = allMatchesForWeek.every(
      (m) => m.matchState === 7
    );

    if (allMatchesFinished) {
      const nextWeek = match.week + 1;
      return nextWeek;
    }
  }

  console.log("No matching week found, defaulting to week 1");
  return 1;
};

// Your component
const MatchesPage: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState(1);
  // Using SWR to fetch data
  const {
    data: matches,
    error,
    isLoading,
  } = useSWR("/api/user", getAllMatches);

  useEffect(() => {
    if (matches && Array.isArray(matches.allMatches)) {
      const initialWeek = getCurrentWeek(matches.allMatches);
      setSelectedWeek(initialWeek);
    }
  }, [matches]);

  // Handling errors
  if (error) {
    console.error("Error fetching matches:", error);
    return <div>Error fetching matches</div>;
  }

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => Math.max(1, prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => Math.min(38, prevWeek + 1));
  };

  

  // Displaying skeleton while loading
  if (isLoading) {
    return (
      <div>
        <h1>All Matches</h1>
        <div className="grid grid-cols-2">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index}>
              <div className="w-[150px] h-full flex flex-col items-center space-x-2">
                <Skeleton className="h-2 w-8" />
                <div className="flex flex-row justify-between items-center text-center space-x-2">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="flex space-x-1">
                    <Skeleton className="h-7 w-4" />
                    <Skeleton className="h-7 w-4" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
                <Skeleton className="h-2 w-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  

  // Displaying matches
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
            <SelectValue>{`Jornada ${selectedWeek}`}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 38 }, (_, index) => (
              <SelectItem key={index + 1} value={index + 1}>
                {`Jornada ${index + 1}`}
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
        {matches &&
          matches.allMatches
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

export default MatchesPage;