import React from "react";
import { Icon } from "@iconify/react";
import "./Prize.css";
import { Link } from "react-router-dom";
function AddPrizeBtn() {
  return (
    <div>
      {/* Button Add Prizes */}
      <div className="pull_right">
        <Link to="/triip-admin/dashboard/prizes/new" title="New Prize">
          <Icon icon="fluent:add-12-filled" style={{ fontSize: "20px" }} />
        </Link>
      </div>
    </div>
  );
}

export default AddPrizeBtn;