import axios from 'axios';


/**
 * 공통함수 모음
 * @date   		    : 2023.03.23
 * @author   		: hosung98
 * ----------------------------------------
 */
export default {
  /**
   * 뷰 포트 설정 (inputbox 포커스 시 확대 금지)
   * @date   		    : 2023.04.25
   * @author   		: hosung98
   * ----------------------------------------
   */
  viewportset: function () {
    const meta = document.createElement('meta');
    meta.name = "viewport";
    meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
  /**
   * axios 통신 메소드
   * url    : 컨트롤러 url
   * method : GET,POST,DELETE,PUT
   * data   : 서버쪽으로 보낼 데이터
   * @date   		    : 2023.04.25
   * @author   		: hosung98
   * ----------------------------------------
   */
  axiosReq: function (url, method, data) {
    return new Promise(function (resolve, reject) {
      let config = {
        method: method,
        url: url,
        data: data
      };
      axios(config)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * Date 형식 변환 메소드 (Date type >> "YYYY-MM-DD")
   * @date   		    : 2023.04.25
   * @author   		: hosung98
   * ----------------------------------------
   */
  dateformat: function (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
