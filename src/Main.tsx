import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import { API_KEY } from "./config"


const Main = () => {
  //ここで読み込まれるまでのレンダリングを抑制する。
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: API_KEY
  })

  const [place, setPlace] = useState<string>('');
  //初期値:淵野辺
  const [markerPlace, setMarkerPlace] = useState<google.maps.LatLngLiteral>({
    lat: 35.5687398,
    lng: 139.3950611
  })

  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  //検索ボタンを押すと読み込まれるもの
  const pushData = () => {
    //名称から、緯度経度に変更
    //できたらしたいこと、サジェスト機能
    Geocode.setApiKey(API_KEY);
    Geocode.fromAddress(place).then(
      response => {
        let { lat, lng } = response.results[0].geometry.location;
        setMarkerPlace({ lat, lng })
        console.log(markerPlace)
      },
      error => {
        console.error(error);
      }
    );
  }
  //地図の中心



  return isLoaded ? (
    <>

      <p>地名検索</p>

      <input type='text'
        onChange={(e) => {
          setPlace(e.target.value)
        }}></input>
      <button onClick={() => pushData()}>検索開始</button>
      <GoogleMap mapContainerStyle={containerStyle} center={markerPlace} zoom={17}>
        <Marker position={markerPlace} />
      </GoogleMap>

    </>
  ) : (<></>);
};

export default Main;

