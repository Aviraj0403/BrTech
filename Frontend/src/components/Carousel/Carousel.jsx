import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";

const Carousel = () => {
  const [currentSlidePos, setCurrentSlidePos] = useState(0);
  const sliderItemsRef = useRef([]);

  const slideNext = () => {
    setCurrentSlidePos((prevPos) =>
      prevPos >= sliderItemsRef.current.length - 1 ? 0 : prevPos + 1
    );
  };

  const slidePrev = () => {
    setCurrentSlidePos((prevPos) =>
      prevPos <= 0 ? sliderItemsRef.current.length - 1 : prevPos - 1
    );
  };

  useEffect(() => {
    // Add event listeners
    const nextBtn = document.querySelector(".slider-next");
    const prevBtn = document.querySelector(".slider-prev");

    nextBtn.addEventListener("click", slideNext);
    prevBtn.addEventListener("click", slidePrev);

    // Cleanup event listeners
    return () => {
      nextBtn.removeEventListener("click", slideNext);
      prevBtn.removeEventListener("click", slidePrev);
    };
  }, []);

  useEffect(() => {
    const lastActiveSliderItem = document.querySelector(".slider-item--active");
    if (lastActiveSliderItem) {
      lastActiveSliderItem.classList.remove("slider-item--active");
    }
    sliderItemsRef.current[currentSlidePos].classList.add("slider-item--active");
  }, [currentSlidePos]);

  return (
    <>
      <header className="padding-5">
        <div className="slider-control slider-prev over-slider">
          <ion-icon name="chevron-back-outline"></ion-icon>
        </div>
        <div className="slider-control slider-next over-slider">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>

        <div
          className="slider-item"
          ref={(el) => (sliderItemsRef.current[0] = el)}
        >
          <div className="slider-bg">
            <img src="/src/assets/img/hero-slider-1.jpg" alt="Slider 1" />
          </div>
          <h2 reveal="true" className="subtitle" style={{ "--delay-item": 0 }}>
            Traditional & Hygienic
          </h2>
          <h1 reveal="true" className="title" style={{ "--delay-item": 1 }}>
            For the love of delicious food
          </h1>
          <p reveal="true" className="paragraph" style={{ "--delay-item": 2 }}>
            Come with family & feel the joy of mouthwatering food
          </p>
          <button
            className="btn"
            data-text="View Our Menu"
            reveal="true"
            style={{ "--delay-item": 3 }}
          >
            <span>Taste the dish</span>
          </button>
        </div>

        <div
          className="slider-item"
          ref={(el) => (sliderItemsRef.current[1] = el)}
        >
          <div className="slider-bg">
            <img src="/src/assets/img/hero-slider-2.jpg" alt="Slider 2" />
          </div>
          <h2 reveal="true" className="subtitle" style={{ "--delay-item": 0 }}>
            Delightful Experience
          </h2>
          <h1 reveal="true" className="title" style={{ "--delay-item": 1 }}>
            Flavors Inspired by the Seasons
          </h1>
          <p reveal="true" className="paragraph" style={{ "--delay-item": 2 }}>
            Come with family & feel the joy of mouthwatering food
          </p>
          <button
            className="btn"
            data-text="View Our Menu"
            reveal="true"
            style={{ "--delay-item": 3 }}
          >
            <span>Taste the dish</span>
          </button>
        </div>

        <div
          className="slider-item"
          ref={(el) => (sliderItemsRef.current[2] = el)}
        >
          <div className="slider-bg">
            <img src="/src/assets/img/hero-slider-3.jpg" alt="Slider 3" />
          </div>
          <h2 reveal="true" className="subtitle" style={{ "--delay-item": 0 }}>
            Amazing & Delicious
          </h2>
          <h1 reveal="true" className="title" style={{ "--delay-item": 1 }}>
            Where every flavor tells a story
          </h1>
          <p reveal="true" className="paragraph" style={{ "--delay-item": 2 }}>
            Come with family & feel the joy of mouthwatering food
          </p>
          <button
            className="btn"
            data-text="View Our Menu"
            reveal="true"
            style={{ "--delay-item": 3 }}
          >
            <span>Taste the dish</span>
          </button>
        </div>
      </header>
      <div className="book over-slider">
        <img src="/src/assets/img/hero-icon.png" alt="Booking icon" />
        <p>Book A Table</p>
      </div>
    </>
  );
};

export default Carousel;
