import React, { Component } from "react";
import { AFrameRenderer, Marker } from "react-web-ar";

/**
 * In this example, we use multiple independent markers.
 */
class MultiMarker extends Component {
  render() {
    return (
      <AFrameRenderer inherent={true}>
        <Marker
          parameters={{
            type: "pattern",
            preset: "custom",
            patternUrl: "data/pattern-photo6138810320135761723.patt",
            url: "data/pattern-photo6138810320135761723.patt"
          }}>
          <a-entity
            position="-0.5 -3 0"
            rotation="0 0 0"
            gltf-model="data/TRIIPBOX_update.gltf"></a-entity>
        </Marker>
      </AFrameRenderer>
    );
  }
}

export default MultiMarker;
