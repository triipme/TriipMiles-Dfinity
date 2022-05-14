import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../containers/luckyWheel.css";
import { Link } from "react-router-dom";
import { Empty, Loading } from "../../../components";
import toast from "react-hot-toast";

import { spinResultsAPI } from "../../../slice/user/thunk";
import { spinRemainingAPI } from "../../../slice/user/thunk";

// Modal Rules
const styleRules = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  backgroundImage: "linear-gradient(to right,#1d4c96,#248cab)",
  p: 3,
  zIndex: 1000,
  overflowY: "auto"
};
// Modal Prize

const stylePrize = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "#f7c99b",
  p: 3,
  zIndex: 1000,
  overflowY: "auto"
};
// Modal Reward

const styleLoading = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50%",
  p: 3,
  zIndex: 999,
  overflowY: "hidden"
};

const LuckyWheel = () => {
  const { actor } = useSelector(state => state.user);
  const [openRules, setOpenRules] = useState(false);
  const [openPrize, setOpenPrize] = useState(false);
  const [openReward, setOpenReward] = useState(false);
  const [openLoading, setOpenLoading] = useState(false);
  const [isResultsLoading, setIsResultsLoading] = useState(false);
  const [currentReward, setCurrentReward] = useState(null);
  const dispatch = useDispatch();

  const handleOpenRules = () => setOpenRules(true);
  const handleCloseRules = () => setOpenRules(false);

  const handleOpenPrize = () => {
    setOpenReward(false);
    setOpenPrize(true);
  }
  const handleClosePrize = () => setOpenPrize(false);

  const handleCloseReward = () => setOpenReward(false);

  const { spinResults: spinResults } = useSelector(state => state.user);
  useEffect(() => {
    setIsResultsLoading(true);
    dispatch(spinResultsAPI());
    setIsResultsLoading(false);
  }, []);

  const { remainingSpinTimes: remainingSpinTimes } = useSelector(state => state.user);
  useEffect(() => {
    setIsResultsLoading(true);
    dispatch(spinRemainingAPI());
    setIsResultsLoading(false);
  }, []);

  const handleSpin = async () => {
    if(remainingSpinTimes > 0) {
      setOpenLoading(true);
      try {
        const result = await actor?.spinLuckyWheel();
        dispatch(spinRemainingAPI());
        dispatch(spinResultsAPI());
        setOpenLoading(false);
        if ("ok" in result) {
          setCurrentReward(result.ok);
          setOpenReward(true);
        } else {
          throw result?.err;
        }
      } catch (error) {
        setOpenLoading(false);
        toast.error(
          {
            "NotAuthorized": "Please sign in!.",
            "NotFound": "Please complete KYC first.",
            "NonKYC": "Please complete KYC first.",
            "Unavailable":
              "This service is temporary unavailable."
          }[Object.keys(error)[0]],
          { duration: 5000 }
        );
      }
    }
  };

  return (
    <>
      <div className="luckyWheelContainer">
        <div className="btnBack">
          <Link to="/game" style={{ color: "white" }}>
            <Icon icon="fa:angle-left" className="iconBackMain" />
          </Link>
        </div>
        <div className="luckyWheelHeader">
          <h1>LUCKY WHEEL</h1>
          <p>Come back everyday to try your luck</p>
          <p>Happy Travelling</p>
        </div>
        <div className="imgBox">
          <div className="imgContainer">
            <img
              src="https://png.pngtree.com/png-vector/20190328/ourlarge/pngtree-vector-water-bottle-icon-png-image_872322.jpg"
              alt=""
            />
            <img
              src="https://triip.imgix.net/triipme/prize/icon/12/triipmiles.jpg"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4dmVjyfKt9umK_xZyLvZ0lFsJSeNOB2CD9LX9EnOIHOxSBmTeZUL-UycnzUrQ-a96RfE&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <div className="btnLuckyWheelSpin">
          <button className="btnLuckyWheel btnSpin" onClick={handleSpin}>
            {remainingSpinTimes > 0 ? `TAP TO SPIN (${remainingSpinTimes} LEFT)` : "SORRY YOU'VE RUN OUT OF SPINS"}
          </button>
        </div>
        <div className="btnLuckyWheelOption">
          <button className="btnLuckyWheel btnOption" onClick={handleOpenRules}>
            RULES
          </button>
          <button className="btnLuckyWheel btnOption" onClick={handleOpenPrize}>
            YOUR PRIZE
          </button>
        </div>
        <div className="footerLuckyWheel">
          <div className="prizeHeading">PRIZE LIST</div>
          <div className="prizeListContainerAll">
            {isResultsLoading ? (
              <Loading height="70vh" />
            ) : spinResults?.length > 0 && (
              spinResults?.map((spinResult, _key) => (
                <SpinResultPrize spinResult={spinResult} />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Rules */}

      <Modal
        open={openRules}
        onClose={handleCloseRules}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={styleRules}>
          <div id="modal-modal-title">
            <div className="headerRules">
              <Icon icon="fa:angle-left" className="iconBack" onClick={handleCloseRules} />
              <h1 className="headingRules">RULES</h1>
            </div>
          </div>
          <div id="modal-modal-description">
            <ul className="listRules">
              <li>
                Dfinity.org, is not a sponsor of, or involved in any way with the Lucky Wheel of
                Triip app.
              </li>
              <li>Lucky Wheel is a simple game to test your luck daily.</li>
              <li>You can spin 1 time per day. Tap the button “TAP TO SPIN” to play the spin.</li>
              <li>
                Triip Pte, and Triip Protocol are the organizers of this game. Hence the judges.
              </li>
              <li>You must complete your information for eligibility.</li>
              <li>TriipMiles (TIIM) is the token of Triip app. You can use TIIM in app”.</li>
              <li>Prizes are distributed randomly.</li>
              <li>You can view your own prizes by tapping on YOUR PRIZE button.</li>
            </ul>
          </div>
        </Box>
      </Modal>
      {/* Modal Rules */}

      <Modal
        open={openPrize}
        onClose={handleClosePrize}
        aria-labelledby="modal-modal-title-prize"
        aria-describedby="modal-modal-description-prize">
        <Box sx={stylePrize}>
          <div id="modal-modal-title-prize">
            <div className="headerPrize">
              <Icon icon="fa:angle-left" className="iconBack" onClick={handleClosePrize} />
              <h1 className="headingPrize">PRIZE LIST</h1>
            </div>
          </div>
          <div id="modal-modal-description-prize">
            {spinResults?.length > 0 && (
              spinResults?.map((spinResult, _key) => (
                <SpinResultPrize spinResult={spinResult} />
              ))
            )}
          </div>
        </Box>
      </Modal>

      <Modal
        open={openLoading}
        onClose={handleClosePrize}
        aria-labelledby="modal-modal-title-prize"
        aria-describedby="modal-modal-description-prize">
        <Box sx={styleLoading}>
          <img
            style={{ border: "none" }}
            src="https://media3.giphy.com/media/2fNJsREcSgLZnumrAX/giphy.gif?cid=6c09b952qpl4usssf87enwjw4vgvg7c76m6fnadxdh6qine9&rid=giphy.gif&ct=s"
          />
        </Box>
      </Modal>
      {/* Modal Reward */}
      <Modal
        open={openReward}
        onClose={handleCloseReward}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box className="customDesktop customMobile styleReward">
          <Icon icon="fa:angle-left" className="iconBack-reward" onClick={handleCloseReward} />
          <div id="modal-modal-title">
            <div className="rewardHeader">
              <p className="rewardHeading">{currentReward?.prize_name}</p>
            </div>
          </div>
          <div id="modal-modal-description">
            <div className="imageBodyReward">
              <img
                src={currentReward?.icon}
                alt={currentReward?.prize_name}
              />
            </div>
            <div>
              <button className="btnLuckyWheel btnReward" onClick={handleOpenPrize}>
                VIEW PRIZE
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

const SpinResultPrize = ({ spinResult }) => {
  return (
    <div className="prizeListContainer" key={spinResult?.uuid}>
      <div className="imgPrizeList">
        <img
          src={spinResult?.icon}
          alt=""
          className="itemImgPrize"
        />
      </div>
      <div class="itemContainer">
        <h3 className="itemName">{spinResult.prize_name}</h3>
        <span className="itemDescription">{spinResult.remark}</span>
      </div>
    </div>
  )
};

export default LuckyWheel;
