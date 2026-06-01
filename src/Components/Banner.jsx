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

import React from 'react';
import { ArrowUpRight, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Banner Images
import Bn1 from '../assets/images/Banner/bn1.webp';
import Bn2 from '../assets/images/Banner/bn2.webp';
import Bn3 from '../assets/images/Banner/bn3.webp';

const BANNER_THEME = {
  colors: {
    sectionBg: '#F7F7F5',

    black: '#0A0A0A',
    yellow: '#F7C600',

    cardBorder: 'rgba(10,10,10,0.07)',
    text: '#0A0A0A',
    mutedText: 'rgba(10,10,10,0.56)',

    white: '#FFFFFF',
    whiteMuted: 'rgba(255,255,255,0.72)',

    shadow: '0 18px 55px rgba(0,0,0,0.08)',
    hoverShadow: '0 24px 70px rgba(0,0,0,0.14)',
  },
};

const BANNERS = [
  {
    img: Bn1,
    icon: Sparkles,
    label: 'Limited Offer',
    title: 'Save up to 10%',
    desc: 'Premium accessories selected for your daily tech setup.',
    link: '/products',
  },
  {
    img: Bn2,
    icon: Zap,
    label: 'New Arrival',
    title: 'Fresh Tech Deals',
    desc: 'Modern gadgets and accessories for a cleaner lifestyle.',
    link: '/products',
  },
  {
    img: Bn3,
    icon: ShieldCheck,
    label: 'Best Choice',
    title: 'Smart Shopping',
    desc: 'Handpicked products with trusted quality and support.',
    link: '/products',
  },
];

const Banner = () => {
  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: BANNER_THEME.colors.sectionBg }}
    >
      <div className="container mx-auto px-4 py-10 lg:py-12">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.24em]"
            style={{ color: BANNER_THEME.colors.yellow }}
          >
            Featured Deals
          </p>

          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
            style={{ color: BANNER_THEME.colors.text }}
          >
            Premium picks for your setup.
          </h2>

          <p
            className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6"
            style={{ color: BANNER_THEME.colors.mutedText }}
          >
            Explore curated gadgets and accessories with a clean, premium
            shopping experience.
          </p>
        </div>

        {/* Banner Cards */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {BANNERS.map((banner) => {
            const Icon = banner.icon;

            return (
              <article
                key={banner.title}
                className="group relative h-[255px] overflow-hidden rounded-[26px] border transition duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: BANNER_THEME.colors.black,
                  borderColor: BANNER_THEME.colors.cardBorder,
                  boxShadow: BANNER_THEME.colors.shadow,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    BANNER_THEME.colors.hoverShadow;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = BANNER_THEME.colors.shadow;
                }}
              >
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <div className="mb-3 flex items-center gap-2">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-2xl"
                      style={{
                        backgroundColor: BANNER_THEME.colors.yellow,
                        color: BANNER_THEME.colors.black,
                      }}
                    >
                      <Icon size={17} strokeWidth={1.9} />
                    </span>

                    <span
                      className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                      style={{
                        backgroundColor: 'rgba(247,198,0,0.14)',
                        color: BANNER_THEME.colors.yellow,
                      }}
                    >
                      {banner.label}
                    </span>
                  </div>

                  <h3
                    className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl"
                    style={{ color: BANNER_THEME.colors.white }}
                  >
                    {banner.title}
                  </h3>

                  <p
                    className="mt-2 max-w-xs text-sm font-medium leading-6"
                    style={{ color: BANNER_THEME.colors.whiteMuted }}
                  >
                    {banner.desc}
                  </p>

                  <Link
                    to={banner.link}
                    className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
                    style={{
                      backgroundColor: BANNER_THEME.colors.yellow,
                      color: BANNER_THEME.colors.black,
                    }}
                  >
                    Shop Now
                    <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Banner;