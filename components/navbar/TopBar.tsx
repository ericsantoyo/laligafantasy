"use client";
import React, { useEffect, useState } from "react";
import GamesIcon from "@/components/navbar/GamesIcon";
import Logo from "@/components/navbar/Logo";
import SearchBox from "@/components/navbar/SearchBox";
import SocialIcons from "@/components/navbar/SocialIcons";
import TextItems from "@/components/navbar/TextItems";
import Hamburger from "@/components/navbar/Hamburger";

import { getAllMatches } from "@/database/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";

import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";


import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SheetGames from "../SheetGames";

// import { UserButton } from "@clerk/nextjs";
// import {
//   SignInButton,
//   SignOutButton,
//   SignedIn,
//   SignedOut,
// } from "@clerk/nextjs";
// import { Button } from "@/components/ui/button";

type Props = {};


const TopBar = (props: Props) => {
  const [navbar, setNavbar] = useState(false);
  const [matches, setMatches] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState(1); // Initial selected week
  const [loading, setLoading] = useState(true);
  const handleSearch = (query: string) => {};
  const handleHamburgerClick = () => {
    setNavbar(!navbar);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const { allMatches: matchesData } = await getAllMatches();

        if (matchesData) {
          setMatches(matchesData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
        // Handle error, show a message, etc.
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && matches.length > 0) {
      const currentWeek = getCurrentWeek(matches);
      setSelectedWeek(currentWeek);
    }
  }, [loading, matches]);

  const handleWeekChange = (value) => {
    setSelectedWeek(value);
  };

  const handlePrevWeek = () => {
    setSelectedWeek((prevWeek) => Math.max(1, prevWeek - 1));
  };

  const handleNextWeek = () => {
    setSelectedWeek((prevWeek) => Math.min(38, prevWeek + 1));
  };

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

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!matches || matches.length === 0) {
    return <p>No matches available.</p>;
  }



  return (
    <>
      <Sheet>
        <div
          className="
        flex justify-between items-center md:flex-row px-4
        mx-auto max-w-5xl w-full md:flex-nowrap flex-wrap mt-2
        "
        >
          {/* --- GAMES ICON --- */}
          <div className="md:order-2 shrink-0 md:ml-4">
            {/* <GamesIcon onClick={handleDrawerOpen} className="" /> */}
            <SheetTrigger>
              <GamesIcon className="" />
            </SheetTrigger>
          </div>

          {/* --- LOGO --- */}
          <div className="md:flex-shrink-0 md:grow md:order-first shrink-0">
            <Logo className="" />
          </div>

          {/* --- HAMBURGER MENU --- */}
          <div className="md:hidden shrink-0">
            <Hamburger
              onHamburgerClick={handleHamburgerClick}
              navbar={navbar}
              className="invert dark:invert-0 "
            />
          </div>

          <div
            className={`
          transition-all md:flex md:flex-row justify-between md:items-center  w-full md:w-auto flex-nowrap 
            ${
              navbar ? "flex flex-col justify-between items-center" : "hidden "
            }`}
          >
            <div
              className={`transition-all flex flex-row justify-between items-center w-full space-x-3
            ${navbar ? "py-4 " : "  "} `}
            >
              {/* SEARCHBOX */}
              <SearchBox
                className={`${navbar ? " grow " : "  "}`}
                onSearch={handleSearch}
              />
              {/* SOCIALS */}
              <SocialIcons className=" shrink-0 " />
              {/* THEMETOGGLE */}

              {/* <SignedOut>
              <SignInButton mode="modal">
                <Button variant="usericon" size="rounded" className="shrink-0 group">
                  <User className="group-hover:invert transition p-[1px]" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn> */}
              {/* USERBUTTON */}
              {/* <div className="ml-2 shrink-0">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn> */}
            </div>

            {/* TEXT MENU */}
            <TextItems
              classNameDiv={`${
                navbar
                  ? "hidden "
                  : "order-last md:order-first md:flex md:flex-row md:flex-nowrap font-semibold "
              }`}
              classNameUL={""}
              classNameLI={""}
            />
          </div>
        </div>
        <SheetContent 
        className=" w-[370px] sm:w-[370px] p-0" 

        >
           <SheetGames
            handlePrevWeek={handlePrevWeek}
            selectedWeek={selectedWeek}
            handleWeekChange={handleWeekChange}
            handleNextWeek={handleNextWeek}
            matches={matches}
          />
      
        </SheetContent>
      </Sheet>
    </>
  );
};

export default TopBar;