import styles from './../styles/location_modal.css';
import TextField from '@mui/material/TextField';
import React,{ useState, useEffect, useRef } from 'react';


function ModalBasic({ setModalOpen, id, title, content, writer ,handleLocationAdd}) {
    const mapElement = useRef(null);
    const [latvalue, setlat] = React.useState(''); //위도
    const [lngvalue, setlng] = React.useState(''); //경도

  
    useEffect(() => {
      const { naver } = window;
      if (!mapElement.current || !naver) return;
  
      //로케이션표시 Google maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있다.
      const location = new naver.maps.LatLng(37.5663, 126.9779);
  
      //네이버 지도 옵션 선택
      const mapOptions = {
        center: location,
        zoom: 16,
        zoomControl: true,
        zoomControlOptions: {
          position: naver.maps.Position.TOP_RIGHT,
        },
      };
      const map = new naver.maps.Map(mapElement.current, mapOptions);
  
      //지도상에 핀 표시 할 부분
      const marker = new naver.maps.Marker({
        position: location,
        map: map,
      });
      naver.maps.Event.addListener(map, 'click', function(e) {

        setlat(e.coord._lat);
        setlng(e.coord._lng);
        marker.setPosition(e.coord);
      });    
    }, []);
  

    
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    //위치추가 버튼
    function fn_locationbtn() {
        handleLocationAdd(id,latvalue,lngvalue)
        closeModal();
    }
    
    return (
        <div className="containermodal">
            <button className="close" onClick={closeModal}>
                X
            </button>
            <div className='modal_top'>
                <input type='TextField' className='searchbox'></input>
                <button className='searchbtn' onClick={fn_locationbtn} >검색</button>
            </div>
            <div className='modal_center'>
            <div ref={mapElement} style={{ minHeight: '100%' }} />
            </div>
            <div className='modal_bottom'>
                <button className='locationbtn' onClick={fn_locationbtn} >위치추가</button>
            </div>
        </div>
    );
}
export default ModalBasic;