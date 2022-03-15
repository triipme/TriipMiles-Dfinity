import React, { Component } from "react";
import AFrameRenderer from "./AFrameRenderer.ar";
import Marker from "./Marker.ar";
import "@ar-js-org/ar.js";
import "aframe";
/**
 * In this example, we use multiple independent markers.
 */
const MultiMarker = () => {
  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <AFrameRenderer
        height={500}
        arToolKit={{
          debugUIEnabled: false
        }}>
        <Marker
          parameters={{
            type: "pattern",
            preset: "custom",
            patternUrl: "data/pattern-photo6138810320135761723.patt",
            changeMatrixMode: "modelViewMatrix",
            raycaster: "objects: .clickable",
            emitevents: true,
            cursor: "fuse: false,rayOrigin:mouse",
            smooth: true,
            // number of matrices to smooth tracking over, more = smoother but slower follow
            smoothCount: 5,
            // distance tolerance for smoothing, if smoothThreshold # of matrices are under tolerance, tracking will stay still
            smoothTolerance: 0.01,
            // threshold for smoothing, will keep still unless enough matrices are over tolerance
            smoothThreshold: 2
          }}>
          <a-entity
            // position="-2 -2 -2"
            position="0 0 0"
            scale="1 1 1"
            animation-mixer="loop: repeat"
            className="clickable"
            gesture-handler
            gltf-model="https://raw.githubusercontent.com/triipme/TriipMiles-Dfinity/triip-Quan/src/triip_assets/assets/data/TRIIPBOX_update.gltf"></a-entity>
        </Marker>
      </AFrameRenderer>
    </div>
  );
};

export default MultiMarker;
