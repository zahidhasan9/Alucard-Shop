import React from 'react';

const Banner = () => {
  return (
    <>
      <div className="h-32 bg-slate-50 ">
        <div className='flex items-center justify-center bg-slate-400 h-full'>
          <div className=" flex justify-center items-center bg-red-200 gap-x-3 ">
            <div className='flex items-center gap-x-2'>
              <div>logo</div>
              <div>
                <h1>Free Delivery</h1>
                <p>For all oders over $99</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2'> 
              <div>logo</div>
              <div>
                <h1>90 Days Return</h1>
                <p>If goods have problems</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <div>logo</div>
              <div>
                <h1>Secure Payment</h1>
                <p>100% secure payment</p>
              </div>
            </div>
            <div className='flex items-center gap-x-2'>
              <div>logo</div>
              <div>
                <h1>24/7 Support</h1>
                <p>Dedicated support</p>
              </div>
            </div>
          </div>
          <div className="banner bottom"></div>
        </div>
      </div>
    </>
  );
};

export default Banner;
