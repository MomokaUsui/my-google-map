

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import { API_KEY } from "./config"
import { Link } from "react-router-dom"
// import Save from "./Save";


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
    width: '1200px',
    height: '600px'
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

      <div className="container px-6 mx-auto">
        <div className="flex flex-wrap py-2">
          <div className="w-full px-4">
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-500 rounded">
              <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                  <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                    Google Map Api
                  </a>
                  <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase text-white" href="#pablo">
                    search
                  </a>

                </div>
                <div className="flex lg:flex-grow items-center" id="example-navbar-info">
                  <ul className="flex flex-col lg:flex-row list-none ml-auto">
                    <li className="nav-item">
                      <Link to="/" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" >
                        Back to Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75">
                        View List
                      </a>
                    </li>
                    <li className="nav-item">
                      <Link to="/markSavePage" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" >
                        Marker List
                      </Link>

                    </li>
                  </ul>
                </div>
              </div>
            </nav>



            <div className="container px-0 py-6 mx-auto lg:flex lg:items-center lg:justify-between">
              <div className="mt-8 lg:mt-0">
                <label className="leading-7 text-sm text-gray-600 mx-1">Search</label>
                <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2">

                  <input type='text'
                    placeholder="淵野辺"
                    className='px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md sm:mx-2 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-indigo-400 dark:focus:border-indigo-400 focus:ring-indigo-300 focus:outline-none focus:ring focus:ring-opacity-40'
                    onChange={(e) => {
                      setPlace(e.target.value)
                    }}></input>


                  <button className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-500 rounded-md focus:ring focus:ring-indigo-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600" onClick={() => pushData()}>検索開始</button>
                </div>
              </div>
            </div>



            <div className="center">
              <GoogleMap mapContainerStyle={containerStyle} center={markerPlace} zoom={15}>
                <Marker position={markerPlace} />
                <Marker position={{ lat: 35.5687398, lng: 139.3950611 }} />
              </GoogleMap>
            </div>
          </div>
        </div>






        <footer className="bg-white dark:bg-gray-800">
          <div className="container px-6 py-8 mx-auto">
            <div className="text-center">
            </div>

            <hr className="my-10 border-gray-200 dark:border-gray-700" />

            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <p className="text-sm text-gray-400">© Copyright 2022. All Rights Reserved.</p>

              <div className="flex mt-3 -mx-2 sm:mt-0">
                <a href="#" className="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Teams </a>

                <a href="#" className="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Privacy </a>

                <a href="#" className="mx-2 text-sm text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit"> Cookies </a>
              </div>
            </div>
          </div>

        </footer>
      </div>



    </>
  ) : (<></>);
};

export default Main;


