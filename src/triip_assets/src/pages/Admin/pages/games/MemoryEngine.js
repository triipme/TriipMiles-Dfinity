import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Stack, Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../components/Page";
import moment from "moment";
import { ButtonPrimary, InputText } from "@/components";
import { useForm } from "react-hook-form";
import { ERRORS } from "@/utils/constants";

const MemoryEngine = () => {
  return (
    <Page title="Memory Game Engine | Triip Admin">
      <Box>
        <TopOfYesterday />
        <ListOfDay />
        <ListAll />
      </Box>
    </Page>
  );
};
const ListAll = () => {
  const [list, setList] = useState();
  const { actor } = useSelector(state => state.user);
  async function initialEffect() {
    try {
      if (!!actor?.gameGcEngineListAll) {
        const rs_list = await actor.gameGcEngineListAll();
        if ("ok" in rs_list) setList(rs_list.ok);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    initialEffect();
  }, []);
  const rows = useMemo(() => {
    return list?.map((l, l_i) => {
      const col2 = parseInt(l?.turn);
      const col3 = l?.timing_play;
      return {
        id: l_i,
        col1: String(l?.uid),
        col2,
        col3,
        col4: col2 + col3,
        col6: moment.unix(parseInt(l.createdAt / BigInt(1e9))).format("L"),
        col7: moment.unix(parseInt(l.updatedAt / BigInt(1e9))).format("LLL")
      };
    });
  }, [list]);
  const columns = useMemo(
    () => [
      { field: "col1", headerName: "Name", width: 500 },
      { field: "col2", headerName: "Total turn" },
      { field: "col3", headerName: "Total time(s)" },
      { field: "col4" },
      { field: "col6", headerName: "CreatedAt", width: 200 },
      { field: "col7", headerName: "UpdatedAt", width: 200 }
    ],
    []
  );

  return (
    <Box width="100%">
      <Typography variant="h1" align="center">
        Player List
      </Typography>
      <DataGrid
        rows={rows ?? []}
        autoHeight
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
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
    </Box>
  );
};
const ListOfDay = () => {
  const [list, setList] = useState();
  const { actor } = useSelector(state => state.user);
  async function initialEffect() {
    try {
      if (!!actor?.gameGcEngineListOfDay) {
        const rs_list = await actor.gameGcEngineListOfDay();
        if ("ok" in rs_list) setList(rs_list.ok);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    initialEffect();
  }, []);
  const rows = useMemo(() => {
    return list?.map((l, l_i) => {
      const col2 = parseInt(l[0].turn);
      const col3 = l[0].timing_play;
      return {
        id: l_i,
        col1: String(l[0].uid),
        col2,
        col3,
        col4: col2 + col3
      };
    });
  }, [list]);
  const max = useMemo(() => {
    if (rows?.length > 1) {
      return rows?.reduce((a, b) => {
        return a?.col4 < b?.col4 ?? 10e9 ? a : b;
      });
    } else {
      return rows?.[0];
    }
  }, [rows]);
  const columns = useMemo(
    () => [
      { field: "id", headerName: "#" },
      { field: "col1", headerName: "Name", width: 500, sortable: false },
      { field: "col2", headerName: "Total turn", sortable: false },
      { field: "col3", headerName: "Total time(s)", sortable: false },
      { field: "col4" }
    ],
    []
  );

  return (
    <Box>
      <Typography variant="h1" align="center">
        Top of Today
      </Typography>
      <Box width="100%">
        <DataGrid
          autoHeight
          rows={rows ?? []}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
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
      </Box>
    </Box>
  );
};
const TopOfYesterday = () => {
  const { actor } = useSelector(state => state.user);
  const [top, setTop] = useState();
  const [disableReward, setDisableReward] = useState(true);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  async function initialTopOne() {
    try {
      if (!!actor?.gameGcEngineListOfYesterday) {
        const rs_list = await actor.gameGcEngineListOfYesterday();
        if ("ok" in rs_list) {
          setTop(topOne(rs_list.ok));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function checkReward(id) {
    try {
      if (!!actor?.gameGcEngineCheckReward) {
        const rs = await actor.gameGcEngineCheckReward(id);
        if ("ok" in rs) {
          setDisableReward(!!rs.ok[0]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    initialTopOne();
  }, []);
  useLayoutEffect(() => {
    if (!!top) {
      checkReward(top?.[0]);
    }
  }, [top]);
  const handleReward = async data => {
    try {
      if (!!actor?.gameGcEngineReward) {
        setLoading(true);
        const rs_reward = await actor.gameGcEngineReward(top?.[0], +data.reward, top?.[1]?.uid);
        if ("ok" in rs_reward) {
          setDisableReward(true);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Typography variant="h1" align="center">
        Top of Yesterday
      </Typography>
      <Typography variant="h5" align="center">
        {String(top?.[1]?.uid ?? "No one")}
      </Typography>
      <Typography variant="h4" align="center">
        total turn {top?.[1]?.turn ?? 0}
      </Typography>
      <Typography variant="h4" align="center">
        total time {top?.[1]?.timing_play ?? 0}
      </Typography>

      <Stack
        width="10em"
        alignItems="center"
        justifyContent="center"
        direction="row"
        mx="auto"
        my={3}>
        {!!!disableReward && (
          <>
            <InputText control={control} label="Reward" name="reward" helperTextError={ERRORS} />
            <ButtonPrimary
              loading={loading}
              title="Reward"
              sx={{ width: 100, ml: 1 }}
              onClick={handleSubmit(handleReward)}
            />
          </>
        )}
      </Stack>
    </Box>
  );
};

function topOne(list) {
  return list.sort(compare)[0][0];
}

function compare(a, b) {
  const score = array => {
    const sum_turn = parseInt(array.turn);
    const sum_time = array.timing_play;
    return sum_turn + sum_time;
  };
  if (score(a[0][0][1]) < score(b[0][0][1])) {
    return -1;
  } else if (score(a[0][0][1]) > score(b[0][0][1])) {
    return 1;
  } else {
    return 0;
  }
}
export default MemoryEngine;
