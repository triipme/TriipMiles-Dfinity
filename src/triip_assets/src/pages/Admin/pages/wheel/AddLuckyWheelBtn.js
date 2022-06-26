import React from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "../prize/Prize.css";

function AddLuckyWheelBtn() {
  return (
    <div>
      {/* Button Add Prizes */}
      <div className="pull_right">
        <Link to="/triip-admin/dashboard/wheels/new" title="New LuckyWheel">
          <Icon icon="fluent:add-12-filled" style={{ fontSize: "20px" }} />
        </Link>
      </div>
    </div>
  );
}

export default AddLuckyWheelBtn;