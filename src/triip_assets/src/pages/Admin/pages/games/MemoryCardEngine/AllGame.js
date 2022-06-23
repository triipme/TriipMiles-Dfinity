import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AllGame = () => {
  const [games, setGames] = useState();
  const { actor } = useSelector(state => state.user);
  async function memoryCardEngineAllGames() {
    try {
      const rs = await actor.memoryCardEngineAllGames();
      if ("ok" in rs) {
        setGames(rs.ok);
      } else {
        throw rs.err;
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    memoryCardEngineAllGames();
  }, []);
  return (
    <div style={{ height: 500, width: "100%", marginTop: 20 }}>
      {games?.length > 0 && (
        <DataGrid
          getRowId={row => row.gameId}
          rows={games.map(game => ({ ...game[1], gameId: game[0] }))}
          columns={Object.keys(games?.[0]?.[1]).map(key => ({
            field: key,
            headerName: key
          }))}
        />
      )}
    </div>
  );
};

export default AllGame;
