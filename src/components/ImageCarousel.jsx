import React, { useState, useEffect } from "react";
import { useSwipeable } from "react-swipeable";

const ImageCarousel = ({ images, categoryImages = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayImages, setDisplayImages] = useState([]);
  const [preloadedImages, setPreloadedImages] = useState(new Set());

  // Preload adjacent images
  const preloadImages = (currentIdx) => {
    if (!displayImages.length) return;
    
    const imagesToPreload = [];
    const prev = (currentIdx - 1 + displayImages.length) % displayImages.length;
    const next = (currentIdx + 1) % displayImages.length;
    
    [prev, next].forEach(idx => {
      const imageUrl = displayImages[idx]?.url;
      if (imageUrl && !preloadedImages.has(imageUrl)) {
        imagesToPreload.push(imageUrl);
      }
    });

    if (imagesToPreload.length) {
      imagesToPreload.forEach(url => {
        const img = new Image();
        img.src = url;
        setPreloadedImages(prev => new Set([...prev, url]));
      });
    }
  };

  useEffect(() => {
    const handleUpdate = (event) => {
      const { isOpen, index, category, projectTitle } = event.detail;
      setIsOpen(isOpen);
      
      if (categoryImages && category && projectTitle) {
        const projectImages = categoryImages[category]?.filter(
          img => img.projectTitle === projectTitle
        ) || [];
        setDisplayImages(projectImages);
        
        const clickedImage = images[index];
        const newIndex = projectImages.findIndex(img => img.url === clickedImage.url);
        setCurrentIndex(Math.max(0, newIndex));
        
        // Preload all project images immediately
        projectImages.forEach(img => {
          if (!preloadedImages.has(img.url)) {
            const image = new Image();
            image.src = img.url;
            setPreloadedImages(prev => new Set([...prev, img.url]));
          }
        });
      } else {
        setDisplayImages(images);
        setCurrentIndex(index);
        // Preload adjacent images for direct image array
        preloadImages(index);
      }
    };

    window.addEventListener("updateCarousel", handleUpdate);
    return () => window.removeEventListener("updateCarousel", handleUpdate);
  }, [images, categoryImages, preloadedImages]);

  useEffect(() => {
    preloadImages(currentIndex);
  }, [currentIndex, displayImages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'Escape':
          handleClose();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : displayImages.length - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < displayImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handleClose = () => {
    window.dispatchEvent(new CustomEvent("closeCarousel"));
    setDisplayImages([]);
    setPreloadedImages(new Set());
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const clickPosition = x / rect.width;

    if (clickPosition < 0.4) {
      handlePrev();
    } else {
      handleNext();
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    trackMouse: true
  });

  if (!isOpen || !displayImages || displayImages.length === 0) {
    return null;
  }

  const currentImage = displayImages[currentIndex];

  return (
    <>
      <div 
        className="fixed bg-white/90 h-svh w-svw z-10"
        onClick={handleClose}
      />
      
      <div className="fixed h-svh w-svw flex flex-col z-20 pointer-events-none">
        <div className="fixed w-svw flex justify-between px-5 md:pt-5 pointer-events-auto bg-white">
          <div className="flex gap-2">
            <div className="sm:hidden">
              {currentIndex + 1} of {displayImages.length}
            </div>
            <div className="hidden sm:flex gap-2 bg-white">
              <button onClick={handlePrev}>Previous</button>
              <p>/</p>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
          <button onClick={handleClose} className="bg-white">Close</button>
        </div>
        
        <div className="flex-1 flex justify-center items-center" {...handlers}>
          <div className="pointer-events-auto">
            <img 
              src={currentImage.url} 
              alt={currentImage.title} 
              onClick={handleImageClick}
              loading="eager"
              fetchPriority="high"
              className="w-[92svw] max-h-[90svh] object-contain md:max-w-[96svw] md:w-auto md:h-[90svh]" 
            />
          </div>
        </div>
      </div>
      
      {/* Hidden preload container */}
      <div className="hidden">
        {displayImages.map((img, idx) => (
          idx !== currentIndex && (
            <img 
              key={img.url} 
              src={img.url} 
              alt="" 
              aria-hidden="true"
              loading="lazy"
            />
          )
        ))}
      </div>
    </>
  );
};

export default ImageCarousel;