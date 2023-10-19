"use client";
import { getAllTeams } from "@/database/client";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Team } from "@/types";

type Props = {
  search?: string;
};

const SearchFilters = ({ search }: Props) => {
  const router = useRouter();
  const initialRender = useRef(true);

  const [playerName, setPlayerName] = useState("");
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState("-1");

  const [query] = useDebounce(playerName, 1000);

  function getTeamsOptions(teams: Team[]) {
    const options = [{ teamID: -1, name: "All Teams" }];
    for (const team of teams) {
      options.push(team);
    }
    return options;
  }

  const updateURL = () => {
    const params = new URLSearchParams();

    if (query) params.set("search", query);
    if (
      selectedTeam &&
      selectedTeam !== "-1" &&
      typeof selectedTeam !== "undefined"
    )
      params.set("team", selectedTeam);

    router.push(`/stats?${params.toString()}`);
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    updateURL();
  }, [query, selectedTeam]);

  useEffect(() => {
    async function fetchTeams() {
      const { allTeams: fetchedTeams }: { allTeams: Team[] } =
        await getAllTeams();

      setTeams(fetchedTeams);
    }
    fetchTeams();
  }, []);

  const resetFilters = () => {
    setPlayerName("");
    setSelectedTeam("-1");

  };

  return (
    <div className="flex justify-center items-center py-4 gap-4">
      <div className="relative min-w-[90px] max-w-[170px] rounded-md">
        <Search className="absolute h-4 w-4 top-3 left-3" />
        <TextField
          fullWidth
          className="pl-9"
          placeholder="Search..."
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          variant="outlined"
        />
      </div>

      {teams.length > 0 && (
        <FormControl variant="outlined" className="min-w-[140px] max-w-[170px]">
          <InputLabel id="team-select-label">Team</InputLabel>
          <Select
            labelId="team-select-label"
            value={selectedTeam}
            onChange={(event) => setSelectedTeam(event.target.value)}
            label="Team"
          >
            {getTeamsOptions(teams).map((team) => (
              <MenuItem value={team.teamID.toString()} key={team.teamID}>
                {team.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <IconButton size="small" onClick={resetFilters}>
        X
      </IconButton>
    </div>
  );
};

export default SearchFilters;
