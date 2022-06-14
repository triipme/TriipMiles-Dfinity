import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Stack,
  Box,
  Typography,
  CardMedia,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Page from "../../components/Page";
import moment from "moment";
import { ButtonPrimary, InputText } from "@/components";
import { useForm } from "react-hook-form";
import { ERRORS } from "@/utils/constants";
import { Outlet, useNavigate } from "react-router-dom";

const games = [
  {
    name: "Magic Memory Language",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, veniam!",
    image:
      "https://media.istockphoto.com/vectors/memory-game-for-preschool-children-vector-id1092896082?k=20&m=1092896082&s=612x612&w=0&h=svAq2MxT5E9viByMj4r0JGzejZ_FM4qa93NExdDSqQk=",
    redirect: "vocalbulary"
  },
  {
    name: "Magic Memory Photo",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, veniam!",
    image:
      "https://media.istockphoto.com/vectors/memory-game-for-preschool-children-vector-id1092896082?k=20&m=1092896082&s=612x612&w=0&h=svAq2MxT5E9viByMj4r0JGzejZ_FM4qa93NExdDSqQk=",
    redirect: "engine"
  }
];

const GamesLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  function onPressGame(game_i) {
    navigate(games[game_i].redirect);
  }
  return (
    <Page title="Memory Game Engine | Triip Admin">
      <Stack direction={"row"}>
        {games.map((game, index) => (
          <Card sx={{ maxWidth: 240, mr: 2 }}>
            <Box sx={{ cursor: "pointer" }} onClick={() => onPressGame(index)}>
              <CardMedia component="img" height="140" image={game.image} alt={game.name} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {game.name}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        ))}
      </Stack>
    </Page>
  );
};

export default GamesLayout;
