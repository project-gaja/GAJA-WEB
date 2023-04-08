import React from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './../styles/Scheduling.css';

SwiperCore.use([Navigation, Pagination]);

const Scheduling = () => {
  const location = useLocation();
  const data = location.state?.data;

  const slides = Array.from({ length: data }, (_, index) => (
    <SwiperSlide key={index}>
      <div className='contain'>{`page${index + 1}`}</div>
    </SwiperSlide>
  ));

  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
    >
      {slides}
    </Swiper>
  );
};
export default Scheduling;