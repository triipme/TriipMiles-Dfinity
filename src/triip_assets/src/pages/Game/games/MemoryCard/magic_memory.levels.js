import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Level from "../containers/Level";
import { Stack, Box, Typography, Avatar } from "@mui/material";
import { ButtonPrimary } from "@/components";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const MCLevels = () => {
  const [levels, setLevels] = useState();
  const [player, gameGcSetPlayer] = useState();
  const [list, setList] = useState();
  const navigate = useNavigate();
  const { actor } = useSelector(state => state.user);
  async function initialEffect() {
    try {
      if (!!actor?.gameGcGetAllLevel && !!actor?.gameGcGetPlayer && !!actor?.gameGcListOfDay) {
        const all = await Promise.all(
          [actor.gameGcGetAllLevel(), actor.gameGcGetPlayer([]), actor.gameGcListOfDay()].map(
            data => data
          )
        );
        setLevels(all[0].ok);
        gameGcSetPlayer(all[1]);
        setList(all[2].ok);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    initialEffect();
  }, []);
  const handleLevel = lv_id => {
    console.log(player);
    navigate("/game/magic-memory-language/play", { state: { lv_id, player_id: player?.[0]?.[0] } });
  };
  const rows = useMemo(() => {
    return list?.map((l, l_i) => {
      const col2 = l[0]?.history?.reduce((a, b) => parseInt(a) + parseInt(b?.turn), 0n);
      const col3 = l[0]?.history?.reduce((a, b) => a + b?.timing_play, 0);
      return {
        id: l_i,
        col1: String(l[0]?.uid),
        col2,
        col3,
        col4: col2 + col3
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
        <Box
          sx={{
            height: 300,
            "& .cold": {
              backgroundColor: "#b9d5ff91",
              color: "#1a3e72"
            },
            "& .hot": {
              backgroundColor: "#ff943975",
              color: "#1a3e72"
            }
          }}>
          <DataGrid
            rows={rows ?? []}
            columns={columns}
            pageSize={10}
            sx={{ width: { md: 400, xs: 330 } }}
            rowsPerPageOptions={[10]}
            disableColumnMenu
            pagination
            components={{
              NoRowsOverlay: () => (
                <Typography sx={{ height: "100%", display: "grid", placeItems: "center" }}>
                  Be the first player today
                </Typography>
              )
            }}
            // getCellClassName={params => {
            //   if (params.field === "id" || params.value == null) {
            //     return params.value === 0 && "hot";
            //   }
            //   return "";
            // }}
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
        </Box>
        <Stack my={3}>
          {levels?.map((level, index) => (
            <ButtonPrimary
              key={level}
              disabled={player?.[0]?.[1].history.some(h => h.level === level)}
              title={`Level ${index}`}
              sx={{ width: 100, mb: 1 }}
              onClick={() => handleLevel(level)}
            />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default MCLevels;
