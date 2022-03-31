import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

export default function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-48 bottom-0 bg-gradient-to-t from-gray-100 to-transparent z-20" />
      <Carousel
        showIndicators={false}
        infiniteLoop
        showThumbs={false}
        autoPlay
        swipeable
        emulateTouch
        showStatus={false}
        interval={5000}
      >
        <div>
          <img src="/images/61DUO0NqyyL._SX3000_.jpg" alt="" />
        </div>
        <div>
          <img src="/images/61jovjd+f9L._SX3000_.jpg" alt="" />
        </div>
        <div>
          <img src="/images/61TD5JLGhIL._SX3000_.jpg" alt="" />
        </div>
        <div>
          <img src="/images/71qid7QFWJL._SX3000_.jpg" alt="" />
        </div>
      </Carousel>
    </div>
  );
}
