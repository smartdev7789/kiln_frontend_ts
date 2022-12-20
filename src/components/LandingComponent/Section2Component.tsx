import React, {useEffect} from "react";
import { scrollToTop } from "../../utils";

const images = [
  <div className="flex px-16 items-center section-height">
    <div className="w-1/2 relative section-height">
      <div className="absolute top-[40%] left-[25%]">
        <img className="h-96" src="imgs/earth.gif" alt="GameBake" />
      </div>
      <div className="absolute top-[36%] left-[28%] animation animation-fadeIn">
        <img className="h-32" src="imgs/globe_icon1.svg" alt="GameBake" />
      </div>
      <div
        className="absolute top-[33%] left-[60%] animation animation-fadeIn"
        style={{ transitionDelay: "0.6s" }}
      >
        <img className="h-32" src="imgs/globe_icon2.svg" alt="GameBake" />
      </div>
      <div
        className="absolute top-[62%] left-[67%] animation animation-fadeIn"
        style={{ transitionDelay: "1.2s" }}
      >
        <img className="h-32" src="imgs/globe_icon3.svg" alt="GameBake" />
      </div>
      <div
        className="absolute top-[70%] left-[31%] animation animation-fadeIn"
        style={{ transitionDelay: "1.8s" }}
      >
        <img className="h-32" src="imgs/globe_icon4.svg" alt="GameBake" />
      </div>
    </div>
    <div className="flex justify-between pt-32 items-center w-1/2">
      <div className="w-2/3">
        <div className="text-5xl mb-4 text-white font-extrabold">Worldwide</div>
        <div className="text-lg text-white mb-8">
          <p className="animation animation-fadeInUp">
            There is so much more out there than just the Apple App Store and
            Google Play Store, we are talking about billions of new users! That
            is why GameBake focuses on building the best partnerships with the
            biggest channels globally, ranging from App Stores to HTML5 web
            channels.
          </p>
          <br />
          <p
            className="animation animation-fadeInUp"
            style={{ transitionDelay: "0.6s" }}
          >
            If you’re interested in wider distribution, then you should be
            utilising GameBake!
          </p>
        </div>
      </div>
    </div>
  </div>,
  <div className="flex px-16 items-center section-height">
    <div className="w-1/2 relative section-height">
      <div className="absolute top-[40%] left-[25%]">
        <img className="h-96" src="imgs/earth.gif" alt="GameBake" />
      </div>
      <div className="absolute top-[46%] left-[25%] animation animation-fadeIn">
        <img className="h-32" src="imgs/globe_icon5.svg" alt="GameBake" />
      </div>
      <div
        className="absolute top-[28%] left-[51%] animation animation-fadeIn"
        style={{ transitionDelay: "0.6s" }}
      >
        <img className="h-32" src="imgs/globe_icon6.svg" alt="GameBake" />
      </div>
      <div
        className="absolute top-[57%] left-[62%] animation animation-fadeIn"
        style={{ transitionDelay: "1.2s" }}
      >
        <img className="h-32" src="imgs/globe_icon7.svg" alt="GameBake" />
      </div>
      <div
        className="absolute top-[72%] left-[36%] animation animation-fadeIn"
        style={{ transitionDelay: "1.8s" }}
      >
        <img className="h-32" src="imgs/globe_icon8.svg" alt="GameBake" />
      </div>
    </div>
    <div className="flex justify-between pt-32 items-center w-1/2 fadeInUp animation">
      <div className="w-2/3">
        <div className="text-5xl mb-4 text-white font-extrabold">Agnostic</div>
        <div className="text-lg text-white mb-8">
          <p className="animation animation-fadeInUp">
            GameBake takes pride in position as a truly agnostic player in the
            industry. We do not force you to choose one platform over another at
            the expense of your game or your growth. We are here to help you
            find the right channels and the right partners to take advantage of
            the vast opportunities that await.
          </p>
          <br />
          <p
            className="animation animation-fadeInUp"
            style={{ transitionDelay: "0.6s" }}
          >
            Your game. Your business. Your choice.
          </p>
        </div>
      </div>
    </div>
  </div>,
];

const titles = ["Worldwide", "Agnostic"];
const desc1 = [
  "There is so much more out there than just the Apple App Store and Google Play Store, we are talking about billions of new users! That is why GameBake focuses on building the best partnerships with the biggest channels globally, ranging from App Stores to HTML5 web channels.",
  "GameBake takes pride in position as a truly agnostic player in the industry. We do not force you to choose one platform over another at the expense of your game or your growth. We are here to help you find the right channels and the right partners to take advantage of the vast opportunities that await.",
];
const desc2 = [
  "If you’re interested in wider distribution, then you should be utilising GameBake!",
  "Your game. Your business. Your choice.",
];
const posTop = [36, 33, 62, 70, 46, 28, 57, 72];
const posLeft = [28, 60, 67, 31, 25, 51, 62, 36];

let animationElements = document.getElementsByClassName("carousel_animation");

const Carousel = () => {
  // We will start by storing the index of the current image in the state.
  const [currentImage, setCurrentImage] = React.useState(0);

  // We are using react ref to 'tag' each of the images. Below will create an array of
  // objects with numbered keys. We will use those numbers (i) later to access a ref of a
  // specific image in this array.

  const animationPlay = () => {
    for (var i = 0; i < animationElements.length; i++) {
      let ele = animationElements[i];
      let offset = ele.getBoundingClientRect().top;
      let screenHeight = window.innerHeight;
      if (offset < screenHeight && !ele.classList.contains("active")) {
        ele.classList.add("active");
      }
    }
  };

  useEffect(() => {
    animationElements = document.getElementsByClassName("carousel_animation");
    animationPlay();
    document.getElementById("landing")?.addEventListener("scroll", animationPlay);
  }, []);

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
    refs[i].current.scrollIntoView();
    setTimeout(() => {
      animationElements = document.getElementsByClassName("carousel_animation");
      animationPlay();
    }, 100);
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
  const arrowStyle = "absolute z-10 w-28 flex items-center justify-center";

  // Let's create dynamic buttons. It can be either left or right. Using
  // isLeft boolean we can determine which side we'll be rendering our button
  // as well as change its position and content.
  const sliderControl = (isLeft?: any) => (
    <button
      type="button"
      onClick={isLeft ? previousImage : nextImage}
      className={`${arrowStyle} ${isLeft ? "left-2" : "right-2"}`}
      style={{ top: "50%" }}
    >
      <span
        role="img"
        aria-label={`Arrow ${isLeft ? "left" : "right"}`}
        className="mx-5"
      >
        {isLeft ? (
          <img
            className="h-auto w-full"
            src="imgs/arrow_left.svg"
            alt="Gamebake"
          />
        ) : (
          <img
            className="rotate-180 h-auto w-full"
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
      <div className="relative w-full mb-[-0.4rem]">
        <div className="carousel overflow-hidden">
          {currentImage !== 0 && sliderControl(true)}
          {images.map((img, i) => (
            <div className="w-full flex-shrink-0" key={i} ref={refs[i]}>
              <div className="flex px-16 items-center section-height">
                <div className="w-1/2 relative section-height">
                  <div className="absolute top-[40%] left-[25%]">
                    <img className="h-96" src="imgs/earth.gif" alt="GameBake" />
                  </div>
                  {i === currentImage ? (
                    <>
                      <div
                        className={
                          "absolute top-[" + posTop[i * 4] + "%] left-[" + posLeft[i * 4] + "%] carousel_animation animation-fadeIn"
                        }
                      >
                        <img
                          className="h-32"
                          src={"imgs/globe_icon" + (i * 4 + 1) + ".svg"}
                          alt="GameBake"
                        />
                      </div>
                      <div
                        className={
                          "absolute top-[" + posTop[i * 4 + 1] + "%] left-[" + posLeft[i * 4 + 1] + "%] carousel_animation animation-fadeIn"
                        }
                        style={{ transitionDelay: "0.6s" }}
                      >
                        <img
                          className="h-32"
                          src={"imgs/globe_icon" + (i * 4 + 2) + ".svg"}
                          alt="GameBake"
                        />
                      </div>
                      <div
                        className={
                          "absolute top-[" + posTop[i * 4 + 2] + "%] left-[" + posLeft[i * 4 + 2] + "%] carousel_animation animation-fadeIn"
                        }
                        style={{ transitionDelay: "1.2s" }}
                      >
                        <img
                          className="h-32"
                          src={"imgs/globe_icon" + (i * 4 + 3) + ".svg"}
                          alt="GameBake"
                        />
                      </div>
                      <div
                        className={
                          "absolute top-[" + posTop[i * 4 + 3] + "%] left-[" + posLeft[i * 4 + 3] + "%] carousel_animation animation-fadeIn"
                        }
                        style={{ transitionDelay: "1.8s" }}
                      >
                        <img
                          className="h-32"
                          src={"imgs/globe_icon" + (i * 4 + 4) + ".svg"}
                          alt="GameBake"
                        />
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="flex justify-between pt-32 items-center w-1/2">
                  <div className="w-2/3">
                    <div className="text-5xl mb-4 text-white font-extrabold">
                      {titles[i]}
                    </div>
                    <div className="text-lg text-white mb-8">
                      {i === currentImage ? (
                        <>
                          <p className="carousel_animation animation-fadeInUp">
                            {desc1[i]}
                          </p>
                          <br />
                          <p
                            className="carousel_animation animation-fadeInUp"
                            style={{ transitionDelay: "0.6s" }}
                          >
                            {desc2[i]}
                          </p>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
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
    <section className="snap-start">
      <div
        id="scroll2"
        className="bg-[url('/public/imgs/Background_Orange.png')] bg-cover min-h-screen"
      >
        <Carousel />
        <div
          className="text-center"
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
