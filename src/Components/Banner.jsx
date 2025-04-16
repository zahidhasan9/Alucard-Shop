import React from 'react';
import { Rocket,RefreshCcw,ShieldCheck,MessageSquareText } from 'lucide-react';

// import Banner IMG 
import Bn1 from "../assets/images/Banner/bn1.webp"
import Bn2 from "../assets/images/Banner/bn2.webp"
import Bn3 from "../assets/images/Banner/bn3.webp"

const Bnr=[
  {
    img:Bn1,
    title:"10% off"
  },
  {
    img:Bn2,
    title:"10% off"
  },
  {
    img:Bn3,
    title:"10% off"
  },
  {
    img:Bn1,
    title:"10% off"
  },
]
const Banner = () => {
  return (
    <>
    {/* container */}
      <div className="container  ">
        <div className="  py-16  ">
          <div className="flex flex-col md:flex-row md:justify-evenly items-center w-full font-Work_sans  ">
            <div className="lg:flex gap-x-4">
              <div className="flex items-center  gap-x-4 p-3 border-gray-400 lg:border-r-[0.5px]">
                <div><Rocket className='mt-2' color='#fcb800' size={'50px'}/></div>
                <div>
                  <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>Free Delivery</h1>
                  <p className=' text-gray-600 text-sm font-light tracking-wide'>For all oders over $99</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 p-3 border-gray-400 lg:border-r-[0.5px] ">
                <div><RefreshCcw className='mt-2 size-[50px]' color='#fcb800'  /></div>
                <div>
                  <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>90 Days Return</h1>
                  <p className=' text-gray-600 text-sm font-light tracking-wide'>If goods have problems</p>
                </div>
              </div>
            </div>
            <div className="lg:flex gap-x-4">
              <div className="flex items-center gap-x-4 p-3  border-gray-400 lg:border-r-[0.5px]">
                <div><ShieldCheck className='mt-2' color='#fcb800' size={'50px'}/></div>
                <div>
                  <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>Secure Payment</h1>
                  <p className=' text-gray-700 text-sm font-light tracking-wide'>100% secure payment</p>
                </div>
              </div>
              <div className="flex items-center gap-x-4 p-3 ">
                <div><MessageSquareText className='mt-2' color='#fcb800' size={'50px'}/></div>
                <div>
                  <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>24/7 Support</h1>
                  <p className=' text-gray-700 text-sm font-light tracking-wide'>Dedicated support</p>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Banner section */}
          <div className="banner bottom py-16">
            <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4'>
              { Bnr.map((data,idx) =>
                  <div className='col-span-3 md:col-span-2 lg:col-span-1 gap-3' key={idx}>
                    <div className='flex justify-center h-48 border-[#fcb800] border-[1px] rounded-lg shadow-sm overflow-hidden '>
                     <img src={data.img} alt={data.title} className='w-full h-full object-cover rounded' />
                    </div>
                  </div>  
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
