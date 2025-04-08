import React from "react";

function Navbar() {
  return (
    <div className=" font-Work_sans bg-yellow-500">
      <div className="">
        <div className="flex justify-between items-center gap-x-5">
          <div className="font-Work_sans font-bold text-[25px] text-[white]">
            ALUCARD SHOP
          </div>
          <div>
            <div className='text-[14px] font-medium text-[#000] text-sm relative'>
            <div className="  bg-white py-2 px-2">All</div>
              <select className="absolute top-0 bottom-0 opacity-0">
                <option selected="selected">All</option>
                <option  >Car &amp; Tools</option>
                <option>Books &amp; Office</option>
              </select>
            </div>
          </div>
          <div>c=b=u=l</div>
        </div>
        <div clasName="2nd header"></div>
      </div>
    </div>
  );
}

export default Navbar;
