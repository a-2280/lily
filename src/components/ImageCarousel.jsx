import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const ImageCarousel = ({ images }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const handleUpdate = (event) => {
      const { isOpen, index } = event.detail;
      setIsOpen(isOpen);
      setCurrentIndex(index);
    };

    window.addEventListener("updateCarousel", handleUpdate);

    return () => {
      window.removeEventListener("updateCarousel", handleUpdate);
    };
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent("closeCarousel"));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true
  });

  if (!isOpen || !images || images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  return (
    <div className="absolute bg-white/85 h-svh w-svw flex flex-col z-20">
      <div className="flex justify-between px-[20px] pt-[20px] bg-white">
        <div className="flex gap-[0.5rem]">
          <div className="sm:hidden">
            {currentIndex + 1} of {images.length}
          </div>
          <div className="hidden sm:flex gap-[0.5rem]">
            <button onClick={handlePrev}>Previous</button>
            <p> / </p>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
        <button onClick={handleClose}>Close</button>
      </div>
      <div className="flex-1 flex justify-center items-center" {...handlers}>
        <img src={currentImage.url} alt={currentImage.title} className="w-[92svw] max-h-[90svh] object-contain md:max-w-[96svw] md:w-auto md:h-[72svh]" />
      </div>
    </div>
  );
};

export default ImageCarousel;