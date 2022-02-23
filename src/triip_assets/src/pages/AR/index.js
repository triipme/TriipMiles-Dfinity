import React from "react";
// import "aframe";
// import "aframe-particle-system-component";
// import "@ar-js-org/ar.js/aframe/build/aframe-ar-location-only.js";
// import "@ar-js-org/ar.js/aframe/build/aframe-ar-nft.js";
import { Entity, Scene } from "aframe-react";
const AR = () => {
  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <Scene
        vr-mode-ui="enabled: false"
        loading-screen="enabled: false;"
        arjs="sourceType: webcam; debugUIEnabled: false;"
        id="scene"
        embedded
        gesture-detector>
        <Entity primitive="a-assets">
          <video
            id="vid"
            src="./asset.mp4"
            preload="auto"
            response-type="arraybuffer"
            loop
            crossOrigin="true"
            webkit-playsinline="true"
            autoPlay
            muted
            playsInline></video>
        </Entity>
        <Entity
          primitive="a-marker"
          type="pattern"
          preset="custom"
          url="./marker.patt"
          videohandler
          smooth={true}
          smoothCount={10}
          smoothTolerance={0.01}
          smoothThreshold={5}
          raycaster={{ objects: ".clickable" }}
          emitevents={true}
          cursor={{ fuse: false, rayOrigin: "mouse" }}
          id="markerA">
          <Entity
            primitive="a-video"
            src="#vid"
            scale="1 1 1"
            position={{ x: 0, y: 0.1, z: 0 }}
            rotation="-90 0 0"
            class="clickable"
            gesture-handler
          />
        </Entity>

        <Entity primitive="a-camera" camera width="1000" height="1000"></Entity>
      </Scene>
    </div>
  );
};
export default AR;
