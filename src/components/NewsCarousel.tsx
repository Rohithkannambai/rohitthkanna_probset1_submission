import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NEWS_SLIDES } from '../data/tingTingData';

export const NewsCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const totalSlides = NEWS_SLIDES.length;

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 3500);
  }, [totalSlides]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Auto-advance every 3.5 seconds; pause on desktop hover
  useEffect(() => {
    if (!isPaused) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isPaused, startTimer, stopTimer]);

  // Manual interactions reset timer
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    if (!isPaused) startTimer();
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    if (!isPaused) startTimer();
  };

  const goToSlide = (idx: number) => {
    setCurrentSlide((idx + totalSlides) % totalSlides);
    if (!isPaused) startTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartXRef.current - touchEndX;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const formattedCounter = `0${currentSlide + 1} / 0${totalSlides}`;

  return (
    <section id="internal-news-section" className="w-full px-4 sm:px-6 lg:px-12 pt-6 sm:pt-8 pb-4">
      <div className="max-w-[1440px] mx-auto flex flex-col gap-3">
        {/* Section Header & Carousel Controls */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#7A726A]">
            INTERNAL NEWS
          </span>
          <div className="flex items-center gap-3 select-none">
            <button
              id="carousel-prev"
              aria-label="Previous Slide"
              onClick={prevSlide}
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-[#EAE5DC] hover:border-[#8C6D53] text-[#261E1A] transition-colors shadow-sm cursor-pointer"
            >
              <span className="text-base">←</span>
            </button>
            <span id="carousel-counter" className="font-mono text-xs text-[#7A726A]">
              {formattedCounter}
            </span>
            <button
              id="carousel-next"
              aria-label="Next Slide"
              onClick={nextSlide}
              type="button"
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-white border border-[#EAE5DC] hover:border-[#8C6D53] text-[#261E1A] transition-colors shadow-sm cursor-pointer"
            >
              <span className="text-base">→</span>
            </button>
          </div>
        </div>

        {/* Carousel Container (pause on hover) */}
        <div
          id="carousel-container"
          className="relative w-full overflow-hidden rounded-xl border border-[#EAE5DC] shadow-sm aspect-[2.33/1] max-h-[380px] bg-white select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sliding Track */}
          <div
            id="carousel-track"
            className="flex w-full h-full transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {NEWS_SLIDES.map((slide, index) => (
              <div key={slide.id} className="w-full h-full flex-shrink-0 relative flex items-center justify-center">
                <img
                  alt={`Internal News Slide ${index + 1}`}
                  referrerPolicy="no-referrer"
                  src={slide.imageUrl}
                  className="w-full h-full object-contain pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Discreet Pagination Bar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#261E1A]/50 backdrop-blur-md pointer-events-auto">
            {NEWS_SLIDES.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goToSlide(index)}
                className={`carousel-dot h-1 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
