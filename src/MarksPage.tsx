
import db from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { CoordinateData } from "./types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import { API_KEY } from "./config"


const MarksPage = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: API_KEY
    })
    const containerStyle = {
        width: '600px',
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


    return isLoaded ? (
        <>

            <div>
                {
                    markers.map((mark, key) => {
                        return (
                            <div key={key}>
                                <h1>latitude: {mark.latitude}</h1>
                                <h1>longitude: {mark.longitude}</h1>
                            </div>
                        );
                    })}
            </div>
            <GoogleMap mapContainerStyle={containerStyle} center={{ lat: 35.7056396, lng: 139.7518913 }} zoom={17}>

                <Marker position={{ lat: 35.5687398, lng: 139.3950611 }} />
                <Marker position={{ lat: 35.5687398, lng: 139.3950611 }} />
            </GoogleMap>
        </>

    ) : (<></>);

};
export default MarksPage;






