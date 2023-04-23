import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './../styles/Scheduling.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { API_LOCAL_URL } from './../common/constants';
import ModalBasic from './location_modal';

SwiperCore.use([Navigation, Pagination]);

const Scheduling = () => {
  //이전페이지 에서 가져온 값
  const location = useLocation();
  const data = location.state?.data;
  const title = location.state?.title;
  

  // 에디터 
  const editor = useRef(null);
  // 팝업창 내용을 저장하는 state
  const [modalContent, setModalContent] = useState(null);
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
  // 에디터 상태값
  const [editorDataList, setEditorDataList] = useState(Array.from({ length: data }, () => '<p>일정을 등록해보세요😁</p>'));

  // 첫번째 페이지 상태
  const [fristpage, setfristpage] = useState(false);


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

  // 텍스트 에디터 변경시 각페이지별 데이터 저장
  const handleEditorDataChange = (index, data) => {
    const newData = editorDataList.map((editorData, i) => (i === index ? data : editorData));
    setEditorDataList(newData);
  };

  // 모달창 노출
  const showModal = (index) => {
    setModalContent(index); //각 페이지에 대한 팝업창 내용을 설정합니다.
    setModalOpen(true);     //모달창 표시
  };

  // 텍스트 에디터에 지도 사진추가
  const handleLocationAdd = (page, lat, lng) => {
    const mapHtml = "<img src='https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=" + lng + "," + lat + "&level=16&X-NCP-APIGW-API-KEY-ID=zhm82fadkm'>";
    handleEditorDataChange(page, mapHtml);
  };


  function fn_insertSch(params) {
    const hashtag = window.prompt("등록할 해시태그를 설정해주세요\n 예시) #부산여행 #서울여행");
    alert(hashtag);
  }


  



  const slides = Array.from({ length: data }, (_, index) => (
    // =========== 슬라이더 시작 ===========
    <SwiperSlide key={index} className='swiper-container'> 
      <div className="contain">
        <div className={'test-' + index}>
          {modalOpen && (
            <ModalBasic
              setModalOpen={setModalOpen}
              id={modalContent} // 각 페이지에 대한 팝업창 내용을 전달합니다.
              handleLocationAdd={handleLocationAdd}
            />
          )}
        </div>

        {/*=========== 템플릿 변경 =========== */}
        
        <div className="test">
          <input type="file" name="image" id={`coverimageInput-${index}`} style={{ display: 'none' }} onChange={(event) => handlecoverImageUpload(event, index)} />
          {fristpage && (
          <button className="coverbtn" onClick={() => document.getElementById(`coverimageInput-${index}`).click()}>
            템플릿 변경
          </button>
          )}
        </div>
        

        {/*=========== 상단 컴포넌트(위치추가 , 사진추가)=========== */}
        <div className="topcon">
          <div className="topdiv">
            <div className='top-left'>
              <p className="title">{title}</p>
            </div>
            <div className='top-right' id='top-right'>
            {fristpage && (
              <label className="showcheck" id='showcheck'> 
              <input type="checkbox" name="travel" />
              공개
            </label>
            )}
            </div>
          </div>
          <div className="bottomdiv">
            <p className="title1">{index + 1}-Day 일정</p>
            <button className="locbtn" onClick={(event) => showModal(index)}>위치추가</button>
            <input type="file" name="image" id={`imageInput-${index}`} style={{ display: 'none' }} onChange={(event) => handleImageUpload(event, index)} />
            <button className="potobtn" onClick={() => document.getElementById(`imageInput-${index}`).click()}>
              사진추가
            </button>
          </div>
        </div>


        {/* ===========에디터 텍스트=========== */}
        <CKEditor
          ref={editor}
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

        {/* ===========일정등록 버튼=========== */}
        <div className="footer">
          <button className="addbtn" onClick={fn_insertSch}>일정등록</button>
        </div>
      </div>
    </SwiperSlide>
  ));


  //페이지 변경될때 마다
  const handleSlideChange = (swiper) => {
    setModalOpen(false);     //모달창 표시

    const pagecnt = swiper.activeIndex + 1;

    //첫번째 페이지가 아닐경우
    if (pagecnt != 1){
      setfristpage(false);
    } else{
      setfristpage(true);
    }
  };
  const swaiperinit =(swiper) =>{
    setfristpage(true);
  }

  return (
    <Swiper onSlideChange={handleSlideChange} onSwiper={swaiperinit} spaceBetween={50} slidesPerView={1} navigation pagination={{ clickable: true }}>
      {slides}
    </Swiper>
  );
};

export default Scheduling;
