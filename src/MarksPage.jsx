import { useState } from "react";
import { useEffect } from "react";
import db from './firebase'
import { collection, getDocs } from 'firebase/firestore'


const MarksPage = () => {
    const [markers, setMarkers] = useState([])

    useEffect(() => {
        //データベースからデータを取得する
        const markerData = collection(db, "markers");
        getDocs(markerData).then((snapShot) => {
            console.log(snapShot.docs.map((doc) => ({ ...doc.data() })));
            setMarkers(snapShot.docs.map((doc) => ({ ...doc.data() })));

        })

    }, [])


    return (

        <div>
            {markers.map((mark) => {

                <h1>{mark.longitude}</h1>
                console.log(mark.longitude * 2)

            })}
        </div>

    );

}
export default MarksPage;