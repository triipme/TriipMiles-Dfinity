import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Box, Typography, Avatar } from "@mui/material";
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
    return list?.map((l, l_i) => {
      return {
        id: l_i,
        col1: String(l[0]?.uid),
        col2: parseInt(l[0]?.turn),
        col3: l[0]?.timing_play,
        col4: parseInt(l[0]?.turn) + l[0]?.timing_play
      };
    });
  }, [list]);
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "#",
        sortable: false,
        width: 10,
        renderCell: params => (
          <Avatar
            sx={{
              bgcolor: params.value === 0 ? "yellow" : "transparent",
              color: params.value === 0 ? "white" : "black",
              width: 24,
              height: 24
            }}>
            {params.value + 1}
          </Avatar>
        )
      },
      { field: "col1", headerName: "Name", width: 100, sortable: false },
      { field: "col2", headerName: "Total turn", sortable: false },
      { field: "col3", headerName: "Total time(s)", width: 110, sortable: false },
      { field: "col4" }
    ],
    []
  );

  return (
    <Box sx={{ height: "calc(100vh - 70px)", display: "grid", placeItems: "center" }}>
      <Stack alignItems="center">
        <Typography variant="h3" mb={3}>
          Leader Board
        </Typography>
        <div style={{ height: 300 }}>
          <DataGrid
            rows={rows ?? []}
            columns={columns}
            pageSize={10}
            sx={{ width: { md: 400, xs: 330 } }}
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
              },
              sorting: {
                sortModel: [{ field: "col4", sort: "asc" }]
              }
            }}
          />
        </div>
        <ButtonPrimary
          disabled={!!player?.[0]?.[0]}
          title={`Play`}
          sx={{ width: 100, mt: 3 }}
          onClick={handlePlay}
        />
      </Stack>
    </Box>
  );
};

export default MCEngineTop;
