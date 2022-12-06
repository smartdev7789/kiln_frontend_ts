import React from "react";
import { scrollToTop } from "../../utils";

const images = [
  <div className="flex px-16 items-center section-height">
    <div className="w-1/2 pt-24 pr-28">
      <img className="h-96 float-right" src="imgs/earth.svg" alt="GameBake" />
    </div>
    <div className="flex justify-between pt-32 items-center w-1/2">
      <div className="w-2/3">
        <div className="text-5xl mb-4 text-white font-extrabold">Worldwide</div>
        <div className="text-lg text-white mb-8">
          <p>
            There is so much more out there than just the Apple App Store and
            Google Play Store, we are talking about billions of new users! That
            is why GameBake focuses on building the best partnerships with the
            biggest channels globally, ranging from App Stores to HTML5 web
            channels.
          </p>
          <br />
          <p>
            If you’re interested in wider distribution, then you should be
            utilising GameBake!
          </p>
        </div>
      </div>
    </div>
  </div>,
  <div className="flex px-16 items-center section-height">
    <div className="w-1/2 pt-24 pr-28">
      <img className="h-96 float-right" src="imgs/earth1.svg" alt="GameBake" />
    </div>
    <div className="flex justify-between pt-32 items-center w-1/2">
      <div className="w-2/3">
        <div className="text-5xl mb-4 text-white font-extrabold">Agnostic</div>
        <div className="text-lg text-white mb-8">
          <p>
            GameBake takes pride in position as a truly agnostic player in the
            industry. We do not force you to choose one platform over another at
            the expense of your game or your growth. We are here to help you
            find the right channels and the right partners to take advantage of
            the vast opportunities that await.
          </p>
          <br />
          <p>Your game. Your business. Your choice.</p>
        </div>
      </div>
    </div>
  </div>,
];

const Carousel = () => {
  // We will start by storing the index of the current image in the state.
  const [currentImage, setCurrentImage] = React.useState(0);

  // We are using react ref to 'tag' each of the images. Below will create an array of
  // objects with numbered keys. We will use those numbers (i) later to access a ref of a
  // specific image in this array.
  const refs = images.reduce((acc: any, val, i) => {
    acc[i] = React.createRef();
    return acc;
  }, {});

  const scrollToImage = (i: any) => {
    // First let's set the index of the image we want to see next
    setCurrentImage(i);
    // Now, this is where the magic happens. We 'tagged' each one of the images with a ref,
    // we can then use built-in scrollIntoView API to do eaxactly what it says on the box - scroll it into
    // your current view! To do so we pass an index of the image, which is then use to identify our current
    // image's ref in 'refs' array above.
    refs[i].current.scrollIntoView({
      //     Defines the transition animation.
      behavior: "smooth",
      //      Defines vertical alignment.
      block: "nearest",
      //      Defines horizontal alignment.
      inline: "start",
    });
  };

  // Some validation for checking the array length could be added if needed
  const totalImages = images.length;

  // Below functions will assure that after last image we'll scroll back to the start,
  // or another way round - first to last in previousImage method.
  const nextImage = () => {
    if (currentImage >= totalImages - 1) {
      scrollToImage(0);
    } else {
      scrollToImage(currentImage + 1);
    }
  };

  const previousImage = () => {
    if (currentImage === 0) {
      scrollToImage(totalImages - 1);
    } else {
      scrollToImage(currentImage - 1);
    }
  };

  // Tailwind styles. Most importantly notice position absolute, this will sit relative to the carousel's outer div.
  const arrowStyle =
    "absolute pt-32 text-2xl z-10 h-10 w-10 flex items-center justify-center";

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = (isLeft?: any) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "40%" }}
    >
      <span role="img" aria-label={`Arrow ${isLeft ? "left" : "right"}`}>
        {isLeft ? (
          <img src="imgs/arrow_left.svg" alt="Gamebake" />
        ) : (
          <img
            className="rotate-180"
            src="imgs/arrow_left.svg"
            alt="Gamebake"
          />
        )}
      </span>
    </button>
  );

  return (
    // Images are placed using inline flex. We then wrap an image in a div
    // with flex-shrink-0 to stop it from 'shrinking' to fit the outer div.
    // Finally the image itself will be 100% of a parent div. Outer div is
    // set with position relative, so we can place our cotrol buttons using
    // absolute positioning on each side of the image.
    <div className="flex justify-center w-full items-center">
      <div className="relative w-full">
        <div className="carousel">
          {currentImage !== 0 && sliderControl(true)}
          {images.map((img, i) => (
            <div className="w-full flex-shrink-0" key={i} ref={refs[i]}>
              {img}
            </div>
          ))}
          {currentImage !== totalImages - 1 && sliderControl()}
        </div>
      </div>
    </div>
  );
};

const Section2Component = () => {
  return (
    <section>
      <div
        id="section2"
        className="bg-[url('/public/imgs/Background_Orange.png')] bg-cover landing-width min-h-screen"
      >
        <Carousel />
        <div
          className="text-center py-3"
          onClick={() =>
            scrollToTop(document.getElementById("section3")?.offsetTop)
          }
        >
          <button type="button">
            <img className="w-7" src="imgs/Arrow.svg" alt="GameBake" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Section2Component;
