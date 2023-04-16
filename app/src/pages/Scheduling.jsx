import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './../styles/Scheduling.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { API_LOCAL_URL } from './../common/constants';

SwiperCore.use([Navigation, Pagination]);

const Scheduling = () => {
  const location = useLocation();
  const data = location.state?.data;
  const title = location.state?.title;

  const [editorDataList, setEditorDataList] = useState(Array.from({ length: data }, () => '<p>일정을 등록해보세요😁</p>'));


  //----------템플릿 사진 추가 함수----------
  const handlecoverImageUpload = (event, index) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    // 이미지 업로드 API 호출
    axios
      .post(API_LOCAL_URL + '/fileupload', formData)
      .then((response) => {
        const imageUrl = response.data.imageUrl;
        const testDivs = document.querySelectorAll('.test');
    
        testDivs.forEach(testDiv => {
            testDiv.style.backgroundImage = "url('" + API_LOCAL_URL + "/" + imageUrl + "')";
            testDiv.style.backgroundSize = "cover";
            testDiv.style.backgroundPosition = "center";
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //----------텍스트 에디터 사진 추가 함수----------
  const handleImageUpload = (event, index) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    // 이미지 업로드 API 호출
    axios
      .post(API_LOCAL_URL + '/fileupload', formData)
      .then((response) => {
        const imageUrl = response.data.imageUrl;
        const imageElement = `<img src='${API_LOCAL_URL + '/' + imageUrl}' alt='이미지' />`;
        const newData = editorDataList.map((editorData, i) => (i === index ? editorData + imageElement : editorData));
        setEditorDataList(newData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditorDataChange = (index, data) => {
    const newData = editorDataList.map((editorData, i) => (i === index ? data : editorData));
    setEditorDataList(newData);
  };

  const slides = Array.from({ length: data }, (_, index) => (
    <SwiperSlide key={index}>
      <div className="contain">
        <div className="test">
          <input type="file" name="image" id={`coverimageInput-${index}`} style={{ display: 'none' }} onChange={(event) => handlecoverImageUpload(event, index)} />
          <button className="coverbtn" onClick={() => document.getElementById(`coverimageInput-${index}`).click()}>
            템플릿 변경
          </button>
        </div>
        <div className="topcon">
          <div className="topdiv">
            <div className='top-left'>
              <p className="title">{title}</p>
            </div>
            <div className='top-right'>
              <label className='checkbox_con'>
                <input type="checkbox" name="travel" />
                공개
              </label>
            </div>
          </div>
          <div className="bottomdiv">
            <p className="title1">{index + 1}-Day 일정</p>
            <button className="locbtn">위치추가</button>
            <input type="file" name="image" id={`imageInput-${index}`} style={{ display: 'none' }} onChange={(event) => handleImageUpload(event, index)} />
            <button className="potobtn" onClick={() => document.getElementById(`imageInput-${index}`).click()}>
              사진추가
            </button>
          </div>
        </div>
        <CKEditor
          className="textedit"
          id={`editor-${index}`}
          editor={ClassicEditor}
          data={editorDataList[index]}
          onReady={(editor) => {
            console.log('Editor is ready to use!', editor);
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            handleEditorDataChange(index, data);
          }}
          onBlur={(event, editor) => {
            console.log('Blur.', editor);
          }}
          onFocus={(event, editor) => {
            console.log('Focus.', editor);
          }}
        />
        <div className="footer">
          <button className="addbtn">일정등록</button>
        </div>
      </div>
    </SwiperSlide>
  ));

  return (
    <Swiper spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
      {slides}
    </Swiper>
  );
};

export default Scheduling;