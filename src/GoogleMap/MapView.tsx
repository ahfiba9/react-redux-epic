import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './mapView.css'
import {AutoCompleteSearch} from "../autoCompleteSearch/AutoCompleteSearch";
import {useSelector} from "react-redux";
import {GlobalState} from "../redux/globalStates";

export default function Home() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''
    });

    if (!isLoaded) return <div>Loading...</div>;
    return <Map />;
}

function Map() {
    const markerPoint = useSelector((state: GlobalState) => state.googleMap.selectedCoordinate)

    return (

        <GoogleMap
            zoom={10}
            center={markerPoint ? markerPoint : { lat: 3.12230, lng: 101.7146}}
            mapContainerClassName="map-container"
        >
            {markerPoint ? <Marker position={markerPoint}/> : null}
            <div className={'searchBar'}>

                <AutoCompleteSearch/>
            </div>
        </GoogleMap>
    );
}

//https://maps.googleapis.com/maps/api/geocode/json?address={address}&key+{yourKey}
