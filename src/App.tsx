import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import { API_KEY } from "./config"
const containerStyle = {
  height: "100vh",
  width: "100%",
};



const App = () => {

  const [place, setPlace] = useState<string>('');
  //デフォルト淵野辺駅
  const [la, setLa] = useState<number>(35.5687398)
  const [ln, setLn] = useState<number>(139.3950611)

  const center:google.maps.LatLngLiteral = {
    lat: la,
    lng: ln,
  };
  const [markerPlacce,setMarkerPlace]= useState<google.maps.LatLngLiteral>({
    lat:35.5687398,
    lng:139.3950611
  })

  //検索ボタンを押すと読み込まれるもの
  const pushData = () => {
    //名称から、緯度経度に変更
    //できたらしたいこと、サジェスト機能
    Geocode.setApiKey(API_KEY);
    Geocode.fromAddress(place).then(
      response => {
        let { lat, lng } = response.results[0].geometry.location;
        //useStateを変更
  
        setMarkerPlace({lat, lng})
        console.log(center)
      },
      error => {
        console.error(error);
      }
    );


  }
  //地図の中心
  

 
  return (
    <>
      <p>地名検索</p>
      <input type='text'
        onChange={(e) => { 
          setPlace(e.target.value) 
          }}></input>
      <button onClick={() =>  pushData()}>検索開始</button>

      <LoadScript googleMapsApiKey={API_KEY}>

        <GoogleMap mapContainerStyle={containerStyle} center={markerPlacce} zoom={17}>


        <WrappedMarker {...markerPlacce}/>

        </GoogleMap>

      </LoadScript>
    </>
  );
};

export default App;

const WrappedMarker = (props: google.maps.LatLng | google.maps.LatLngLiteral) => {

  return (
    <Marker
    position={props}
    />
  )
}


// import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// const containerStyle = {
//   height: "100vh",
//   width: "100%",
// };

// const center = {
//   lat: 35.69575,
//   lng: 139.77521,
// };

// const positionAkiba = {
//   lat: 35.69731,
//   lng: 139.7747,
// };

// const positionIwamotocho = {
//   lat: 35.69397,
//   lng: 139.7762,
// };

// const MyComponent = () => {
//   return (
//     <LoadScript googleMapsApiKey="AIzaSyBs6yllIRWhYfedoBviaf2QeEa171fLXS8">
//       <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
//         <Marker position={positionAkiba} />
//         <Marker position={positionIwamotocho} />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default MyComponent;