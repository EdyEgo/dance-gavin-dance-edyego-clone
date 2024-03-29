import React, { useState, useRef, useId } from "react";
import { Link } from "react-router-dom";
import ImageWebp from "../../components/general-helpers/ImageWebp";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import AlbumAfterBurner from "../../images/albums/dgd-afterburner_1000x.webp";
import AlbumArtificialSelection from "../../images/albums/dgd-artificial-selection_640x.jpg";
import AlbumInstantGratification from "../../images/albums/dgd-instant-gratification_640x.jpg";
import AlbumMotherShip from "../../images/albums/dgd-mothership_640x.jpg";
import TreeCitySessions from "../../images/albums/dgd-tree-city-sessions-2_640x.jpg";

interface ItemsSliderProps {
  filterImagesObject?: any;
}

const ItemsSlider: React.FC<ItemsSliderProps> = ({ filterImagesObject }) => {
  const useid = useId();
  const [transformNumber, setTransformNumber] = useState(0);

  // const SLIDE_NUMBER = window.screen.width <= 745 ? 23 : 19.1;  // we have another problem at 650
  // const SLIDE_NUMBER =
  //   window.screen.width <= 745 ? (window.screen.width <= 650 ? 32 : 23) : 19.1; // we have another problem at 650

  // const SLIDE_NUMBER =
  //   window.screen.width <= 745 ? (window.screen.width <= 650 ? 34 : 23) : 19.1; // we have another problem at 650

  function findSlideNumberByScreenWidth() {
    const screenWidth = window.screen.width;

    if (screenWidth <= 320) {
      return 33;
    }

    if (screenWidth <= 460) {
      return 25;
    }

    if (screenWidth <= 640) {
      return 20;
    }
    if (screenWidth <= 750) {
      return 23;
    }

    return 19.1;
  }

  const SLIDE_NUMBER = findSlideNumberByScreenWidth();

  // const maximumOfSlides = childrenItemsList.length;

  const [slidesMade, setSlidesMade] = useState(0);

  function incrementOrDecrementPercentageTransformNumber(increment: boolean) {
    if (increment) {
      if (slidesMade - 1 < 0) {
        return;
      }
      setTransformNumber(transformNumber + SLIDE_NUMBER);
      setSlidesMade(slidesMade - 1);

      return;
    }

    if (slidesMade + 1 > 4) {
      // smaller than 12 return
      return;
    }
    setTransformNumber(transformNumber - SLIDE_NUMBER);
    setSlidesMade(slidesMade + 1);
  }

  const styles = {
    transform: `translateX(${transformNumber}%)`,
    transition: "all 600ms ease-in-out",
  };
  // let calculate the number of items we received in pairs of four so we know the number of slides
  // or just use intersections

  function createAlbumsElements() {
    const albumsNames = [
      "dgd-afterburner_1000x.webp",
      "dgd-artificial-selection_640x.jpg",
      "dgd-instant-gratification_640x.jpg",
      "dgd-mothership_640x.jpg",
      "dgd-tree-city-sessions-2_640x.jpg",
    ];

    return albumsNames.map((imageName, index) => {
      //   const imageImport = await import(`../../images/albums/${imageName}`);
      const imageImport = React.lazy(
        () => import(`../../images/albums/${imageName}`)
      );
      return (
        <React.Suspense fallback={<p>loading...</p>}>
          <ImageWebp
            key={useid + index}
            srcWebp={imageImport}
            src={imageImport}
            width="225"
            height="auto"
          />
        </React.Suspense>
      );
    });

    //     <ImageWebp
    // key={useid + index}
    //     srcWebp={navMiddleImageWbp}
    //     src={navMiddleImagePng}
    //     width="225"
    //     height="auto"
    //   />
  }

  return (
    <div className="slider-container relative h-[469px] overflow-hidden ">
      <div
        className={`${
          slidesMade === 0 ? "text-gray-600" : ""
        } arrow-left-container arrow-slider  absolute p-4 right-[1%] z-10 cursor-pointer top-[38%]  md:top-[17.5%] lg:top-[27.5%] bg-[#25c3c8]  border border-gray-600`}
        onClick={() => {
          incrementOrDecrementPercentageTransformNumber(true);
        }}
      >
        <ArrowBackIcon />
      </div>
      <div
        style={styles}
        className={`slider-items   flex absolute w-[305%]  gap-8 `}
      >
        {/* {createAlbumsElements()} */}

        <div
          className={`album-show-container h-full w-[30%] sm:w-full md:flex ${
            slidesMade === 0
              ? "album-item-slide-light"
              : "album-item-slide-shadow pointer-events-none"
          }`}
        >
          <div
            className="image-container"
            style={filterImagesObject != null ? filterImagesObject : {}}
          >
            <ImageWebp
              srcWebp={AlbumAfterBurner}
              src={AlbumAfterBurner}
              width="442"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB] w-[100%] p-5 sm:p-0 sm:w-[442px] flex items-center justify-center">
            <div className="details-wrapper w-full">
              <div className="details flex  gap-8 justify-start items-start sm:ml-16 sm:flex-col">
                <div className="album-name font-sans font-bold text-[19px]">
                  AFTERBURNER
                </div>
                {/* <Link
                  to="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                  className="action-button-link p-4 bg-black text-center w-[50%] text-[#24C1C6]"
                >
                  STREAM
                </Link> */}
                <a
                  href="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                  className="action-button-link invisible sm:visible bg-black text-center p-4 lg:w-[50%] text-[#24C1C6]"
                >
                  STREAM
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`album-show-container h-full w-[30%] sm:w-full md:flex ${
            slidesMade === 1
              ? "album-item-slide-light"
              : "album-item-slide-shadow pointer-events-none"
          }`}
        >
          <div
            className="image-container"
            style={filterImagesObject != null ? filterImagesObject : {}}
          >
            <ImageWebp
              srcWebp={AlbumArtificialSelection}
              src={AlbumArtificialSelection}
              width="442"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB] w-[100%] p-5 sm:p-0 sm:w-[442px] flex items-center justify-center">
            <div className="details-wrapper w-[100%]">
              <div className="details flex  gap-8 justify-start items-start sm:ml-16 sm:flex-col">
                <div className="album-name font-sans font-bold text-[19px]">
                  ARTIFICIAL SELECTION
                </div>

                <a
                  href="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                  className="action-button-link invisible sm:visible bg-black text-center p-4 lg:w-[50%] text-[#24C1C6]"
                >
                  STREAM
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`album-show-container w-[30%] sm:w-full md:flex ${
            slidesMade === 2
              ? "album-item-slide-light"
              : "album-item-slide-shadow pointer-events-none"
          }`}
        >
          <div
            className="image-container"
            style={filterImagesObject != null ? filterImagesObject : {}}
          >
            <ImageWebp
              srcWebp={AlbumInstantGratification}
              src={AlbumInstantGratification}
              width="442"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB] w-[100%] p-5 sm:p-0 sm:w-[442px] flex items-center justify-center">
            <div className="details-wrapper w-[100%]">
              <div className="details flex  gap-8 justify-start items-start sm:ml-16 sm:flex-col">
                <div className="album-name font-sans font-bold text-[19px]">
                  INSTANT GRATIFICATION
                </div>
                <a
                  href="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                  className="action-button-link invisible sm:visible bg-black text-center p-4 lg:w-[50%] text-[#24C1C6]"
                >
                  STREAM
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`album-show-container w-[30%] sm:w-full md:flex ${
            slidesMade === 3
              ? "album-item-slide-light"
              : "album-item-slide-shadow pointer-events-none"
          }`}
        >
          <div
            className="image-container"
            style={filterImagesObject != null ? filterImagesObject : {}}
          >
            <ImageWebp
              srcWebp={AlbumMotherShip}
              src={AlbumMotherShip}
              width="442"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB] w-[100%] p-5 sm:p-0 sm:w-[442px] flex items-center justify-center">
            <div className="details-wrapper w-[100%]">
              <div className="details flex  gap-8 justify-start items-start sm:ml-16 sm:flex-col">
                <div className="album-name font-sans font-bold text-[19px]">
                  MOTHERSHIP
                </div>
                <a
                  href="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                  className="action-button-link invisible sm:visible bg-black text-center p-4 lg:w-[50%] text-[#24C1C6]"
                >
                  STREAM
                </a>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`album-show-container w-[30%] sm:w-full md:flex ${
            slidesMade === 4
              ? "album-item-slide-light"
              : "album-item-slide-shadow pointer-events-none"
          }`}
        >
          <div
            className="image-container"
            style={filterImagesObject != null ? filterImagesObject : {}}
          >
            <ImageWebp
              srcWebp={TreeCitySessions}
              src={TreeCitySessions}
              width="442"
              height="auto"
            />
          </div>
          <div className="details-container bg-[#27C6CB] w-[100%] p-5 sm:p-0 sm:w-[442px] flex items-center justify-center">
            <div className="details-wrapper w-[100%]">
              <div className="details flex  gap-8 justify-start items-start sm:ml-16 sm:flex-col">
                <div className="album-name font-sans font-bold text-[19px]">
                  TREE CITY SESSIONS 2
                </div>
                <a
                  href="https://open.spotify.com/artist/6guC9FqvlVboSKTI77NG2k"
                  className="aaction-button-link invisible sm:visible bg-black text-center p-4 lg:w-[50%] text-[#24C1C6]"
                >
                  STREAM
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="shadow-body absolute  w-[44%] h-full top-0 bg-[#0000004e] right-0">
      
      </div> */}
      <div
        className={`${
          slidesMade === 4 ? "text-gray-600" : ""
        } arrow-right-container p-4 arrow-slider absolute  right-[1%] top-[50%] md:top-[30%] lg:top-[40%] z-10 cursor-pointer bg-[#25c3c8]  border border-gray-600`}
        onClick={() => {
          incrementOrDecrementPercentageTransformNumber(false);
        }}
      >
        <ArrowForwardIcon />
      </div>
    </div>
  );
};

export default ItemsSlider;
