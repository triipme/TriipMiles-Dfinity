import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Level from "../containers/Level";
import { Stack, Box, Typography } from "@mui/material";
import { ButtonPrimary } from "@/components";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
const MCLevels = () => {
  const [levels, setLevels] = useState();
  const [player, Game__GC_setPlayer] = useState();
  const [list, setList] = useState();
  const navigate = useNavigate();
  const { actor } = useSelector(state => state.user);
  async function initialEffect() {
    try {
      if (
        !!actor?.Game__GC_getAllLevel &&
        !!actor?.Game__GC_getPlayer &&
        !!actor?.Game__GC_listOfDay
      ) {
        const all = await Promise.all(
          [
            actor.Game__GC_getAllLevel(),
            actor.Game__GC_getPlayer([]),
            actor.Game__GC_listOfDay()
          ].map(data => data)
        );
        setLevels(all[0].ok);
        Game__GC_setPlayer(all[1]);
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
    navigate("/game/magic_memory/play", { state: { lv_id, id_player: player?.[0]?.[0] } });
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
      { field: "id", headerName: "#", sortable: false },
      { field: "col1", headerName: "Name", width: 100, sortable: false },
      { field: "col2", headerName: "Total turn", sortable: false },
      { field: "col3", headerName: "Total time(s)", sortable: false },
      { field: "col4" }
    ],
    []
  );

  return (
    <Box sx={{ height: "calc(100vh - 70px)", display: "grid", placeItems: "center" }}>
      <Stack alignItems="center">
        <div style={{ height: 300, width: 350 }}>
          <DataGrid
            rows={rows ?? []}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            disableColumnMenu
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
