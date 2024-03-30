import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
  } from "@material-tailwind/react";
   
  export function ImageCard() {
    return (      
      <div className="w-full bg-white shadow-xl rounded-[10px] overflow-hidden group hover:hue-rotate-15 hover:shadow-xl hover:shadow-blue-gray-300 cursor-pointer transition-all duration-700">
                  <div className="bg-cover bg-center h-16 p-4 flex justify-end items-center bg-[url(https://content.api.news/v3/images/bin/11990db1d540d5c13ea8ca3e01f2083c)]">
                      <p className="uppercase tracking-widest text-sm text-white bg-black py-1 px-2 rounded opacity-75 shadow-lg">DFW <span className="tracking-normal"></span> SEA</p>
                  </div>
        <div className="px-4 pb-3 pt-4 border-b border-gray-300 bg-gray-100 flex justify-between">
                      <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">TSA: <span className="font-normal">5-12 min</span></div>
          <div className="text-xs uppercase font-bold text-gray-600 tracking-wide">Airport Status: <span className="font-normal text-green-600">Normal</span></div>
                  </div>
                  <div className="p-4 text-gray-700 flex justify-between items-start">
          <div>
            <p className="text-3xl text-gray-900 leading-none my-1">AA 792</p>
            <p className="text-xs w-56">American Airlines</p>
            <p className="text-sm w-56">7:11 am  10:10 am</p>
            
            
          </div>
          <div className="leading-loose bg-green-500 text-white p-1 px-2 rounded-[10px] uppercase text-xs tracking-wider">On Time</div>
                  </div>
                  <div className="flex justify-between items-center p-4 border-t border-gray-300 text-gray-600">
                      <div className="flex items-center">
            <p><span className="text-sm pr-1">Terminal</span> <span className="text-gray-900 font-bold">C</span></p>
                      </div>
          <div className="flex items-center">
            <p><span className="text-sm pr-1">Gate</span> <span className="text-gray-900 font-bold">C24</span></p>
                      </div>
          <div className="flex items-center">
            <p><span className="text-sm pr-1">Seats</span> <span className="text-gray-900 font-bold">12D, 12E</span></p>
                      </div>
                  </div>
                  
      </div>     
    );
  }





  export function ImageCardFallback(){
    return (
      <div className="w-full bg-[#ffffff]  rounded-[10px] overflow-hidden group cursor-pointer">
                  <div className="bg-cover bg-center h-16 p-4 flex justify-around items-center bg-[#e6e6e6] ">
                      <p className="bg-[#c5c5c5] rounded-[10px] animate-pulse h-4 w-[60%] px-2"/>
                      <p className="bg-[#c5c5c5] rounded-[10px] animate-pulse h-4 w-[20%] px-2"/>

                  </div>
     
        
         
                  <div className="flex flex-col justify-start gap-3 items-center p-2 bg-transparent">
                  <p className="bg-[#dadada] rounded-[10px] animate-pulse h-4 w-[95%] px-2"/>
                  <p className="bg-[#dadada] rounded-[10px] animate-pulse h-4 w-[95%] px-2"/>
                  <p className="bg-[#dadada] rounded-[10px] animate-pulse h-4 w-[45%] px-2"/>
                      
                  </div>
                  
      </div>
    )
  }