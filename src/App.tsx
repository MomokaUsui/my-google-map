import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useState } from "react";

const containerStyle = {
  height: "100vh",
  width: "100%",
};



const App = () => {

  const [place, setPlace] = useState('');
  //デフォルト淵野辺駅
  const [la, setLa] = useState(35.5687398)
  const [ln, setLn] = useState(139.3950611)

  const center = {
    lat: la,
    lng: ln,
  };


  //検索ボタンを押すと読み込まれるもの
  const PushData = () => {


    //名称から、緯度経度に変更
    //できたらしたいこと、サジェスト機能
    Geocode.setApiKey("AIzaSyBs6yllIRWhYfedoBviaf2QeEa171fLXS8");
    Geocode.fromAddress(place).then(
      response => {
        let { lat, lng } = response.results[0].geometry.location;
        //useStateを変更
        setLa(lat)
        setLn(lng)
        console.log(lat, lng)
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
        onChange={(e) => { setPlace(e.target.value) }}></input>
      <button onClick={() => { PushData(); }}>検索開始</button>

      <LoadScript googleMapsApiKey="AIzaSyBs6yllIRWhYfedoBviaf2QeEa171fLXS8">

        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>


          <Marker position={center} />

        </GoogleMap>

      </LoadScript>
    </>
  );
};

export default App;


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