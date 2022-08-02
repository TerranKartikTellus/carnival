import { useEffect, useState } from 'react';
import * as React from 'react';

import ReactMapGL,{ Marker,GeolocateControl,ScaleControl,NavigationControl} from "react-map-gl"
import "mapbox-gl/dist/mapbox-gl.css";

// pk.eyJ1IjoidGVycmFua2FydGlrdGVsbHVzIiwiYSI6ImNreWNsd3F6NTBxYzkydG9kcmdlbWV5bGYifQ._cEUQ-zPtsLt9faUD8GRWw


export default function Map({lat,long,time,e}){
// let z =3;
let z= 10.2;
const [zoom,setZoom] = useState(3);

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
        mapStyle="mapbox://styles/mapbox/light-v10"
         onViewportChange={viewport => setViewport({viewport})}
         
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        >
          
          <Marker longitude={long} latitude={lat} anchor="bottom" >
            {/* <img className='w-8 h-8' src="/img/mapbox-icon.png" /> */}
            {/* <svg className='w-4 animate-pin h-4 rotate-180 shadow-2xl drop-shadow-2xl   ' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg> */}
            <img className='w-6 animate-pin h-6 rotate-45 shadow-2xl drop-shadow-2xl' src="/international-space-station-svgrepo-com.svg"></img>
          </Marker>
        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <NavigationControl />
        </ReactMapGL>
        
        
        <div className='text-sm pt-5 flex flex-row items-start justify-start space-x-2'>
          <div>Incoming data: </div>
          {
            e &&
            <div className='bg-gray-10 rounded-full p-1'>
              <svg className='fill-gre-600 w-5 h-5 animate' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25 16.518l-4.5-4.319 1.396-1.435 3.078 2.937 6.105-6.218 1.421 1.409-7.5 7.626z"/></svg>
            </div>
          }
          {
            !e &&
            <div>
              <svg className='rotate-180 fill-red-600' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.698 15.354c-.405-.031-.367-.406.016-.477.634-.117.913-.457.913-.771 0-.265-.198-.511-.549-.591-.418-.095-.332-.379.016-.406.566-.045.844-.382.844-.705 0-.282-.212-.554-.63-.61-.429-.057-.289-.367.016-.461.261-.08.677-.25.677-.755 0-.336-.25-.781-1.136-.745-.614.025-1.833-.099-2.489-.442.452-1.829.343-4.391-.845-4.391-.797 0-.948.903-1.188 1.734-.859 2.985-2.577 3.532-4.343 3.802v4.964c3.344 0 4.25 1.5 6.752 1.5 1.6 0 2.426-.867 2.426-1.333 0-.167-.136-.286-.48-.313z"/></svg>
            </div>
          }
          
        </div>
        <div className='flex flex-row items-start justify-start space-x-3'><br></br>
           { zoom==10.2 && <button onClick={()=>{
            setZoom(3);
           }} className='bg-gray-900 scale-7 rounded p-2  text-gray-100 font-sans text-sm tracking-wide' >Globe View</button>
           }
           
           {zoom==3 && <button onClick={()=>{
            setZoom(10.2);
           }} className='bg-gray-900 scale-7 rounded p-2  text-gray-100 font-sans text-sm tracking-wide' >Street View</button>
          }</div>
    </div>
  );
}