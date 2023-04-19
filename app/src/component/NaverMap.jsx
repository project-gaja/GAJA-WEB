import styles from './../styles/location_modal.css';
import React,{ useState, useEffect, useRef } from 'react';


function NaverMAP({lat,lng}) {
    const mapElement = useRef(null);

    useEffect(() => {
      const { naver } = window;
      if (!mapElement.current || !naver) return;
  
      //로케이션표시 Google maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있다.
      const location = new naver.maps.LatLng(lat, lng);
  
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
    }, []);
  
    return (
        <div className='modal_center'>
        <div ref={mapElement} style={{ minHeight: '100%' }} />
        </div>
    );
}
export default NaverMAP;