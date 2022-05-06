import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Level from "../containers/Level";
import { Stack, Box } from "@mui/material";
import { ButtonPrimary } from "@/components";
import { useNavigate } from "react-router-dom";

const MCLevels = () => {
  const [levels, setLevels] = useState();
  const navigate = useNavigate();
  const { actor } = useSelector(state => state.user);
  useEffect(() => {
    (async () => {
      try {
        if (!!actor?.getAllLevel) {
          const levels = await actor.getAllLevel();
          if ("ok" in levels) {
            setLevels(levels.ok);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const handleLevel = lv_id => {
    navigate("/game/magic_memory/play", { state: { lv_id } });
  };
  return (
    <Box sx={{ height: "calc(100vh - 70px)", display: "grid", placeItems: "center" }}>
      <Stack>
        {levels?.map((level, index) => (
          <ButtonPrimary
            key={level}
            title={`Level ${index}`}
            sx={{ width: 100, mb: 1 }}
            onClick={() => handleLevel(level)}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default MCLevels;
