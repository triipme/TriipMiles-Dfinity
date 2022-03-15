import React, { Component } from "react";
import { Entity } from "react-aframe-ar";
import { AFrameRenderer, Marker } from "react-web-ar";
// import "@ar-js-org/ar.js";
// import "aframe";
const MarkerAR = () => {
  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <AFrameRenderer
        arToolKit={{ sourceType: "webcam", debugUIEnabled: false }}
        // stats
        id="scene"
        embedded
        gesture-detector
        vr-mode-ui="enabled: false"
        renderer="logarithmicDepthBuffer: true">
        <a-assets>
          <a-asset-item
            id="animated-asset"
            src="https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/triipgiftbox/assets/asset.gltf"></a-asset-item>
        </a-assets>
        <a-light
          id="dirlight"
          intensity="0.6"
          light="castShadow:true;type:directional"
          position="1 1 1"></a-light>
        <Marker
          parameters={{
            type: "pattern",
            preset: "custom",
            patternUrl:
              "https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/triipgiftbox/assets/marker.patt",
            raycaster: "objects: .clickable",
            emitevents: true,
            cursor: "fuse: false,rayOrigin:mouse"
          }}>
          <a-entity
            id="dlight"
            light="type: directional; intensity: 2;"
            position="1 1 1"></a-entity>

          <Entity
            id="bowser-model"
            light="type: ambient; intensity: 0.4;"
            // light="type: directional;
            //                          castShadow: true;
            //                          intensity: 0.6;
            //                          shadowCameraVisible: true;"
            scale="1.392527540660331 1.392527540660331 1.392527540660331"
            animation-mixer="loop: repeat"
            gltf-model="#animated-asset"></Entity>
        </Marker>
        <a-light id="'ambientlight" light="type: ambient; intensity: 0.4;" target="#ambienttarget">
          <a-entity id="ambienttarget" position="0 0 -1"></a-entity>
        </a-light>

        <a-entity id="'ambientlight" light="type: ambient; intensity: 0.4;"></a-entity>

        <a-light type="directional" position="0 0 0" rotation="-90 0 0" target="#directionaltarget">
          <a-entity id="directionaltarget" position="0 0 -1"></a-entity>
        </a-light>
        <a-entity camera></a-entity>
      </AFrameRenderer>
    </div>
  );
};

export default MarkerAR;
