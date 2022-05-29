
import db from './firebase'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { CoordinateData, Position } from "./types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { API_KEY } from "./config"
import { Link } from 'react-router-dom';

const MarksPage = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    })
    const containerStyle = {
        width: '1200px',
        height: '600px'
    };

    const [markers, setMarkers] = useState<CoordinateData[]>([])

    useEffect(() => {
        //データベースからデータを取得する
        const markerData = collection(db, "markers");
        getDocs(markerData).then((snapShot) => {
            console.log(snapShot.docs.map((doc) => doc.data())[0]);
            setMarkers([...snapShot.docs.map((doc) => {
                return {
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude
                }
            })]);
        })
    }, [])
    const pins: { lat: number, lng: number }[] = [];

    return isLoaded ? (
        <>
            <div className="container px-6 mx-auto">
                <div className="flex flex-wrap py-2">
                    <div className="w-full px-4">
                        <div className='py-5'>
                            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-indigo-400 rounded">
                                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                                    <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white" href="#pablo">
                                            Google Map Api
                                        </a>
                                        <a className="text-sm font-bold leading-relaxed inline-block mr-4 py-0 whitespace-nowrap uppercase text-white" href="#pablo">
                                            View
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
                                                <Link to="/search" className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75" >
                                                    Search Page
                                                </Link>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>




                        <div>
                            {
                                markers.map((mark, key) => {

                                    const apple: Position = { lat: mark.latitude, lng: mark.longitude }
                                    pins.push(apple);
                                    return (<></>
                                        //検索表示コメントアウト
                                        // <div key={key}>
                                        //     <h1>latitude: {mark.latitude}</h1>
                                        //     <h1>longitude: {mark.longitude}</h1>
                                        // </div>
                                    );
                                })}
                        </div>
                        <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 35.7056396, lng: 139.7518913 }} zoom={17}>
                            {
                                pins.map((pin, key2) => {
                                    console.log(pin)
                                    return (<div key={key2}><Marker position={pin} /></div>);
                                })}
                        </GoogleMap>
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
export default MarksPage;






