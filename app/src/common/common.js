import axios from 'axios';
import { API_LOCAL_URL } from './../common/constants'; 

/**
 * 공통함수 모음
 * @date               : 2023.03.23
 * @author           : hosung98
 * ----------------------------------------
 */
export default {
  /**
   * 뷰 포트 설정 (inputbox 포커스 시 확대 금지)
   * @date               : 2023.04.25
   * @description     : 뷰 포트 설정
   */
  viewportset: function () {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName('head')[0].appendChild(meta);
  },

  /**
   * axios 통신 메소드
   * @param {string} url - 컨트롤러 url
   * @param {string} method - GET,POST,DELETE,PUT
   * @param {object} data - 서버쪽으로 보낼 데이터
   * @return {Promise} - axios 요청 결과를 Promise로 반환
   * @date               : 2023.04.25
   * @description     : axios 통신 메소드
   */
  axiosReq: async function (url, method, data) {
    const config = {
      method: method,
      url: url,
      data: data
    };
    return axios(config).then(response => response.data);
  },

  /**
   * Date 형식 변환 메소드 (Date type >> "YYYY-MM-DD")
   * @param {Date} date - 변환할 Date 객체
   * @return {string} - 변환된 날짜 문자열
   * @date               : 2023.04.25
   * @description     : Date 형식 변환 메소드 (Date type >> "YYYY-MM-DD")
   */
  dateformat: function (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  },

  /**
   * IP 주소 가져오는 메소드
   * @return {Promise} - IP 주소를 Promise로 반환
   * @date               : 2023.04.25
   * @description     : IP 주소 가져오는 메소드
   */
  getIPAddress: async function() {
    debugger;
    const res = await axios.get('https://geolocation-db.com/json/')
    .then((res) => {
      console.log("data : ", res)
    })
  }
};