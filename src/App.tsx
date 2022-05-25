import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import Geocode from "react-geocode";
import { useEffect, useState } from "react";
import { API_KEY } from "./config"
import Main from "./Main";
import MarksPage from "./MarksPage";

function App() {
    return (
        <>
            {/* <Main /> */}
            <MarksPage />
        </>
    )
}
export default App; 