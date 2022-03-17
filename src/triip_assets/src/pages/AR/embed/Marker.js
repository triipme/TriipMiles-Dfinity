import React from "react";

const MarkerEmbed = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html:
          '<iframe src="https://futureeyes.github.io/triipgiftbox/indextest.html" frameborder="0" style="width: 100vw; height:99vh" allowFullScreen allow="camera;"></iframe>'
      }}
    />
  );
};

export default MarkerEmbed;
