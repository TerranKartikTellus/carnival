import { useEffect, useState } from 'react';
import * as React from 'react';

import ReactMapGL,{ Marker,GeolocateControl,ScaleControl,NavigationControl} from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css";

// pk.eyJ1IjoidGVycmFua2FydGlrdGVsbHVzIiwiYSI6ImNreWNsd3F6NTBxYzkydG9kcmdlbWV5bGYifQ._cEUQ-zPtsLt9faUD8GRWw


export default function Map({view,lat,long,time,e}){
// let z =3;
let z= 10.2;
const [zoom,setZoom] = useState(
  view=="street view" ? 12 : 2.0
);

  const [viewport,setViewport] = useState({
  // style: 'mapbox://styles/mapbox/streets-v10',
  projection: 'globe',
  latitude: lat ,
  longitude: long,
  zoom: zoom,
  center: [long, lat],
  width: "600px",
  height: "500px"
})
const [latitude,setLat] = useState();
const [longitude,setLong] = useState();

useEffect((e)=>{
   setLat(lat);
   setLong(long);

   setViewport({
    // style: 'mapbox://styles/mapbox/streets-v10',
    projection: 'globe',
    latitude: lat ,
    longitude: long,
    zoom: zoom,
    center: [long, lat],
    width: "600px",
    height: "500px"
  });
},[e]);

// console.log(e);


  return(
    <div className="w-[600px] h-[500px]">
        <ReactMapGL
            attributionControl={true}
    initialViewState={viewport}
        center={[long, lat]}
        {...viewport}
        style={{width: 600, height: 400}}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
         onViewportChange={viewport => setViewport({viewport})}
         
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        >
          
          <Marker longitude={long} latitude={lat} anchor="bottom" >
            {/* <img className='w-8 h-8' src="/img/mapbox-icon.png" /> */}
            {/* <svg className='w-4 animate-pin h-4 rotate-180 shadow-2xl drop-shadow-2xl   ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg> */}
            <img className='w-6 invert animate-pin h-6 rotate-45 shadow-2xl drop-shadow-2xl' src="/international-space-station-svgrepo-com.svg"></img>
          </Marker>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <NavigationControl />
        </ReactMapGL>
        
        
        <div className='capitalize text-xl tracking-widest text-center w-full pt-5 flex flex-row items-start justify-start space-x-2'>
          {view}
        </div>
        
    </div>
  );
}