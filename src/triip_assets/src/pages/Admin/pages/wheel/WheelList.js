import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import moment from "moment";
import _ from "lodash";
import NumberFormat from 'react-number-format';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid
} from "@mui/material";
import "./LuckyWheel.css";
import "../prize/Prize.css";
import {
  Link,
} from "react-router-dom";
import AddLuckyWheelBtn from "./AddLuckyWheelBtn";
import { fPercent } from "../../utils/formatNumber";
import Page from "../../components/Page";
import toast from "react-hot-toast";
import { Loading } from "../../../../components";

const LuckyWheels = () => {
  const { actor } = useSelector(state => state.user);
  const [toggleActive, setToggleActive] = useState("block");
  const handleToggleActiveUp = () => {
    setToggleActive("none");
  };
  const handleToggleActiveDown = () => {
    setToggleActive("block");
  };
  const [wheelList, setWheelList] = useState([]);
  const [activatedWheel, setActivatedWheel] = useState();
  const [prizes, setPrizes] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getWheels() {
    try {
      if (!!actor?.listWheels) {
        const list = await actor.listWheels();
        if ("ok" in list) {
          setWheelList(_.filter(list.ok, ['activate', false]));
          setActivatedWheel(_.find(list.ok, 'activate'));
        } else {
          throw list.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getPrizes() {
    try {
      if (!!actor?.listPrizes) {
        const list = await actor.listPrizes();
        if ("ok" in list) {
          setPrizes(list.ok);
          setLoading(false);
        } else {
          throw list.err;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getWheels();
  }, [actor]);

  useEffect(() => {
    getPrizes();
  }, [actor]);

  const handleActiveWheel = async (wheelId) => {
    try {
      const result = await actor?.activateWheel(wheelId);
      if ("ok" in result) {
        toast.success("Success !.");
        window.location.reload(false);
      } else {
        throw result?.err;
      }
    } catch (error) {
      toast.error(
        {
          "NotAuthorized": "Please sign in!.",
          "AdminRoleRequired": "Required admin role.",
          "NotFound": "Lucky Wheel is not found."
        }[Object.keys(error)[0]],
        { duration: 5000 }
      );
    }
  };

  if (loading) {
    return (
      <Loading />
    )
  }

  function renderPrize(wprize, index) {
    const prize = _.find(prizes, item => item.uuid[0] == wprize.prize_id);
    return (
      <TableBody className="table_container">
        <TableRow style={{ verticalAlign: "center" }}>
          <TableCell className="table_item" align="left">
            {index}
          </TableCell>
          <TableCell className="table_item" align="left">
            <p className="locale_en">{prize.name}</p>
          </TableCell>
          <TableCell className="table_item" align="left">
            <div style={{ maxWidth: "108px" }}>
              <img
                style={{ width: "85px" }}
                src={prize.icon}
                alt="img"
              />
            </div>
          </TableCell>
          <TableCell className="table_item" align="left">
            <p
              className="info-desc-en"
              style={{ marginBottom: "20px" }}
            >
              <NumberFormat
                value={prize?.quantity} displayType={'text'}
                thousandSeparator={true}
              />
            </p>
          </TableCell>
          <TableCell className="table_item" align="left">
            <p>{fPercent(wprize.percentage)}</p>
          </TableCell>
          <TableCell className="table_item" align="left">
            <p>{wprize.cap_per_user_per_month.toString()}</p>
          </TableCell>
          <TableCell className="table_item" align="left">
            <p>{wprize.cap_per_month.toString()}</p>
          </TableCell>
          <TableCell className="table_item" align="left">
            <p>{wprize.cap_per_day.toString()}</p>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  };

  function renderWheel(wheel, key) {
    return (
      <TableBody key={key} className="table_container">
        <TableRow key={wheel?.uuid} style={{ verticalAlign: "center", height: "70px" }}>
          <TableCell key={`uuid-${wheel?.uuid}`} className="table_item" align="left" >
            {wheel?.uuid}
          </TableCell>
          <TableCell key={`name-${wheel?.uuid}`} className="table_item" align="left" >
            <p>
              {wheel?.name}
            </p>
          </TableCell>
          <TableCell key={`max_spin_times-${wheel?.uuid}`} className="table_item" align="left" >
            <p>
              {parseInt(wheel?.max_spin_times)}
            </p>
          </TableCell>
          <TableCell key={`max_buy_spin_times-${wheel?.uuid}`} className="table_item" align="left" >
            <p>
              {parseInt(wheel?.max_buy_spin_times)}
            </p>
          </TableCell>
          <TableCell key={`price_of_spin-${wheel?.uuid}`} className="table_item" align="left" >
            <p>
              {wheel?.price_of_spin}
            </p>
          </TableCell>
          <TableCell key={`created_at-${wheel?.uuid}`} className="table_item" align="left" >
            <p>
              {formatDateTime(wheel?.created_at[0])}
            </p>
          </TableCell>
          <TableCell key={`updated_at-${wheel?.uuid}`} className="table_item" align="left" >
            <p>
              {formatDateTime(wheel?.updated_at[0])}
            </p>
          </TableCell>
          <TableCell className="table_item" align="left">
            <Link to={`/triip-admin/dashboard/wheels/edit/${wheel?.uuid}`} title="Edit Wheel">
              <button className="btn_actions btn_edit">
                <Icon icon="clarity:note-edit-line" />
              </button>
            </Link>
            <button onClick={() => handleActiveWheel(wheel?.uuid[0])} className="btn_actions btn_activate" style={{ width: "60%", marginBottom: "10px" }}>
              Activate
            </button>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  };

  return (
    <Page title="List Lucky Wheel | Triip Admin">
      {loading ? (<Loading />) :
        (
        <div className="prizes_content">
          <AddLuckyWheelBtn />
          {activatedWheel && (
            <div className="luckywheel_wrapper">
              <div className="luckywheel_header">
                <div className="luckywheel_title">ACTIVE WHEEL</div>
                <div className="luckywheel_control">
                  <Icon
                    icon="dashicons:arrow-up-alt2"
                    onClick={handleToggleActiveUp}
                    style={{ display: toggleActive }}
                    className="luckywheel_control_arrow"
                  />
                  <Icon
                    icon="dashicons:arrow-down-alt2"
                    className="luckywheel_control_arrow"
                    onClick={handleToggleActiveDown}
                    style={{ display: toggleActive === "block" ? "none" : "block" }}
                  />
                </div>
              </div>
              <div className="active_container" style={{ display: toggleActive }}>
                <div className="active_wheels">
                  <p>Id : {activatedWheel.uuid}</p>
                  <p>Name : {activatedWheel.name}</p>
                  <p>Max spin times : {activatedWheel.max_spin_times.toString()}</p>
                  <p>Max spin buy times : {activatedWheel.max_buy_spin_times.toString()}</p>
                  <p>Price of spin : {activatedWheel.price_of_spin}</p>
                  <p>Created at : {formatDateTime(activatedWheel.created_at[0])}</p>
                  <p>Activated at : {formatDateTime(activatedWheel.activated_at)}</p>
                  <p>Prizes</p>
                </div>
                <TableContainer className="prizes_container" component={Paper}>
                  <Grid
                    className="infor_manual"
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="flex-start"
                  >
                    {/* Prizes pagination and data infor */}

                    {/* Table Content List */}
                    <Table size="small" className="prizes_table">
                      <TableHead>
                        <TableRow>
                          <TableCell className="table_title" align="left">
                            #
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            TITLE
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            ICON
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            QUANTITY
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            PERCENTAGE
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            CAP PER USER PER MONTH
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            CAP PER MONTH
                          </TableCell>
                          <TableCell className="table_title" align="left">
                            CAP PER DAY
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      {/* Table Content Item */}
                      {activatedWheel.wheel_prizes.map((prize, index) => renderPrize(prize, index))}
                    </Table>
                  </Grid>
                  <div className="footter_edit">
                    <Link to={`/triip-admin/dashboard/wheels/edit/${activatedWheel.uuid}`}>
                      <button className="btn btn_edit_lkw">
                        <Icon icon="fa-solid:edit" className="footter_edit_icon" />
                      </button>
                    </Link>
                  </div>
                </TableContainer>
              </div>
            </div>
          )}
          {/* Table  LuckWheels */}
          {/* <AddPrizeItem /> */}
          <div className="luckywheel_wrapper">
            <div className="luckywheel_header">
              <div className="luckywheel_title">INACTIVE WHEELS</div>
            </div>
            <div className="active_container">
              <div className="active_wheels"></div>
              <TableContainer className="prizes_container" component={Paper}>
                <Grid
                  className="infor_manual"
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="flex-start"
                >
                  {/* Prizes pagination and data infor */}

                  {/* Table Content List */}
                  <Table size="small" className="prizes_table">
                    <TableHead>
                      <TableRow>
                        <TableCell className="table_title" align="left" style={{ width: "17%" }}>
                          #
                        </TableCell>
                        <TableCell className="table_title" align="left" style={{ width: "15%" }}>
                          NAME
                        </TableCell>
                        <TableCell className="table_title" align="left" >
                          MAX SPIN TIMES
                        </TableCell>
                        <TableCell className="table_title" align="left">
                          MAX SPIN BUY TIMES
                        </TableCell>
                        <TableCell className="table_title" align="left">
                          PRICE OF SPIN
                        </TableCell>
                        <TableCell className="table_title" align="left">
                          CREATED AT
                        </TableCell>
                        <TableCell className="table_title" align="left">
                          UPDATED AT
                        </TableCell>
                        <TableCell className="table_title" align="left">
                          ACTIONS
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    {/* Table Content Item */}
                    {wheelList?.map((wheel, key) => renderWheel(wheel, key))}
                  </Table>
                </Grid>
              </TableContainer>
            </div>
          </div>
          {/* Table  LuckWheels */}
        </div>
      )}
    </Page>
  );
};

function formatDateTime(number) {
  return moment.unix(parseInt(number / BigInt(1e9))).format("lll");
};

export default LuckyWheels;