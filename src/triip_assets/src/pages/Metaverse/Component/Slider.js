import React from "react";
import Slider from "react-slick";
import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Icon } from "@iconify/react";

// Slider ArtWorks
const data = [
  "./images/static/SUSTAINATIONS/Slide0.png",
  "./images/static/SUSTAINATIONS/Slide1.png",
  "./images/static/SUSTAINATIONS/Slide2.png",
  "./images/static/SUSTAINATIONS/Slide3.png",
  "./images/static/SUSTAINATIONS/Slide4.png"
];

const PreviousBtn = props => {
  // console.log(props);
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <span
        class="iconify"
        className="iconTwitter"
        data-icon="iconoir:twitter"
        style={{ color: "blue", fontSize: "30px" }}></span>
    </div>
  );
};
const NextBtn = props => {
  const { className, onClick } = props;
  return (
    <div className={className} onClick={onClick}>
      <Icon
        class="iconify"
        className="iconTwitter"
        data-icon="eva:arrow-ios-forward-fill"
        style={{ color: "blue", fontSize: "30px" }}></Icon>
    </div>
  );
};

const Carousel = () => {
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
      <div
        className="artWorks"
        style={{
          backgroundImage: `url(
          "./images/static/SUSTAINATIONS/background_artworks.png")`
        }}>
        <p>Images</p>
        <Slider
          autoplay
          autoplaySpeed={5000}
          dots
          infinite
          initialSlide={0}
          prevArrow={<PreviousBtn />}
          nextArrow={<NextBtn />}
          customPaging={i => {
            return (
              <div className="artWorksSubSlider">
                <div className="artWorksSubSlide">
                  <img
                    src={data[i]}
                    style={
                      data[i] == data[0]
                        ? {
                            display: "none"
                          }
                        : {}
                    }
                    alt="slide"
                  />
                </div>
              </div>
            );
          }}
          dotsClass="custom-indicator slick-dots ">
          {data.map(item => (
            <div key={item} className="artWorksSlideShow">
              <img src={item} alt="slide" />
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
function SliderComp() {
  return (
    <>
      {/* Artworks */}
      <div className="artWorksDesktop">
        <img
          src="./images/static/SUSTAINATIONS/artWorksHouse.png"
          alt="artWorksHouse"
          className="artWorksHouse"
        />
        <Carousel />
      </div>
      <div className="artWorksMobile">
        <div
          className="artWorks"
          style={{
            backgroundImage: `url(
          "./images/static/SUSTAINATIONS/background_artworks.png")`
          }}>
          <img
            src="./images/static/SUSTAINATIONS/artWorksHouse.png"
            alt="artWorksHouse"
            className="artWorksHouse"
          />
          <p className="artworkHeadingMobile">Images</p>
          <div className="artWorksSlider">
            <div className="artWorksSlideShow">
              <img src="./images/static/SUSTAINATIONS/Slide0.png" alt="slide" />
            </div>
            <div className="artWorksSubSlider">
              <div className="artWorksSubSlide">
                <img src="./images/static/SUSTAINATIONS/Slide1.png" alt="slide1" />
              </div>
              <div className="artWorksSubSlide">
                <img src="./images/static/SUSTAINATIONS/Slide2.png" alt="slide2" />
              </div>
              <div className="artWorksSubSlide">
                <img src="./images/static/SUSTAINATIONS/Slide3.png" alt="slide3" />
              </div>
              <div className="artWorksSubSlide">
                <img src="./images/static/SUSTAINATIONS/Slide4.png" alt="slide4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SliderComp;
