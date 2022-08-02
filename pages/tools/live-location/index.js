
import moment from 'moment';

import Head from "next/head"
import axios from "axios"
import { useState } from "react";
import Link from "next/link";
import Load from '/components/loading';

import Map from "/components/map/map.js"
import "mapbox-gl/dist/mapbox-gl.css";

export default function liveLoc(){
const [Lat,setLat]   = useState();
const [Long,setLong] = useState();
const [time,setTime] = useState();
const [e,sete] = useState();

async function getData(){
  // await  axios.get("//api.open-notify.org/iss-now.json")
 await axios({
  method: 'get',
  url: "//api.open-notify.org/iss-now.json",
  responseType: 'stream'
}).then(e=>{
      // console.log(e);
        // console.log("lat-  ",e.data.iss_position.latitude);
        // console.log("long- ",e.data.iss_position.longitude);
        // console.log("time- ",String(e.data.iss_position.timestamp));
        sete(e);
        setLat(e.data.iss_position.latitude);
        setLong(e.data.iss_position.longitude);
        // let date =  new Date(e.data.iss_position.timestamp * 1000)
        
        var time = moment(e.data.iss_position.timestamp).format("DD-MM-YYYY h:mm:ss");
        // console.log(time);
        setTime(time);
      },
      error=>{
            // console.log("error: ",error);
      });}

    setInterval(getData,[5000]);

  return(
    <div className="h-screen flex flex-col  items-center space-y-2 justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
       <Head>
        <title>International Space Station Live Location</title>
        <link rel="icon" href="/favicon.ico" />


      </Head>
      <div className="flex flex-col items-center justify-center space-y-1">
      {/* <Load></Load> */}
      <div className='w-full flex flex-row items-center justify-center space-x-3'>

      <div className='text-2xl tracking-widest'>International Space Station Live Location</div>
      <div className="flex flex-row space-x-3 group relative  transition-all duration-1000 ease-in-out ">
        <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/></svg>
        <div className="bg-gray-100/95 rounded p-3 tracking-widest hidden opacity-0 group-hover:opacity-80 group-hover:inline-block group-hover:absolute bg-red- translate-x-5 group-hover:translate-x-0 transition-all duration-1000 ease-in-out -top-14  left-10 w-[300px]">
          The International Space Station is moving at close to 28,000 km/h
          <br></br>
        </div>
      </div>
      </div>
      <Link href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/"><a className='font-semibold underline'>API</a></Link>
      <br></br>
      </div>
      <div className="flex  flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-center space-x-3">
        { e && <LiveLocation e={e} lat={Lat} long={Long} time={time}></LiveLocation>}
        <LiveAPIdata e={e} lat={Lat} long={Long} time={time}></LiveAPIdata>
      </div>
    </div>
  );
}
function LiveLocation({lat,long,time,e}){
    const data = [
  {sourcePosition: [-122.41669, 37.7853], targetPosition: [-122.41669, 37.781]}
];
  

  return(
    <div className="p-3 transition-all duration-300 ease-in-out bg-gray-200/30  rounded shadow-xl hover:shadow-gray-600/50">
       {!e && <div>...</div>}
       {e && 
       <div className='w-full h-full flex flex-row items-center justify-center space-x-3'>
        <Map className="scale-90" view={"street view"} lat={lat} long={long} time={time}  e={e}></Map>
       <Map  className="scale-90" view={"globe view"} lat={lat} long={long} time={time}  e={e}></Map>
       </div>
       
       }
    </div>
  );
}
function LiveAPIdata({lat,long,time,e}){
    // setInterval(()=>{
    //   navigator.geolocation.getCurrentPosition(getPosition)
    // },[1000]);
  

  return(
    <div className="p-3 transition-all duration-300 ease-in-out bg-gray-200/30  rounded shadow-xl hover:shadow-gray-600/50">
     {
      !e  &&
      <div className='w-[25px] h-[250 flex flex-row items-center justify-center'><Load></Load> </div> 
     }
    {
      e && 
      <div className='w-[220px] h-[500px] flex flex-col items-center justify-center'><Date  lat={lat} long={long} time={time} e={e} ></Date></div>
    }
    </div>
  );
}
function Date({lat,long,time,e}){
  return(
    <div className='w-full flex flex-col items-center justify-around space-y-10'>
      {/* <div className='font-sans text-xl mb-5'>Location: ISS</div> */}
      <div className='w-full flex flex-col items-center justify-center tracking-widest'>
        <div className='w- font-bo  text-2xl '>Latitude</div>
        <div className='w text-base -'>{lat}</div>
      </div>

      <div className='w-full flex flex-col items-center justify-center tracking-widest'>
        <div className='-1/3 font-old  text-2xl '>Longitude</div>
        <div className='-2/3 text-base '>{long}</div>
      </div >

      <div className='w-full flex flex-col items-center justify-center tracking-widest'>
        <div className='-1/3 fontbold  text-2xl ' >Time</div>
        <div className='-2/3' text-base  >{time}</div>
      </div>

    </div>
  );
}