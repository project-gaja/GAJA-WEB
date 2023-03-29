/**
 * 공통함수 메소드
 * @date   		    : 2023.03.23
 * @author   		: hosung98
 * ----------------------------------------
 */   

module.exports = {
    //뷰포트 설정
    viewportset:function () {
        const meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover";
        document.getElementsByTagName('head')[0].appendChild(meta);  
    }
}