// import { CreditCard, Headphones, RotateCcw, Truck } from 'lucide-react';

// const items = [
//   {
//     title: 'Fast Delivery',
//     text: 'Quick delivery across Bangladesh',
//     icon: Truck,
//   },
//   {
//     title: 'Secure Payment',
//     text: 'Safe checkout and trusted payment',
//     icon: CreditCard,
//   },
//   {
//     title: 'Easy Return',
//     text: 'Simple return and replacement policy',
//     icon: RotateCcw,
//   },
//   {
//     title: 'Support',
//     text: 'Friendly customer support',
//     icon: Headphones,
//   },
// ];

// const TrustBadges = () => {
//   return (
//     <section className="bg-gray-100 py-10">
//       <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
//         {items.map((item) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={item.title}
//               className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5"
//             >
//               <div className="flex items-center gap-4">
//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//                   <Icon size={26} />
//                 </div>

//                 <div>
//                   <h3 className="font-black text-gray-950">{item.title}</h3>
//                   <p className="mt-1 text-sm font-medium text-gray-500">
//                     {item.text}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// };

// export default TrustBadges;


import { CreditCard, Headphones, RotateCcw, Truck } from 'lucide-react';

const TRUST_THEME = {
  colors: {
    sectionBg: '#F7F7F5',
    wrapperBg: 'rgba(255,255,255,0.86)',
    cardBg: 'rgba(255,255,255,0.72)',
    cardBorder: 'rgba(10,10,10,0.07)',

    black: '#0A0A0A',
    yellow: '#F7C600',

    text: '#0A0A0A',
    mutedText: 'rgba(10,10,10,0.55)',

    shadow: '0 14px 40px rgba(0,0,0,0.055)',
    hoverShadow: '0 18px 50px rgba(0,0,0,0.10)',
  },
};

const items = [
  {
    title: 'Fast Delivery',
    text: 'Quick delivery across Bangladesh',
    icon: Truck,
  },
  {
    title: 'Secure Payment',
    text: 'Safe checkout and trusted payment',
    icon: CreditCard,
  },
  {
    title: 'Easy Return',
    text: 'Simple return and replacement policy',
    icon: RotateCcw,
  },
  {
    title: 'Support',
    text: 'Friendly customer support',
    icon: Headphones,
  },
];

const TrustBadges = () => {
  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: TRUST_THEME.colors.sectionBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-9 lg:px-8 lg:py-11">
        <div
          className="rounded-[28px] border p-2.5 backdrop-blur-xl"
          style={{
            backgroundColor: TRUST_THEME.colors.wrapperBg,
            borderColor: TRUST_THEME.colors.cardBorder,
            boxShadow: TRUST_THEME.colors.shadow,
          }}
        >
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`group flex items-center gap-4 rounded-[22px] border px-4 py-4 transition duration-300 hover:-translate-y-0.5 ${
                    index !== items.length - 1 ? 'lg:border-r-0' : ''
                  }`}
                  style={{
                    backgroundColor: TRUST_THEME.colors.cardBg,
                    borderColor: TRUST_THEME.colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      TRUST_THEME.colors.hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: TRUST_THEME.colors.yellow,
                      color: TRUST_THEME.colors.black,
                    }}
                  >
                    <Icon size={21} strokeWidth={1.85} />
                  </div>

                  <div className="min-w-0">
                    <h3
                      className="text-[15px] font-semibold tracking-[-0.02em]"
                      style={{ color: TRUST_THEME.colors.text }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-1 text-sm font-medium leading-5"
                      style={{ color: TRUST_THEME.colors.mutedText }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;