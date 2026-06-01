// const brands = ['ALUCARD', 'ZOTAC', 'FURY', 'PREMIUM', 'URBAN', 'NEXTGEN'];

// const BrandStrip = () => {
//   return (
//     <section className="bg-black py-8">
//       <div className="mx-auto max-w-7xl px-4 lg:px-8">
//         <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
//           {brands.map((brand) => (
//             <div
//               key={brand}
//               className="rounded-2xl border border-yellow-400/30 px-4 py-4 text-center text-sm font-black tracking-[0.18em] text-yellow-400"
//             >
//               {brand}
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BrandStrip;


import {
  Cpu,
  Zap,
  Crown,
  Gem,
  Building2,
  Sparkles,
} from 'lucide-react';

const BRAND_THEME = {
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

const brands = [
  {
    name: 'ALUCARD',
    icon: Crown,
  },
  {
    name: 'ZOTAC',
    icon: Cpu,
  },
  {
    name: 'FURY',
    icon: Zap,
  },
  {
    name: 'PREMIUM',
    icon: Gem,
  },
  {
    name: 'URBAN',
    icon: Building2,
  },
  {
    name: 'NEXTGEN',
    icon: Sparkles,
  },
];

const BrandStrip = () => {
  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: BRAND_THEME.colors.sectionBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-12">
        {/* Header */}
        <div className="mb-7 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-[0.22em]"
            style={{ color: BRAND_THEME.colors.yellow }}
          >
            Trusted Brands
          </p>

          <h2
            className="mt-2 text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"
            style={{ color: BRAND_THEME.colors.text }}
          >
            Premium names. Smart choices.
          </h2>

          <p
            className="mx-auto mt-2 max-w-xl text-sm font-medium leading-6"
            style={{ color: BRAND_THEME.colors.mutedText }}
          >
            Explore selected brands and product lines for a cleaner tech
            shopping experience.
          </p>
        </div>

        {/* Brand Box */}
        <div
          className="rounded-[28px] border p-2.5 backdrop-blur-xl"
          style={{
            backgroundColor: BRAND_THEME.colors.wrapperBg,
            borderColor: BRAND_THEME.colors.cardBorder,
            boxShadow: BRAND_THEME.colors.shadow,
          }}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
            {brands.map((brand) => {
              const Icon = brand.icon;

              return (
                <div
                  key={brand.name}
                  className="group rounded-[22px] border px-3 py-4 text-center transition duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: BRAND_THEME.colors.cardBg,
                    borderColor: BRAND_THEME.colors.cardBorder,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      BRAND_THEME.colors.hoverShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div
                    className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl transition duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: BRAND_THEME.colors.yellow,
                      color: BRAND_THEME.colors.black,
                    }}
                  >
                    <Icon size={21} strokeWidth={1.85} />
                  </div>

                  <p
                    className="mt-3 text-sm font-semibold tracking-[0.12em]"
                    style={{ color: BRAND_THEME.colors.text }}
                  >
                    {brand.name}
                  </p>

                  <p
                    className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em]"
                    style={{ color: BRAND_THEME.colors.mutedText }}
                  >
                    Official Pick
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;