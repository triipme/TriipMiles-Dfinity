import React from "react";
import LayoutAddPrize from "./prizes/handlePrizes/Layout";
import Prizes from "./prizes/Prizes";
import EditPrizes from "./prizes/handlePrizes/EditPrizes";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LuckyWheels from "./luckywheel/LuckyWheels";
import AddLuckyWheelsItem from "./luckywheel/handleLuckyWheels/AddLuckyWheelsItem";

function AdminLuckyWheels() {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Prizes />}></Route>
        <Route
          path="/triip-admin/dashboard/admin_luckywheel/prizes"
          exact
          element={<LayoutAddPrize />}></Route>
        <Route
          path="/triip-admin/dashboard/admin_luckywheel/prizes/edit"
          exact
          element={<EditPrizes />}></Route>
        <Route
          path="/triip-admin/dashboard/admin_luckywheel/lucky_wheels"
          exact
          element={<LuckyWheels />}></Route>
        <Route path="/lucky_wheels/new_wheel" exact element={<AddLuckyWheelsItem />}></Route>
      </Routes>
      {/* <LayoutAddPrize /> */}
    </div>
  );
}
export default AdminLuckyWheels;
