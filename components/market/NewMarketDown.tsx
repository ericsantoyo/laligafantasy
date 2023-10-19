"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.min.css";
import tablePositions from "./tableProps/tablePositions";
import tableValues from "./tableProps/tableValues";
import tableClubLogos from "./tableProps/tableClubLogos";
import tableSubidasBajadas from "./tableProps/tableSubidasBajadas";
import tablePlayerNames from "./tableProps/tablePlayerNames";
import tablePlayerImg from "./tableProps/tablePlayerImg";
import { getAllPlayers, getAllStats } from "@/database/client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { ChevronsDown, ChevronsUp } from "lucide-react";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";

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

function slugById(playerID) {
  const team = teamsSlugsByID.find((team) => team.id === playerID);

  const slug = team ? team.slug : "Not Wrong Found";

  return slug;
}

const getColor = (points) => {
  if (points >= 10) return "bg-green-600 text-neutral-50 font-bold text-shadow";
  if (points >= 5) return "bg-green-500 text-neutral-50 font-bold text-shadow";
  if (points >= 2) return "bg-orange-500 text-neutral-50 font-bold text-shadow";
  if (points >= 0) return "bg-red-500 text-neutral-50 font-bold text-shadow";
  return "bg-red-700 text-neutral-50 font-bold text-shadow";
};

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { month: "short", day: "numeric" };
  return date.toLocaleDateString(undefined, options);
}

function formatMoney(value) {
  const formatter = new Intl.NumberFormat("en-GB", {});
  const formattedValue = formatter.format(value);
  return formattedValue;
}

const NewMarketDown = () => {
  const [rowData, setRowData] = useState();
  const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [gridClassName, setGridClassName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setGridClassName(
      theme === "light" ? "ag-theme-balham" : "ag-theme-balham-dark"
    );
  }, [theme]);

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

  useEffect(() => {
    async function fetchData() {
      // setIsLoading(true);
      const { allPlayers: players } = await getAllPlayers();
      const { allStats: stats } = await getAllStats();

      if (players && stats) {
        const playersWithStats = formatPlayersWithStats(players, stats);
        // console.log(formattedPlayers);
        setRowData(playersWithStats);
      }
    }
    fetchData();
  }, []);

  //playersWithStats
  const prepareValueChangesData = (playerId) => {
    const playerData = rowData.find(
      (player) => player.playerData.playerID === playerId
    );

    if (playerData) {
      const playerValueChanges = [];

      for (let i = 1; i < playerData.playerData.marketValues.length; i++) {
        const currentDate = playerData.playerData.marketValues[i].date;
        const previousDate = playerData.playerData.marketValues[i - 1].date;
        const currentValue = playerData.playerData.marketValues[i].marketValue;
        const previousValue =
          playerData.playerData.marketValues[i - 1].marketValue;

        const valueChange = currentValue - previousValue;
        const newValue = currentValue; // Calculate the new value

        playerValueChanges.push({
          date: currentDate,
          valueChange,
          newValue, // Include the new value in the object
        });
      }

      // Reverse the array to display the most recent changes first
      const last20ValueChanges = playerValueChanges.reverse().slice(0, 14); // Slice to include only the last 20 entries

      return last20ValueChanges;
    }
    return [];
  };

  const [columnDefs, setColumnDefs] = useState([
    {
      field: "playerData.playerID",
      headerName: "",
      minWidth: 60,
      maxWidth: 70,
      cellRenderer: tablePlayerImg,
    },
    {
      field: "playerData.nickname",
      headerName: "Nombre",
      minWidth: 110,
      cellRenderer: tablePlayerNames,
    },
    {
      field: "playerData.lastMarketChange",
      headerName: "Subida",
      minWidth: 70,
      sort: "asc",
      cellRenderer: tableSubidasBajadas,
    },
    {
      field: "playerData.teamName",
      headerName: "",
      minWidth: 50,
      cellRenderer: tableClubLogos,
    },
    {
      field: "playerData.marketValue",
      headerName: "$ Actual",
      minWidth: 80,
      headerClass: "flex justify-center items-center",
      cellRenderer: tableValues,
    },
    {
      field: "playerData.previousMarketValue",
      headerName: "$ Previo",
      minWidth: 80,
      cellRenderer: tableValues,
    },

    {
      field: "playerData.positionID",
      headerName: "Pos",
      minWidth: 65,
      cellRenderer: tablePositions,
    },
    // {
    //   field: "teamName",
    //   headerName: "",
    //   minWidth: 1,
    //   maxWidth: 1,
    // },
  ]);

  const defaultColDef = {
    resizable: false,
    sortable: false,
    filter: false,
  };

  const gridRef = useRef();
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const onGridSizeChanged = useCallback((params) => {
    // get the current grids width
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
    // keep track of which columns to hide/show
    var columnsToShow = [];
    var columnsToHide = [];
    // iterate over all columns (visible or not) and work out
    // now many columns can fit (based on their minWidth)
    var totalColsWidth = 0;
    var allColumns = gridRef.current.columnApi.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (var i = 0; i < allColumns.length; i++) {
        var column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    // show/hide columns based on current grid width
    gridRef.current.columnApi.setColumnsVisible(columnsToShow, true);
    gridRef.current.columnApi.setColumnsVisible(columnsToHide, false);
    // fill out any available space to ensure there are no gaps
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  function onGridReady(params) {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  }
  const onFilterTextChange = (e) => {
    gridApi.setQuickFilter(e.target.value);
  };

  function getWeeksTotalPointsFromStats(playerId) {
    const selectedPlayerData = rowData.find(
      (player) => player.playerData.playerID === playerId
    );
    const player = selectedPlayerData.playerData;
    const stats = selectedPlayerData.stats;
    const maxWeeks = 6; // Maximum number of weeks to display
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
    // console.log(points);
    return points;
  }
  return (
    <>
      {selectedPlayer && (
        <Modal
          open={open}
          onClose={handleClose}
          closeAfterTransition

          // sx={{ backgroundColor: "rgba(255, 255, 255, 0.8)", zIndex: 1 }}
          slots={{
            backdrop: Backdrop,
          }}
          slotProps={{
            backdrop: {
              timeout: 400,
            },
          }}
          className="flex justify-center items-center h-screen"
        >
          <Fade
            in={open}
            // timeout={{ enter: 100, exit: 100 }}
            // style={{ transitionDelay: open ? "0ms" : "0ms" }} // Adjust this value
          >
            <Box className=" max-w-[350px] pt-6 pb-5 px-3 bg-neutral-100 dark:bg-neutral-600 text-neutral-800 dark:text-neutral-100 transition-all relative outline-none rounded-md ">
              <div className="mx-6 flex flex-row justify-between items-center">
                <div className="flex flex-col justify-center items-center gap-2">
                  <div className="flex flex-col justify-center items-start gap-y-1 text-sm">
                    <div className="flex flex-row justify-center items-center gap-x-2">
                      Puntos:{" "}
                      <div className="font-bold">
                        {selectedPlayer.playerData.points}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-x-2">
                      Promedio:{" "}
                      <div className="font-bold">
                        {selectedPlayer.playerData.averagePoints.toFixed(2)}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-x-2">
                      Precio:{" "}
                      <div className="font-bold">
                        {formatMoney(selectedPlayer.playerData.marketValue)}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center items-end gap-y-1">
                    <div className="flex flex-row justify-center items-center text-xs">
                      Ultimas 5 Jornadas
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                      {getWeeksTotalPointsFromStats(
                        selectedPlayer.playerData.playerID
                      ).map((point) => (
                        <div
                          className="flex flex-col justify-center items-center "
                          key={point.week}
                        >
                          <div
                            className={`text-center border-[0.5px] w-5 h-5 border-neutral-700   rounded-sm  flex justify-center items-center  ${getColor(
                              point.points
                            )}`}
                          >
                            <p
                              className={`text-[12px] items-center align-middle`}
                            >
                              {point.points}
                            </p>
                          </div>
                          <div className="text-center text-[11px]">
                            J{point.week}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center gap-y-2">
                  <div className="flex flex-col justify-center items-center gap-1">
                    <Image
                      src={selectedPlayer.playerData.image}
                      alt={selectedPlayer.playerData.nickname}
                      width={64}
                      height={64}
                      className="h-16 w-auto "
                    />
                    <div className="flex justify-between items-center text-center font-bold text-md uppercase">
                      {selectedPlayer.playerData.nickname}
                    </div>
                  </div>
                  <Image
                    src={`/teamLogos/${slugById(
                      selectedPlayer.playerData.teamID
                    )}.png`}
                    alt={selectedPlayer.playerData.teamName}
                    width={48}
                    height={48}
                    className="h-6 w-auto"
                  />
                </div>
              </div>
              <Table className="m-auto w-auto mt-4">
                <TableCaption className="text-xs font-extralight">
                  Cambios de Valor (Ultimos 14 Dias)
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="h-2 font-extrabold text-left w-[100px] text-xs">
                      Fecha
                    </TableHead>
                    <TableHead className="h-2 font-extrabold text-center text-xs">
                      $ Cambio
                    </TableHead>
                    <TableHead className="h-2 font-extrabold text-right text-xs">
                      $ Actual
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prepareValueChangesData(
                    selectedPlayer.playerData.playerID
                  ).map((change, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-left py-[4px]  text-xs">
                        {formatDate(change.date)}
                      </TableCell>
                      <TableCell
                        className={`py-[4px] flex flex-row justify-end items-center text-xs`}
                      >
                        <div
                          className={`flex justify-center items-center h-full font-bold
               ${
                 change.valueChange < 0
                   ? "text-red-500 dark:text-red-400 h-full"
                   : "text-green-600 dark:text-green-400 h-full"
               }`}
                        >
                          {formatMoney(change.valueChange)}
                        </div>
                        <div
                          className={`flex justify-center items-center h-full ml-2
               ${
                 change.valueChange < 0
                   ? "text-red-500 dark:text-red-400 "
                   : "text-green-600 dark:text-green-400"
               }`}
                        >
                          {change.valueChange < 0 ? (
                            <ChevronsDown size={14} />
                          ) : (
                            <ChevronsUp size={14} />
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-[4px] text-right text-xs">
                        {formatMoney(change.newValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Fade>
        </Modal>
      )}
      <div
        id="grid-wrapper"
        // className="overflow-hidden "
        className={
          "flex flex-col rounded-md border-[1px] border-neutral-300 shadow-neutral-300 dark:border-neutral-700 shadow dark:shadow-neutral-800"
        }
      >
        {/* Search Bar */}
        <div className="flex justify-center items-center m-3 h-10">
          <span className="flex justify-center items-center md:text-lg font-semibold mr-2 w-full text-center">
            Ultimas Bajadas
          </span>
          <div className="relative w-full">
            <Search className="absolute h-4 w-4 top-3 left-4 text-muted-foreground" />
            <Input
              type="search"
              onChange={onFilterTextChange}
              placeholder="Buscar..."
              className="pl-10 outline-none
              dark:bg-neutral-200 dark:placeholder-neutral-800 
              dark:text-neutral-800
        "
            />
          </div>
        </div>

        <div className={`${gridClassName} w-full transition-all`}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            onGridReady={onGridReady}
            ref={gridRef}
            domLayout={"autoHeight"}
            pagination={true}
            animateRows={true}
            defaultColDef={defaultColDef}
            paginationPageSize={24}
            onFirstDataRendered={onFirstDataRendered}
            onGridSizeChanged={onGridSizeChanged}
            suppressCellFocus={true}
            suppressMovableColumns={true}
            onRowClicked={(event) => {
              setSelectedPlayer(event.data);
              handleOpen();
            }}
          ></AgGridReact>
        </div>
      </div>
    </>
  );
};

export default NewMarketDown;
