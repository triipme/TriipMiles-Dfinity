import React from "react";
import { Icon } from "@iconify/react";

function GetStartedComp() {
  return (
    <>
      {/* Get Started */}
      <div className="sustainationStarted">
        <img
          src="./images/static/SUSTAINATIONS/artworks.png"
          alt="artWorks"
          className="StartedImg"
        />
        <img
          src="./images/static/SUSTAINATIONS/artworks1.png"
          alt="artWorks"
          className="StartedImg1"
        />
        <p className="sustainationStartedHeader">It’s easy to get started</p>
        <div className="startedContainer">
          <div className="startedBox">
            <div className="startedContainerImg">
              <img src="./images/static/SUSTAINATIONS/started1.png" alt="started1" />
            </div>
            <p className="startedContainerImgTitle">
              <span className="span1">1.</span>Create Internet Computer account
            </p>
            <p className="startedContainerImgSubTitle">
              Signing up at
              <a target="_blank" href="http://identity.ic0.app" rel="noreferrer">
                http://identity.ic0.app
              </a>
            </p>
          </div>
          {/* 2 */}
          <div className="startedBox">
            <div className="startedContainerImg ">
              <img src="./images/static/SUSTAINATIONS/started2.png" alt="started2" />
            </div>
            <p className="startedContainerImgTitle">
              <span className="span2">2.</span> Login with your IC identity
            </p>
          </div>
          {/* 3 */}
          <div className="startedBox">
            <div className="startedContainerImg">
              <img src="./images/static/SUSTAINATIONS/started3.png" alt="started3" />
            </div>
            <p className="startedContainerImgTitle">
              <span className="span3">3.</span> Play Mini Games
            </p>
            <p className="startedContainerImgSubTitle">
              Our alpha version will be launched in June 2022. For now, let’s enjoy our mini games
            </p>
          </div>
        </div>
        <div className="getStartedFooter displayNone">
          <a
            className="iconLink"
            target="_blank"
            href="https://twitter.com/triipme"
            rel="noreferrer">
            <button className="btn btnFollow btnStarted">
              <Icon icon="iconoir:twitter" className="iconTwitter" />
              Follow Us Now
            </button>
          </a>
        </div>
      </div>
    </>
  );
}

export default GetStartedComp;
