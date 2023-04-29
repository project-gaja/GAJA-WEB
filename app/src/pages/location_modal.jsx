import styles from './../styles/location_modal.css';
import TextField from '@mui/material/TextField';
import React,{ useState, useEffect, useRef } from 'react';
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';
import axios from 'axios';

function ModalBasic({ setModalOpen, id, title, content, writer ,handleLocationAdd}) {
    const mapElement = useRef(null);
    const [latvalue, setlat] = React.useState('37.5663'); //위도
    const [lngvalue, setlng] = React.useState('126.9779'); //경도
    const [location, setlocation] = React.useState(''); //위치


    const [searchval,setserchval] = useState(null);
    
    useEffect(() => {
      const { naver } = window;
      if (!mapElement.current || !naver) return;
  
      //로케이션표시 Google maps에서 원하는 장소 찾은 후 주변검색을 누르면 좌표를 찾을 수 있다.
      const location = new naver.maps.LatLng(latvalue, lngvalue);
      
      
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
      
    }, [latvalue, lngvalue]);
  

    
    // 모달 끄기 
    const closeModal = () => {
        setModalOpen(false);
    };

    //위치추가 버튼
    function fn_locationbtn() {
        handleLocationAdd(id,latvalue,lngvalue)
        closeModal();
    }

    //검색 버튼
    function fn_searchbtn() {
      const query = document.querySelector('.searchbox').value;
      searchLocation(query);
    }

    //검색 버튼
    async function searchLocation(query) {
      debugger;
      const url = "/map-geocode/v2/geocode?query=" + query;
      
      axios.get(url, {
        headers: {
          'X-NCP-APIGW-API-KEY-ID': 'zhm82fadkm',
          'X-NCP-APIGW-API-KEY': 'XAIQ4hTQEAV5rfj66fhmv3XXrsXcdGTfsAR7xyIP'
        }
      })
      .then(response => {
        debugger;
        setlat(response.data.addresses[0].y);
        setlng(response.data.addresses[0].x);
      })
      .catch(error => {
       // console.error(error);
      });      
    }    


    return (
        <div className='background'>
        <div className="containermodal">
            
            <button className="close" onClick={closeModal}>
                X
            </button>
            <div className='modal_top'>
                <input type='TextField' className='searchbox' ></input>
                <button className='searchbtn' onClick={fn_searchbtn} >검색</button>
            </div>
            <div className='modal_center'>
            <div ref={mapElement} style={{ minHeight: '100%' }} />
            </div>
            <div className='modal_bottom'>
                <button className='locationbtn' onClick={fn_locationbtn} >위치추가</button>
            </div>
        </div>
        </div>
    );
}
export default ModalBasic;