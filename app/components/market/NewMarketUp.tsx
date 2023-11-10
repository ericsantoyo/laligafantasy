"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.min.css";
import tablePositions from "@/app/components/market/tableProps/tablePositions";
import tableValues from "@/app/components/market/tableProps/tableValues";
import tableClubLogos from "@/app/components/market/tableProps/tableClubLogos";
import tableSubidasBajadas from "@/app/components/market/tableProps/tableSubidasBajadas";
import tablePlayerNames from "@/app/components/market/tableProps/tablePlayerNames";
import tablePlayerImg from "@/app/components/market/tableProps/tablePlayerImg";
import { getAllPlayers, getAllStats } from "@/database/client";
import {
  getColor,
  formatDate,
  formatMoney,
  getWeeksTotalPointsFromStats,
} from "@/utils/utils";
// import { useTheme } from "next-themes";
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
import Paper from "@mui/material/Paper";
import { slugById } from "@/utils/utils";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { Card, CardFooter } from "@/components/ui/card";

const NewMarketUp = () => {
  const [rowData, setRowData] = useState();
  // const { theme } = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [gridClassName, setGridClassName] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // useEffect(() => {
  //   setGridClassName(
  //     theme === "light" ? "ag-theme-balham" : "ag-theme-balham-dark"
  //   );
  // }, [theme]);

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

  const { data: playersWithStats, error } = useSWR(
    ["getAllPlayers", "getAllStats"],
    async () => {
      const { allPlayers: players } = await getAllPlayers();
      const { allStats: stats } = await getAllStats();

      return formatPlayersWithStats(players, stats);
    }
  );

  useEffect(() => {
    if (playersWithStats) {
      setRowData(playersWithStats);
    }
  }, [playersWithStats]);

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
        const percentageChange =
          ((currentValue - previousValue) / previousValue) * 100; // Calculate the percentage change
        const newValue = currentValue; // Calculate the new value

        playerValueChanges.push({
          date: currentDate,
          valueChange,
          percentageChange,
          newValue, // Include the new value in the object
        });
      }

      // Reverse the array to display the most recent changes first
      const last20ValueChanges = playerValueChanges.reverse().slice(0, 30); // Slice to include only the last 30 entries

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
      minWidth: 90,
      sort: "desc",
      headerClass: "ag-center-header",
    
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
      headerClass: "ag-center-header",
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
      headerClass: "ag-center-header",
    },

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
            <Card className=" max-w-[400px] min-w-[350px] p-4 transition-all absolute outline-none rounded-md ">
              <Card className="p-4 flex flex-row justify-between items-center rounded-md ">
                <div className="flex flex-col justify-center items-start gap-2">
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
                        selectedPlayer.playerData.playerID,
                        rowData,
                        6
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
                    <div className="flex justify-between items-center text-center font-bold text-md uppercase max-w-[132px]">
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
              </Card>
              <Card className="h-[416px] pt-2 flex flex-col justify-between items-center rounded-md border-none shadow-none">
                <Table className="m-auto w-auto mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="h-2 font-extrabold text-left w-[70px] text-xs">
                        Fecha
                      </TableHead>
                      <TableHead className="h-2 font-extrabold text-center text-xs">
                        $ Cambio
                      </TableHead>
                      <TableHead className="h-2 flex flex-row justify-end   font-extrabold text-center text-xs">
                        <ChevronsDown
                          size={14}
                          className=" text-red-500 dark:text-red-400 "
                        />
                        %
                        <ChevronsUp
                          size={14}
                          className="text-green-600 dark:text-green-400 mr-2"
                        />
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
                        <TableCell className="text-left py-1 text-xs tabular-nums tracking-tight">
                          {formatDate(change.date)}
                        </TableCell>
                        <TableCell className="py-1 text-xs">
                          <div className="flex  flex-row items-center justify-end">
                            <div
                              className={`font-bold tabular-nums tracking-tight 
                                          ${
                                            change.valueChange < 0
                                              ? "text-red-500 dark:text-red-400"
                                              : "text-green-600 dark:text-green-400"
                                          }`}
                            >
                              {formatMoney(change.valueChange)}
                            </div>
                            {/* <div
                                                          className={`ml-2
                                          ${
                                            change.valueChange < 0
                                              ? "text-red-500 dark:text-red-400"
                                              : "text-green-600 dark:text-green-400"
                                          }`}
                            >
                              {change.valueChange < 0 ? (
                                <ChevronsDown size={14} />
                              ) : (
                                <ChevronsUp size={14} />
                              )}
                            </div> */}
                          </div>
                        </TableCell>
                        <TableCell className="py-1  ">
                          <div
                            className={`text-[11px] mr-2 font-semibold ml-2 tabular-nums tracking-tight text-right ${
                              change.percentageChange < 0
                                ? "text-red-500 dark:text-red-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            {change.percentageChange !== undefined
                              ? `${change.percentageChange.toFixed(2)}%`
                              : ""}
                          </div>
                        </TableCell>
                        <TableCell className="py-1 text-right text-xs  tabular-nums tracking-tighter	">
                          {formatMoney(change.newValue)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <CardFooter className="pt-4 pb-0 text-xs  font-extralight">
                  Cambios de Valor (Ultimos 30 Dias)
                </CardFooter>
              </Card>
            </Card>
          </Fade>
        </Modal>
      )}
      <Paper
        elevation={4}
        id="grid-wrapper"
        // className="overflow-hidden "
        className={
          "h-auto flex flex-col justify-start items-center transition-all"
        }
      >
        {/* Search Bar */}
        <Box className="flex flex-row justify-between items-center w-full h-16 px-3">
          <span className="flex justify-center items-center md:text-lg font-semibold mr-2 w-full text-center">
            <ChevronsUp
              size={24}
              className="text-green-600 dark:text-green-400 mr-2"
            />{" "}
            Ultimas Subidas
          </span>
          <div className="relative w-full flex flex-row justify-center items-center">
            <Search className="absolute h-4 w-4 top-[10px] left-4 text-muted-foreground" />
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
        </Box>

        <div id="myGrid" className={`ag-theme-balham w-full  transition-all`}>
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
      </Paper>
    </>
  );
};

export default NewMarketUp;
