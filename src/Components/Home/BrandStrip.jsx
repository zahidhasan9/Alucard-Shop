import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, BadgeCheck, ImageOff, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAllBrands } from '../../features/API';

const BRAND_THEME = {
  colors: {
    sectionBg: '#F7F7F5',
    wrapperBg: 'rgba(255,255,255,0.9)',
    cardBg: '#FFFFFF',
    cardBorder: 'rgba(10,10,10,0.07)',
    black: '#0A0A0A',
    yellow: '#F7C600',
    mutedText: 'rgba(10,10,10,0.55)',
  },
};

const normalizeBrands = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.brands)) return payload.brands;
  return [];
};

const getBrandLogo = (brand) => {
  return brand?.logo?.url || brand?.logo || '';
};

const BrandLogoFallback = ({ name }) => {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7C600]/18 text-lg font-black text-[#0A0A0A] ring-1 ring-[#F7C600]/25">
      {name?.charAt(0)?.toUpperCase() || <ImageOff size={22} />}
    </div>
  );
};

const BrandStrip = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    getAllBrands()
      .then((res) => {
        if (!isMounted) return;

        const brandList = normalizeBrands(res.data);

        setBrands(brandList);
      })
      .catch(() => {
        if (isMounted) {
          setBrands([]);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const displayBrands = useMemo(() => {
    return [...brands]
      .sort((a, b) => {
        const featuredA = a?.isFeatured ? 1 : 0;
        const featuredB = b?.isFeatured ? 1 : 0;

        if (featuredA !== featuredB) return featuredB - featuredA;

        return Number(a?.sortOrder || 0) - Number(b?.sortOrder || 0);
      })
      .slice(0, 8);
  }, [brands]);

  if (!loading && displayBrands.length === 0) {
    return null;
  }

  return (
    <section
      className="font-Work_sans"
      style={{ backgroundColor: BRAND_THEME.colors.sectionBg }}
    >
      <div className="mx-auto max-w-7xl px-4 py-9 lg:px-8 lg:py-11">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em]"
              style={{ color: BRAND_THEME.colors.yellow }}
            >
              <Sparkles size={15} />
              Shop by Brand
            </p>

            <h2
              className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl"
              style={{ color: BRAND_THEME.colors.black }}
            >
              Real brands from our store.
            </h2>

            <p
              className="mt-2 max-w-xl text-sm font-medium leading-6"
              style={{ color: BRAND_THEME.colors.mutedText }}
            >
              Choose a brand and explore available products directly.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-sm font-black text-white transition hover:bg-black/85"
          >
            View Products
            <ArrowRight size={17} />
          </Link>
        </div>

        <div
          className="rounded-[28px] border p-2.5"
          style={{
            backgroundColor: BRAND_THEME.colors.wrapperBg,
            borderColor: BRAND_THEME.colors.cardBorder,
            boxShadow: '0 14px 40px rgba(0,0,0,0.055)',
          }}
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
            {loading
              ? Array.from({ length: 8 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[132px] animate-pulse rounded-[22px] bg-black/5"
                  />
                ))
              : displayBrands.map((brand) => {
                  const logo = getBrandLogo(brand);
                  const productCount = Number(brand?.productCount || 0);

                  return (
                    <Link
                      key={brand?._id || brand?.slug || brand?.name}
                      to={`/brand/${brand?.slug}`}
                      className="group rounded-[22px] border bg-white p-4 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(0,0,0,0.10)]"
                      style={{ borderColor: BRAND_THEME.colors.cardBorder }}
                    >
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white ring-1 ring-black/5">
                        {logo ? (
                          <img
                            src={logo}
                            alt={brand?.name || 'Brand logo'}
                            loading="lazy"
                            className="h-12 w-12 object-contain transition duration-300 group-hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.style.display = 'none';
                              event.currentTarget
                                .closest('.brand-logo-box')
                                ?.classList.add('brand-logo-error');
                            }}
                          />
                        ) : (
                          <BrandLogoFallback name={brand?.name} />
                        )}
                      </div>

                      <p
                        className="mt-3 truncate text-sm font-black tracking-[-0.01em]"
                        style={{ color: BRAND_THEME.colors.black }}
                        title={brand?.name}
                      >
                        {brand?.name}
                      </p>

                      <div className="mt-1 flex items-center justify-center gap-1 text-[11px] font-bold text-black/45">
                        <BadgeCheck size={13} className="text-[#F7C600]" />
                        <span>
                          {productCount > 0
                            ? `${productCount} products`
                            : 'Available'}
                        </span>
                      </div>
                    </Link>
                  );
                })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStrip;