import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

const games = [
  {
    name: "Magic Memory Language",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, veniam!",
    image:
      "https://media.istockphoto.com/vectors/memory-game-for-preschool-children-vector-id1092896082?k=20&m=1092896082&s=612x612&w=0&h=svAq2MxT5E9viByMj4r0JGzejZ_FM4qa93NExdDSqQk=",
    redirect: "/game/magic-memory-language"
  },
  {
    name: "Magic Memory Photo",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, veniam!",
    image:
      "https://media.istockphoto.com/vectors/memory-game-for-preschool-children-vector-id1092896082?k=20&m=1092896082&s=612x612&w=0&h=svAq2MxT5E9viByMj4r0JGzejZ_FM4qa93NExdDSqQk=",
    redirect: "/game/magic-memory-photo"
  },
  {
    name: "Lucky Wheel",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor, veniam!",
    image:
      "https://media.istockphoto.com/vectors/wheel-of-fortune-vector-illustration-of-a-flat-empty-colorful-wheel-vector-id1150678397?k=20&m=1150678397&s=612x612&w=0&h=tn90Ky0b1G7R4NrmgxFx7FkahFUhzn9ZBTfUFdB3SRc=",
    redirect: "/game/lucky_wheel"
  }
];

function Game() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  function onPressGame(game_i) {
    navigate(games[game_i].redirect);
  }
  return (
    <Box
      sx={{
        height: matches ? "auto" : "calc(100vh - 70px)",
        display: "grid",
        placeItems: "center"
      }}>
      <Stack direction={matches ? "column" : "row"}>
        {games.map((game, index) => (
          <Card sx={{ maxWidth: 240, mr: matches ? 0 : 2, my: matches ? 2 : 0 }}>
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
    </Box>
  );
}

export default Game;
