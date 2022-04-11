import React from "react";

function Trailer() {
  
  return (
    <>
      {/* Trailer */}
      <div className="sustainationTrailer">
        <div className="sustainationTrailerHeader">
          <h4>Sustainations - Writing a greener history</h4>
          <p>
            “Unlike other GameFi, it’s a peaceful, educational exploration where you solve puzzles,
            overcome adverse weather conditions and other challenges to conquer a destination”
          </p>
        </div>
        <div className="sustainationTrailerVideo">
          <iframe
            width="860"
            height="485"
            src="https://www.youtube.com/embed/ZgwDobu5OcY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}

export default Trailer;
