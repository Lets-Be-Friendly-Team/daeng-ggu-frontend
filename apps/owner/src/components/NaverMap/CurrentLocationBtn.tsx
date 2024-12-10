import { useEffect } from 'react';
import { useMap, useNavermaps } from 'react-naver-maps';

interface CurrentLocationBtnProps {
  lat: number;
  lng: number;
}
const CurrentLocationBtn = ({ lat, lng }: CurrentLocationBtnProps) => {
  const map = useMap(); // 네이버 지도 객체
  const navermaps = useNavermaps(); // 네이버 맵스 객체

  useEffect(() => {
    if (!map || !navermaps) {
      console.error('Map or Navermaps object is undefined');
      return;
    }

    const locationBtnHtml = `
      <a href="#"
        style="
          z-index: 100;
          overflow: hidden;
          display: inline-block;
          position: absolute;
          top: 7px;
          left: 5px;
          width: 34px;
          height: 34px;
          border: 1px solid rgba(58,70,88,.45);
          border-radius: 2px;
          background: #fcfcfd;
          text-align: center;
        "
      >
        <span style="
          overflow: hidden;
          display: inline-block;
          vertical-align: top;
          background: url(https://ssl.pstatic.net/static/maps/m/spr_trff_v6.png) no-repeat -153px -31px;
          width: 20px;
          height: 20px;
          margin: 7px 0 0 0;
        "></span>
      </a>
    `;

    // CustomControl 생성
    const customControl = new navermaps.CustomControl(locationBtnHtml, {
      position: navermaps.Position.TOP_LEFT,
    });

    // 컨트롤을 지도에 추가
    customControl.setMap(map);

    // 클릭 이벤트 추가
    const domElement = customControl.getElement();
    const handleClick = () => {
      if (lat && lng) {
        map.setCenter(new navermaps.LatLng(lat, lng));
      }
    };
    domElement.addEventListener('click', handleClick);

    // 정리
    return () => {
      domElement.removeEventListener('click', handleClick);
      customControl.setMap(null); // 지도에서 제거
    };
  }, [lat, lng, map, navermaps]);

  return null; // DOM에 렌더링하지 않음
};

export default CurrentLocationBtn;
