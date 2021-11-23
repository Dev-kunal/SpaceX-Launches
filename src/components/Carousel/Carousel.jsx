import React, { useState } from 'react';
import "./carousel.css"

function Carousel({ images }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = images.length;

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === slideLength - 1 ? 0 : currentSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? slideLength - 1 : currentSlide - 1
        );
    };

    return (
        <div className="carousel">
            <img src={images[currentSlide]} className="slide" alt="slide" />
            <button onClick={prevSlide} className="previous btn">
                <i class="fas fa-chevron-left btn-carousel"></i>
            </button>
            <button onClick={nextSlide} className="next btn">
                <i class="fas fa-chevron-right btn-carousel"></i>
            </button>

        </div>

    );
}

export default Carousel;