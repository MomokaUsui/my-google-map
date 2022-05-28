
import db from './firebase'
import { collection, getDocs, doc, setDoc } from 'firebase/firestore'
import { CoordinateData, Position } from "./types";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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
    const pins: { lat: number, lng: number }[] = [];

    return isLoaded ? (
        <>
            <div>
                {
                    markers.map((mark, key) => {

                        const apple: Position = { lat: mark.latitude, lng: mark.longitude }
                        pins.push(apple);
                        return (
                            <div key={key}>

                                <h1>latitude: {mark.latitude}</h1>
                                <h1>longitude: {mark.longitude}</h1>
                            </div>
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
        </>
    ) : (<></>);
};
export default MarksPage;






