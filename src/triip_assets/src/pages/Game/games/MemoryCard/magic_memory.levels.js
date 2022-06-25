import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Level from "../containers/Level";
import { Stack, Box, Typography, Avatar, Container, Alert } from "@mui/material";
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
    return list
      ?.map((l, l_i) => {
        const col2 = l[0]?.history?.reduce((a, b) => parseInt(a) + parseInt(b?.turn), 0n);
        const col3 = l[0]?.history?.reduce((a, b) => a + b?.timing_play, 0);
        return {
          col1: String(l[0]?.uid),
          col2,
          col3,
          col4: col2 + col3
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
        width: 10,
        headerClassName: "super-app-theme--header",
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
        headerAlign: "center",
        flex: 1,
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
            rows={rows ?? []}
            rowHeight={40}
            autoHeight
            hideFooter
            columns={columns}
            pageSize={10}
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
        {(player?.[0]?.[1].history.length ?? 0) < 3 && (
          <Alert severity="warning" sx={{ mt: 3 }}>
            You need to play all levels to be ranked on the Leaderboard and receice ICP
          </Alert>
        )}
        <Stack direction="row" mt={3}>
          {levels?.map((level, index) => (
            <ButtonPrimary
              key={level}
              disabled={player?.[0]?.[1].history.some(h => h.level === level)}
              title={`Level ${index}`}
              sx={{ width: 100, mr: index === levels.length ? 0 : 1 }}
              onClick={() => handleLevel(level)}
            />
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default MCLevels;
