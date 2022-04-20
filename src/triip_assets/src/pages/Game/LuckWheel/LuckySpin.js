import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import "./LuckySpin.css";
LuckySpin.propTypes = {};

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
  overflowY: "auto",
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
  overflowY: "auto",
};
// Modal Reward

const styleReward = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: "50%",
  height: "50%",
  backgroundImage: `url("")`,
  backgroundColor: "#fff",
  borderRadius: "30px",
  border: "10px solid #f9dfc0",
  p: 3,
  zIndex: 999,
  overflowY: "auto",
};

function LuckySpin() {
  const [openRules, setOpenRules] = useState(false);
  const [openPrize, setOpenPrize] = useState(false);
  const [openReward, setOpenReward] = useState(false);

  const handleOpenRules = () => setOpenRules(true);
  const handleCloseRules = () => setOpenRules(false);

  const handleOpenPrize = () => setOpenPrize(true);
  const handleClosePrize = () => setOpenPrize(false);

  const handleOpenReward = () => setOpenReward(true);
  const handleCloseReward = () => setOpenReward(false);

  return (
    <>
      <div className="luckyWheelContainer">
        <div className="btnBack">
          <Icon icon="fa:angle-left" className="iconBackMain" />
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
              src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-strawberry-cream-cake-illustration-png-image_4692089.jpg"
              alt=""
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4dmVjyfKt9umK_xZyLvZ0lFsJSeNOB2CD9LX9EnOIHOxSBmTeZUL-UycnzUrQ-a96RfE&usqp=CAU"
              alt=""
            />
          </div>
        </div>
        <div className="btnLuckyWheelSpin">
          <button className="btnLuckyWheel btnSpin" onClick={handleOpenReward}>
            TAP TO SPIN (1 LEFT)
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
          {/* item */}
          <div className="prizeListContainer">
            <div className="imgPrizeList">
              <img
                src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-strawberry-cream-cake-illustration-png-image_4692089.jpg"
                alt=""
                className="itemImgPrize"
              />
            </div>
            <div class="itemContainer">
              <h3 className="itemName">Cakes</h3>
              <span className="itemDescription">
                You've earned 1 cakes in your inventory
              </span>
            </div>
          </div>

          {/* item */}

          <div className="prizeListContainer">
            <div className="imgPrizeList">
              <img
                src="https://media.istockphoto.com/vectors/good-luck-farewell-card-vector-lettering-vector-id1001515918?k=20&m=1001515918&s=612x612&w=0&h=LzmNtNxA5pczJrK2LzNfDdmyiK5ZxVpBtNZhQk_lePk="
                alt=""
                className="itemImgPrize"
              />
            </div>

            <div class="itemContainer">
              <h3 className="itemName">Sorry you didn’t win!</h3>
              <span className="itemDescription">Better Luck Next Time!</span>
            </div>
          </div>

          {/* item */}
          <div className="prizeListContainer">
            <div className="imgPrizeList">
              <img
                src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-strawberry-cream-cake-illustration-png-image_4692089.jpg"
                alt=""
                className="itemImgPrize"
              />
            </div>
            <div class="itemContainer">
              <h3 className="itemName">Cakes</h3>
              <span className="itemDescription">
                You've earned 1 cakes in your inventory
              </span>
            </div>
          </div>

          {/* item */}

          <div className="prizeListContainer">
            <div className="imgPrizeList">
              <img
                src="https://media.istockphoto.com/vectors/good-luck-farewell-card-vector-lettering-vector-id1001515918?k=20&m=1001515918&s=612x612&w=0&h=LzmNtNxA5pczJrK2LzNfDdmyiK5ZxVpBtNZhQk_lePk="
                alt=""
                className="itemImgPrize"
              />
            </div>

            <div class="itemContainer">
              <h3 className="itemName">Sorry you didn’t win!</h3>
              <span className="itemDescription">Better Luck Next Time!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Rules */}

      <Modal
        open={openRules}
        onClose={handleCloseRules}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleRules}>
          <div id="modal-modal-title">
            <div className="headerRules">
              <Icon
                icon="fa:angle-left"
                className="iconBack"
                onClick={handleCloseRules}
              />
              <h1 className="headingRules">RULES</h1>
            </div>
          </div>
          <div id="modal-modal-description">
            <ul className="listRules">
              <li>
                Apple,Inc, is not a sponsor of, or involved in any way with the
                Lucky Wheel of Triip app.
              </li>
              <li>Lucky Wheel is a simple game to test your luck daily.</li>
              <li>
                You can spin 1 time per day. Tap the button “TAP TO SPIN” to
                play the spin.
              </li>
              <li>
                Triip Pte, and Triip Protocol are the organizers of this game.
                Hence the judges.
              </li>
              <li>You must complete your information for eligibility.</li>
              <li>
                TriipMiles (TIIM) is the token of Triip app. You can use TIIM in
                app”.
              </li>
              <li>Prizes are distributed randomly.</li>
              <li>
                You can view your own prizes by tapping on YOUR PRIZE button.
              </li>
            </ul>
          </div>
        </Box>
      </Modal>
      {/* Modal Rules */}

      <Modal
        open={openPrize}
        onClose={handleClosePrize}
        aria-labelledby="modal-modal-title-prize"
        aria-describedby="modal-modal-description-prize"
      >
        <Box sx={stylePrize}>
          <div id="modal-modal-title-prize">
            <div className="headerPrize">
              <Icon
                icon="fa:angle-left"
                className="iconBack"
                onClick={handleClosePrize}
              />
              <h1 className="headingPrize">PRIZE LIST</h1>
            </div>
          </div>
          <div id="modal-modal-description-prize">
            <div className="prizeListContainer  rewardSpace">
              <div className="imgPrizeList">
                <img
                  src="https://media.istockphoto.com/vectors/good-luck-farewell-card-vector-lettering-vector-id1001515918?k=20&m=1001515918&s=612x612&w=0&h=LzmNtNxA5pczJrK2LzNfDdmyiK5ZxVpBtNZhQk_lePk="
                  alt=""
                  className="itemImgPrize"
                />
              </div>

              <div class="itemContainer">
                <h3 className="itemName">Sorry you didn’t win!</h3>
                <span className="itemDescription">Better Luck Next Time!</span>
              </div>
            </div>
            {/* item */}

            <div className="prizeListContainer rewardSpace">
              <div className="imgPrizeList">
                <img
                  src="https://media.istockphoto.com/vectors/good-luck-farewell-card-vector-lettering-vector-id1001515918?k=20&m=1001515918&s=612x612&w=0&h=LzmNtNxA5pczJrK2LzNfDdmyiK5ZxVpBtNZhQk_lePk="
                  alt=""
                  className="itemImgPrize"
                />
              </div>

              <div class="itemContainer">
                <h3 className="itemName">Sorry you didn’t win!</h3>
                <span className="itemDescription">Better Luck Next Time!</span>
              </div>
            </div>

            {/* item */}
            <div className="prizeListContainer rewardSpace">
              <div className="imgPrizeList">
                <img
                  src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-strawberry-cream-cake-illustration-png-image_4692089.jpg"
                  alt=""
                  className="itemImgPrize"
                />
              </div>
              <div class="itemContainer">
                <h3 className="itemName">Cakes</h3>
                <span className="itemDescription">
                  You've earned 1 cakes in your inventory
                </span>
              </div>
            </div>

            {/* item */}

            <div className="prizeListContainer rewardSpace">
              <div className="imgPrizeList">
                <img
                  src="https://media.istockphoto.com/vectors/good-luck-farewell-card-vector-lettering-vector-id1001515918?k=20&m=1001515918&s=612x612&w=0&h=LzmNtNxA5pczJrK2LzNfDdmyiK5ZxVpBtNZhQk_lePk="
                  alt=""
                  className="itemImgPrize"
                />
              </div>

              <div class="itemContainer">
                <h3 className="itemName">Sorry you didn’t win!</h3>
                <span className="itemDescription">Better Luck Next Time!</span>
              </div>
            </div>
          </div>
        </Box>
      </Modal>

      {/* Modal Reward */}
      <Modal
        open={openReward}
        onClose={handleCloseReward}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box style={styleReward} className="customDesktop customMobile">
          <Icon
            icon="fa:angle-left"
            className="iconBack-reward"
            onClick={handleCloseReward}
          />
          <div id="modal-modal-title">
            <div className="rewardHeader">
              <p className="rewardHeading">+1 CAKE</p>
            </div>
          </div>
          <div id="modal-modal-description">
            <div className="imageBodyReward">
              <img
                src="https://png.pngtree.com/png-clipart/20190921/original/pngtree-strawberry-cream-cake-illustration-png-image_4692089.jpg"
                alt=""
              />
            </div>
            <div>
              <button
                className="btnLuckyWheel btnReward"
                onClick={handleOpenPrize}
              >
                VIEW PRIZE
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default LuckySpin;
