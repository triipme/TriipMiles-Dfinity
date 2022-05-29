import React from "react";
import { Icon } from "@iconify/react";
import "../../prizes/Prizes.css";
import { Link } from "react-router-dom";
function AddLuckyWheelButton() {
  return (
    <div>
      {/* Button Add Prizes */}
      <div className="pull_right">
        <Link to="/triip-admin/dashboard/admin_luckywheel/new_wheel" title="New LuckyWheel">
          <Icon icon="fluent:add-12-filled" style={{ fontSize: "20px" }} />
        </Link>
      </div>
    </div>
  );
}

export default AddLuckyWheelButton;
