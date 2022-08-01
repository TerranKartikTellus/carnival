
import moment from 'moment';

import Head from "next/head"
import axios from "axios"
import { useState } from "react";
import Link from "next/link";

export default function liveLoc(){
const [Lat,setLat]   = useState();
const [Long,setLong] = useState();
const [time,setTime] = useState();
const [e,sete] = useState();
async function getData(){
await  axios.get("//api.open-notify.org/iss-now.json")
      .then(e=>{
      console.log(e);
        // console.log("lat-  ",e.data.iss_position.latitude);
        // console.log("long- ",e.data.iss_position.longitude);
        // console.log("time- ",String(e.data.iss_position.timestamp));
        sete(e);
        setLat(e.data.iss_position.latitude);
        setLong(e.data.iss_position.longitude);
        // let date =  new Date(e.data.iss_position.timestamp * 1000)
        
        var time = moment(e.data.iss_position.timestamp).format("DD-MM-YYYY h:mm:ss");
        console.log(time);
        setTime(time);
      },
      error=>{
            // console.log("error: ",error);
      });}

    setInterval( getData,[5000]);

  return(
    <div className="h-screen flex flex-col items-center space-y-2 justify-center">
       <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />


      </Head>
      <div className="flex flex-row items-center justify-center space-x-3">
      <div>Live Location</div>
      <div className="group relative  transition-all duration-1000 ease-in-out ">
        <svg className="" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm1-6h-2v-8h2v8zm-1-12.25c.69 0 1.25.56 1.25 1.25s-.56 1.25-1.25 1.25-1.25-.56-1.25-1.25.56-1.25 1.25-1.25z"/></svg>
        <div className="hidden opacity-0 group-hover:opacity-80 group-hover:inline-block group-hover:absolute bg-red- translate-x-5 group-hover:translate-x-0 transition-all duration-1000 ease-in-out -top-10  left-10 w-[300px]">
          The International Space Station is moving at close to 28,000 km/h
          <br></br>
        </div>
      </div>
      <br></br>
          <Link href="http://open-notify.org/Open-Notify-API/ISS-Location-Now/"><a className='font-semibold underline'>API</a></Link>
      </div>
      <div className="flex flex-row items-center justify-center space-x-3">
        <LiveLocation></LiveLocation>
        <LiveAPIdata e={e} lat={Lat} long={Long} time={time}></LiveAPIdata>
      </div>
    </div>
  );
}
function LiveLocation(){
    
  

  return(
    <div className="p-3 transition-all duration-300 ease-in-out bg-gray-200/30  rounded shadow-xl hover:shadow-gray-600/50">
      map
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
      <div>Load</div> 
     }
    {
      e && 
      <div className='w-[250px]'><Date  lat={lat} long={long} time={time} e={e} ></Date></div>
    }
    </div>
  );
}
function Date({lat,long,time,e}){
  return(
    <div className='w-full'>
      <div className='w-full flex flex-row items-start justify-start'>
        <div className='w-1/3 font-bold'>Latitude</div>
        <div className='w-2/3'>{lat}</div>
      </div>

      <div className='w-full flex flex-row items-start justify-start'>
        <div className='w-1/3 font-bold'>Longitude</div>
        <div className='w-2/3'>{long}</div>
      </div >

      <div className='w-full flex flex-row items-start justify-start'>
        <div className='w-1/3 font-bold' >Time</div>
        <div className='w-2/3' >{time}</div>
      </div>

    </div>
  );
}