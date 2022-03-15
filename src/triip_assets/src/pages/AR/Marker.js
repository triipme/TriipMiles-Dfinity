import React, { Component } from "react";

import { AFrameRenderer, Marker } from 'react-web-ar'

/**
 * In this example, we use multiple independent markers.
 */
const MultiMarker = () => {
  return (
    <div style={{ margin: 0, overflow: "hidden" }}>
      <AFrameRenderer
        height={500}
        vr-mode-ui="enabled: false;"
        loading-screen="enabled: false;"
        renderer="logarithmicDepthBuffer: true;"
        arjs="trackingMethod: best; sourceType: webcam; debugUIEnabled: false;"
        id="scene"
        embedded
        gesture-detector
        arToolKit={{
          debugUIEnabled: false,
          trackingMethod: 'best',
          sourceType: 'webcam'
        }}>
        <Marker
          parameters={{
            type: "pattern",
            preset: "custom",
            patternUrl: "https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/triipgiftbox/assets/marker.patt",
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
            position="-1 1 -2"
            scale="1 1 1"
            animation-mixer="loop: repeat"
            className="clickable"
            gesture-handler
            gltf-model="https://raw.githubusercontent.com/FutureEyes/FutureEyes.github.io/main/triipgiftbox/assets/asset.gltf"></a-entity>
        </Marker>
      </AFrameRenderer>
    </div>
  );
};

export default MultiMarker;
