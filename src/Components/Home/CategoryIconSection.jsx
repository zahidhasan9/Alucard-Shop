// import { Link } from 'react-router-dom';
// import {
//   Shirt,
//   Smartphone,
//   Watch,
//   Headphones,
//   Baby,
//   Sparkles,
//   ShoppingBag,
//   Gift,
// } from 'lucide-react';

// const categories = [
//   { name: 'Men', icon: Shirt },
//   { name: 'Women', icon: Sparkles },
//   { name: 'Electronics', icon: Smartphone },
//   { name: 'Accessories', icon: Watch },
//   { name: 'Audio', icon: Headphones },
//   { name: 'Baby', icon: Baby },
//   { name: 'Fashion', icon: ShoppingBag },
//   { name: 'Gifts', icon: Gift },
// ];

// const CategoryIconSection = () => {
//   return (
//     <section className="bg-white py-10">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="mb-6 flex items-end justify-between gap-4">
//           <div>
//             <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//               Browse
//             </p>
//             <h2 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">
//               Shop by Category
//             </h2>
//           </div>

//           <Link
//             to="/products"
//             className="hidden rounded-full bg-black px-5 py-2 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black sm:inline-flex"
//           >
//             View All
//           </Link>
//         </div>

//         <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
//           {categories.map((item) => {
//             const Icon = item.icon;

//             return (
//               <Link
//                 key={item.name}
//                 to="/products"
//                 className="group rounded-3xl bg-yellow-50 p-5 text-center ring-1 ring-yellow-200 transition hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-lg"
//               >
//                 <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-sm transition group-hover:bg-black group-hover:text-yellow-400">
//                   <Icon size={26} />
//                 </div>

//                 <p className="mt-3 text-sm font-black text-gray-950">
//                   {item.name}
//                 </p>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CategoryIconSection;






import { Link } from 'react-router-dom';
import {
  Shirt,
  Smartphone,
  Watch,
  Headphones,
  Baby,
  Sparkles,
  ShoppingBag,
  Gift,
  ArrowUpRight,
} from 'lucide-react';

const CATEGORY_THEME = {
  colors: {
    sectionBg: '#F7F7F5',
    cardBg: 'rgba(255,255,255,0.88)',
    cardBorder: 'rgba(10,10,10,0.07)',

    black: '#0A0A0A',
    yellow: '#F7C600',

    text: '#0A0A0A',
    mutedText: 'rgba(10,10,10,0.55)',

    shadow: '0 14px 40px rgba(0,0,0,0.055)',
    hoverShadow: '0 18px 50px rgba(0,0,0,0.10)',
  },
};

const categories = [
  { name: 'Men', icon: Shirt },
  { name: 'Women', icon: Sparkles },
  { name: 'Electronics', icon: Smartphone },
  { name: 'Accessories', icon: Watch },
  { name: 'Audio', icon: Headphones },
  { name: 'Baby', icon: Baby },
  { name: 'Fashion', icon: ShoppingBag },
  { name: 'Gifts', icon: Gift },
];

const CategoryIconSection = () => {
  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: CATEGORY_THEME.colors.sectionBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.22em]"
              style={{ color: CATEGORY_THEME.colors.yellow }}
            >
              Browse
            </p>

            <h2
              className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
              style={{ color: CATEGORY_THEME.colors.text }}
            >
              Shop by Category
            </h2>

            <p
              className="mt-2 max-w-xl text-sm font-medium leading-6"
              style={{ color: CATEGORY_THEME.colors.mutedText }}
            >
              Explore products faster through clean, curated shopping categories.
            </p>
          </div>

          <Link
            to="/products"
            className="hidden items-center gap-2 rounded-full bg-yellow-400 px-5 py-2.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:inline-flex"
            // style={{
            //   backgroundColor: CATEGORY_THEME.colors.black,
            //   color: CATEGORY_THEME.colors.yellow,
            // }}
          >
            View All
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Category Box */}
        <div
          className="rounded-[28px] border p-2.5 backdrop-blur-xl"
          style={{
            backgroundColor: CATEGORY_THEME.colors.cardBg,
            borderColor: CATEGORY_THEME.colors.cardBorder,
            boxShadow: CATEGORY_THEME.colors.shadow,
          }}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
            {categories.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  to="/products"
                  className="group rounded-[22px] border px-3 py-4 text-center transition duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.72)',
                    borderColor: CATEGORY_THEME.colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      CATEGORY_THEME.colors.hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: CATEGORY_THEME.colors.yellow,
                      color: CATEGORY_THEME.colors.black,
                    }}
                  >
                    <Icon size={21} strokeWidth={1.85} />
                  </div>

                  <p
                    className="mt-3 text-sm font-semibold tracking-[-0.01em]"
                    style={{ color: CATEGORY_THEME.colors.text }}
                  >
                    {item.name}
                  </p>

                  <p
                    className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: CATEGORY_THEME.colors.mutedText }}
                  >
                    Explore
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Button */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition duration-300 hover:-translate-y-0.5"
            style={{
              backgroundColor: CATEGORY_THEME.colors.black,
              color: CATEGORY_THEME.colors.yellow,
            }}
          >
            View All Categories
            <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryIconSection;