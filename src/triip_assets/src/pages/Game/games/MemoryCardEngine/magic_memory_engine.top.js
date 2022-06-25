import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Box, Typography, Avatar, Container } from "@mui/material";
import { ButtonPrimary } from "@/components";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const MCEngineTop = () => {
  const [player, setPlayer] = useState();
  const [list, setList] = useState();
  const navigate = useNavigate();
  const { actor } = useSelector(state => state.user);
  async function initialEffect() {
    try {
      if (!!actor?.gameGcEngineGetPlayer && !!actor?.gameGcEngineListOfDay) {
        const all = await Promise.all(
          [actor.gameGcEngineGetPlayer(), actor.gameGcEngineListOfDay()].map(data => data)
        );
        setPlayer(all[0]);
        setList(all[1].ok);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    initialEffect();
  }, []);
  const handlePlay = () => {
    navigate("/game/magic-memory-photo/play", { state: { player_id: player?.[0]?.[0] } });
  };
  const rows = useMemo(() => {
    return list
      ?.map((l, l_i) => {
        return {
          id: l_i,
          col1: String(l[0]?.uid),
          col2: parseInt(l[0]?.turn),
          col3: l[0]?.timing_play,
          col4: parseInt(l[0]?.turn) + l[0]?.timing_play
        };
      })
      .sort((a, b) => a.col4 - b.col4)
      .map((row, id) => ({ ...row, id }));
  }, [list]);

  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "#",
        sortable: false,
        headerClassName: "super-app-theme--header",
        headerAlign: "center",
        align: "center",
        width: 10,
        renderCell: params => (
          <Avatar
            sx={{
              bgcolor: params.value === 0 ? "yellow" : "transparent",
              color: params.value === 0 ? "white" : "black",
              width: 24,
              height: 24,
              fontSize: 16
            }}>
            {params.value + 1}
          </Avatar>
        )
      },
      {
        field: "col1",
        headerName: "Name",
        headerClassName: "super-app-theme--header",
        minWidth: 100,
        flex: 1,
        headerAlign: "center",
        sortable: false
      },
      {
        field: "col2",
        headerName: "Total turn",
        headerClassName: "super-app-theme--header",
        flex: 1,
        maxWidth: 130,
        align: "center",
        headerAlign: "center",
        sortable: false
      },
      {
        field: "col3",
        headerName: "Total time(s)",
        headerClassName: "super-app-theme--header",
        flex: 1,
        maxWidth: 130,
        align: "center",
        headerAlign: "center",
        sortable: false
      },
      { field: "col4" }
    ],
    []
  );
  return (
    <Container
      sx={{
        height: "calc(100vh - 70px)",
        display: "grid",
        placeItems: "center",
        width: { md: 600 }
      }}>
      <Stack alignItems="center" width="100%">
        <Typography variant="h3" mb={3}>
          Leaderboard
        </Typography>
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--header": {
              bgcolor: "primary.main",
              color: "white.main"
            }
          }}>
          <DataGrid
            autoHeight
            getRowId={row => row.col1}
            rows={rows ?? []}
            rowHeight={40}
            hideFooter
            columns={columns}
            pageSize={10}
            sx={
              {
                // "& .MuiDataGrid-row": { border: "1px solid black" }
              }
            }
            rowsPerPageOptions={[10]}
            disableColumnMenu
            components={{
              NoRowsOverlay: () => (
                <Typography sx={{ height: "100%", display: "grid", placeItems: "center" }}>
                  Be the first player today
                </Typography>
              )
            }}
            pagination
            initialState={{
              columns: {
                columnVisibilityModel: {
                  col4: false
                }
              }
              // sorting: {
              //   sortModel: [{ field: "col4", sort: "asc" }]
              // }
            }}
          />
        </Box>
        <ButtonPrimary
          disabled={!!player?.[0]?.[0]}
          title={`Play`}
          sx={{ width: 100, mt: 3 }}
          onClick={handlePlay}
        />
      </Stack>
    </Container>
  );
};

export default MCEngineTop;
