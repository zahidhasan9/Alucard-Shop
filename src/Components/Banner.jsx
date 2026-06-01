// import React from 'react';
// import { Rocket,RefreshCcw,ShieldCheck,MessageSquareText } from 'lucide-react';

// // import Banner IMG 
// import Bn1 from "../assets/images/Banner/bn1.webp"
// import Bn2 from "../assets/images/Banner/bn2.webp"
// import Bn3 from "../assets/images/Banner/bn3.webp"

// const Bnr=[
//   {
//     img:Bn1,
//     title:"10% off"
//   },
//   {
//     img:Bn2,
//     title:"10% off"
//   },
//   {
//     img:Bn3,
//     title:"10% off"
//   },
//   {
//     img:Bn1,
//     title:"10% off"
//   },
// ]
// const Banner = () => {
//   return (
//     <>
//     {/* container */}
//       <div className="container  ">
//         <div className="  py-16  ">
//           <div className="flex flex-col md:flex-row md:justify-evenly items-center w-full font-Work_sans  ">
//             <div className="lg:flex gap-x-4">
//               <div className="flex items-center  gap-x-4 p-3 border-gray-400 lg:border-r-[0.5px]">
//                 <div><Rocket className='mt-2' color='#fcb800' size={'50px'}/></div>
//                 <div>
//                   <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>Free Delivery</h1>
//                   <p className=' text-gray-600 text-sm font-light tracking-wide'>For all oders over $99</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-x-4 p-3 border-gray-400 lg:border-r-[0.5px] ">
//                 <div><RefreshCcw className='mt-2 size-[50px]' color='#fcb800'  /></div>
//                 <div>
//                   <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>90 Days Return</h1>
//                   <p className=' text-gray-600 text-sm font-light tracking-wide'>If goods have problems</p>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:flex gap-x-4">
//               <div className="flex items-center gap-x-4 p-3  border-gray-400 lg:border-r-[0.5px]">
//                 <div><ShieldCheck className='mt-2' color='#fcb800' size={'50px'}/></div>
//                 <div>
//                   <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>Secure Payment</h1>
//                   <p className=' text-gray-700 text-sm font-light tracking-wide'>100% secure payment</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-x-4 p-3 ">
//                 <div><MessageSquareText className='mt-2' color='#fcb800' size={'50px'}/></div>
//                 <div>
//                   <h1 className=' text-[18px] font-medium  tracking-wide py-1.5'>24/7 Support</h1>
//                   <p className=' text-gray-700 text-sm font-light tracking-wide'>Dedicated support</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//           {/* Bottom Banner section */}
//           <div className="banner bottom py-16">
//             <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-4'>
//               { Bnr.map((data,idx) =>
//                   <div className='col-span-3 md:col-span-2 lg:col-span-1 gap-3' key={idx}>
//                     <div className='flex justify-center h-48 border-[#fcb800] border-[1px] rounded-lg shadow-sm overflow-hidden '>
//                      <img src={data.img} alt={data.title} className='w-full h-full object-cover rounded' />
//                     </div>
//                   </div>  
//                   )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Banner;

import { memo } from 'react';
import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

import Bn1 from '../assets/images/Banner/bn1.webp';
import Bn2 from '../assets/images/Banner/bn2.webp';
import Bn3 from '../assets/images/Banner/bn3.webp';

const BANNERS = [
  {
    img: Bn1,
    icon: Sparkles,
    label: 'Limited Offer',
    title: 'Save up to 10%',
    desc: 'Premium accessories for your daily tech setup.',
    link: '/products',
  },
  {
    img: Bn2,
    icon: Zap,
    label: 'New Arrival',
    title: 'Fresh Tech Deals',
    desc: 'Modern gadgets with a clean shopping experience.',
    link: '/products',
  },
  {
    img: Bn3,
    icon: ShieldCheck,
    label: 'Best Choice',
    title: 'Smart Shopping',
    desc: 'Trusted products with quality support.',
    link: '/products',
  },
];

const Banner = () => {
  return (
    <section className="bg-[#f5f5f7] font-Work_sans">
      <div className="mx-auto max-w-7xl px-4 py-8 lg:px-8 lg:py-10">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#F7C600]">
              Featured Deals
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-black sm:text-3xl">
              Premium picks for you.
            </h2>

            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-black/55">
              Explore selected gadgets and accessories with a clean, modern
              shopping experience.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 rounded-full bg-[#F7C600] px-5 py-2.5 text-sm font-black text-black transition-colors hover:bg-yellow-300 sm:inline-flex"
          >
            View All
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {BANNERS.map((banner, index) => {
            const Icon = banner.icon;

            return (
              <Link
                key={banner.title}
                to={banner.link}
                className="group relative flex min-h-[210px] overflow-hidden rounded-[26px] border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:border-black/15 hover:shadow-md"
                aria-label={`Shop ${banner.title}`}
              >
                {/* Image */}
                <div className="absolute inset-y-0 right-0 w-[58%] overflow-hidden">
                  <img
                    src={banner.img}
                    alt={banner.title}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>

                {/* Soft overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/20" />

                {/* Content */}
                <div className="relative z-10 flex w-[72%] flex-col justify-between p-5">
                  <div>
                    <div className="mb-4 flex items-center gap-2">
                      <span className="grid h-9 w-9 place-items-center rounded-2xl bg-[#F7C600] text-black">
                        <Icon size={17} strokeWidth={1.9} />
                      </span>

                      <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-black/55">
                        {banner.label}
                      </span>
                    </div>

                    <h3 className="max-w-[230px] text-2xl font-semibold leading-tight tracking-[-0.045em] text-black">
                      {banner.title}
                    </h3>

                    <p className="mt-2 max-w-[230px] text-sm font-medium leading-6 text-black/55">
                      {banner.desc}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full bg-[#F7C600] px-4 py-2.5 text-sm font-black text-black transition-colors group-hover:bg-yellow-300">
                    Shop Now
                    <ArrowUpRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Button */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
          >
            View All Deals
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default memo(Banner);