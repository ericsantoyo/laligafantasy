import React from "react";
import TopBar from "./TopBar";
import ClubIcons from "./ClubIcons";
import { Paper } from "@mui/material";
import TextItems from "./TextItems";

type Props = {};

const Navbar = (props: Props) => {
  // const handleSearch = (query: string) => {};

  return (
  
      <Paper
        elevation={3}
        className="w-full transition-all mb-2 mt-[-8px] pt-2"
      >
        {/* NAVBAR - TOP ROW */}
        <TopBar />
        <TextItems classNameDiv={"md:hidden font-semibold "} classNameUL={""}  classNameLI={""}/>
        {/* NAVBAR - BOTTOM ROW */}
        <ClubIcons />
      </Paper>
  
  );
};

export default Navbar;