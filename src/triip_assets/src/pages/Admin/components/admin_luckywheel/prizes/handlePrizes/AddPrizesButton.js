import React from "react";
import { Icon } from "@iconify/react";
import "../Prizes.css";
import { Link } from "react-router-dom";
function AddPrizesButton() {
  return (
    <div>
      {/* Button Add Prizes */}
      <div className="pull_right">
        <Link to="/triip-admin/dashboard/admin_prizes/prizes" title="New Prize">
          <Icon icon="fluent:add-12-filled" style={{ fontSize: "20px" }} />
        </Link>
      </div>
    </div>
  );
}

export default AddPrizesButton;
