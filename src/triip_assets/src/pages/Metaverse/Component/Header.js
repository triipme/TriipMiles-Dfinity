import React from "react";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";

function Header() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);
  return (
    <>
      {/* BitMap */}
      <div className="sustainationBitMap">
        <div className="bitMapHeader">
          <div
            className="bitMapImg"
            style={
              width > "768"
                ? {
                    backgroundImage: `url(
                      "./images/static/SUSTAINATIONS/Bitmap.png"
                    )`
                  }
                : {
                    backgroundImage: `url(
                  "./images/static/SUSTAINATIONS/BitmapMobile.png"
                )`
                  }
            }
          />
          <div className="bitMapSub">
            <img
              src="./images/static/SUSTAINATIONS/SNS_game_map-06.png"
              alt="SnsGameMap"
              className="bitMapSubImg"
            />
            <h3 className="bitMapSubHeader">SUSTAINATIONS</h3>
            <div className="getStartedFooter">
              <a
                className="iconLink"
                target="_blank"
                href="https://twitter.com/triipme"
                rel="noreferrer">
                <button className="btn btnFollow ">
                  <Icon icon="iconoir:twitter" className="iconTwitter" />
                  Follow Us Now
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
