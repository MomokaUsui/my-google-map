import { useState } from "react";
import { useEffect } from "react";
import db from './firebase'
import { collection, getDocs } from 'firebase/firestore'
import { CoordinateData } from "./types";


const MarksPage = () => {
    const [markers, setMarkers] = useState<CoordinateData[]>([])

    useEffect(() => {
        //データベースからデータを取得する
        const markerData = collection(db, "markers");
        getDocs(markerData).then((snapShot) => {
            console.log(snapShot.docs.map((doc) =>  doc.data() )[0]);
            setMarkers([...snapShot.docs.map((doc) => {
                return {
                    latitude: doc.data().latitude,
                    longitude: doc.data().longitude
                }
            })]);

        })

    }, [])


    return (

        <div>
            {
            markers.map((mark,key) => {
                return (
                <div key={key}>
                <h1>latitude: {mark.latitude}</h1>
                <h1>longitude: {mark.longitude}</h1>
                </div>
                )
            })}
        </div>

    );

}
export default MarksPage;