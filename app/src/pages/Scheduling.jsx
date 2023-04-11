import React , { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './../styles/Scheduling.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';

SwiperCore.use([Navigation, Pagination]);

const Scheduling = () => {
  const location = useLocation();
  const data = location.state?.data;
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
  
    // 이미지 업로드 API 호출
    axios.post('이미지 업로드 API 주소', formData)
      .then(response => {
        const imageUrl = response.data.imageUrl;
        const editor = document.querySelector('.textedit .ck-editor__editable');
        const imageElement = `<img src="${imageUrl}" alt="이미지" />`;
        editor.insertAdjacentHTML('beforeend', imageElement);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const slides = Array.from({ length: data }, (_, index) => (
    <SwiperSlide key={index}>
      <div className='contain'>
      <div className='test'>
        <button className='coverbtn'>템플릿 변경</button>
      </div>
      <div className='topcon'>
          <div className='topdiv'>
            <p className='title'>우리 함께 떠나는 여행</p>
          </div>
          <div className='bottomdiv'>
            <p className='title1'>{index + 1}-Day 일정</p>
            <button className='locbtn'>위치추가</button>
            <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageUpload} />
            <button className='potobtn' onClick={() => document.getElementById('imageInput').click()}>사진추가</button>
          </div>
      </div>
      <div textedit>
        
      </div>
      <CKEditor className="textedit"
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor 5!<img src='#'></p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( { event, editor, data } );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                />      
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