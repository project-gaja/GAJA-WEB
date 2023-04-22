import React, { useState , useEffect, useRef} from 'react';
import { useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import 'swiper/swiper-bundle.css';
import './../styles/Scheduling.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { withReact } from '@ckeditor/ckeditor5-react';
import axios from 'axios';
import { API_LOCAL_URL } from './../common/constants';
import ModalBasic from './location_modal';
import NaverMap from './../component/NaverMap'
// import MapImage from './../component/layout/MapImage';
import ReactDOMServer from 'react-dom/server';


SwiperCore.use([Navigation, Pagination]);

const Scheduling = () => {
  const location = useLocation();
  const data = location.state?.data;
  const title = location.state?.title;
  const [editorDataList, setEditorDataList] = useState(Array.from({ length: data }, () => '<p>일정을 등록해보세요😁</p>'));
  

  const editor = useRef(null);

  const editorRef = useRef(null);
  
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//openapi.map.naver.com/openapi/v3/maps.js?clientId=YOUR_CLIENT_ID&submodules=geocoder`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      const map = new window.naver.maps.Map('map', {
        center: new window.naver.maps.LatLng(37.567545, 126.977335), // 지도의 중심 좌표
        zoom: 15 // 지도의 확대 레벨
      });

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.567545, 126.977335), // 마커가 위치할 좌표
        map // 마커를 표시할 지도 객체
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 팝업창 내용을 저장하는 state
  const [modalContent, setModalContent] = useState(null);  
  // 모달창 노출 여부 state
  const [modalOpen, setModalOpen] = useState(false);
    
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

  
  // 모달창 노출
  const showModal = (index) => {
    // 각 페이지에 대한 팝업창 내용을 설정합니다.
    setModalContent(index);
    setModalOpen(true);
  };

  




  const handleLocationAdd = (page,lat,lng) => {
    console.log("page : " + page);
    console.log("lat : " + lat);
    console.log("lng : " + lng);

    debugger;
    
    
    debugger;
    const API_KEY = 'zhm82fadkm'; // 발급받은 API 키를 넣어줍니다.
    const baseUrl = "https://naveropenapi.apigw.ntruss.com/map-static/v2/raster?";
    const center = "center="+lng+","+lat+"&";
    const level = "level=14&";
    const size = "size=200x200";
    const url = baseUrl + center + level + size;
  



    // axios.get(url, {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'X-NCP-APIGW-API-KEY-ID': "zhm82fadkm",
    //     'X-NCP-APIGW-API-KEY': "yO1LhJxcOlfGsF1uOj7gbkUunIHijUzf9FXpZTle",
    //   },
    // })
    // .then((response) => {
    //   console.log(response);
    // })
    // .catch((error) => {
    //   console.error(error);
    // });    
    

    // const myComponent = "<NaverMap lat={'"+lat+"'} lng={'" + lng + "'}/>"; 
    const mapHtml = "<img src='https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center="+lng+","+lat+"&level=16&X-NCP-APIGW-API-KEY-ID=zhm82fadkm'>";
    // const mapHtml = "<MapImage lat='37.5666102' lng='126.9783881' />";
    // const myComponentHtml = ReactDOMServer.renderToString(mapHtml);

    handleEditorDataChange(page,mapHtml);
    
  };  
  
  const slides = Array.from({ length: data }, (_, index) => (
    
    <SwiperSlide key={index}>
      
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
            <button className="locbtn"  onClick={(event) => showModal(index)}>위치추가</button>        
            <input type="file" name="image" id={`imageInput-${index}`} style={{ display: 'none' }} onChange={(event) => handleImageUpload(event, index)} />
            <button className="potobtn" onClick={() => document.getElementById(`imageInput-${index}`).click()}>
              사진추가
            </button>
            
          </div>
        </div>
        <p><span><div id='map' style={{ width: '0', height: '0' }}></div></span></p>
        
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
