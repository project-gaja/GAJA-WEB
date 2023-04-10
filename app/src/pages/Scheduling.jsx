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
      <div className='contain'>
      <div className='test'>
        <button className='coverbtn'>템플릿 변경</button>
      </div>
      <div className='textedit'></div>
      <div className='footer'>
      <button className='addbtn'>일정등록</button>  
      </div>
      
      </div>
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