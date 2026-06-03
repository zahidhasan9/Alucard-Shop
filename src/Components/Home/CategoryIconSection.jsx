import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

import { getAllCategories } from '../../features/API';
import { getCategoryIcon } from '../../utils/categoryIcons';

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

const normalizeCategoryList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.categories)) return payload.categories;
  if (Array.isArray(payload?.data)) return payload.data;
  return [];
};

const CategoryIconSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await getAllCategories();
      const categoryList = normalizeCategoryList(response.data);

      setCategories(categoryList.filter((item) => item?.isActive !== false));
    } catch (error) {
      console.error('Category fetch error:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
          {loading ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[118px] animate-pulse rounded-[22px] bg-white/70"
                />
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
              {categories.map((item) => {
                const Icon = getCategoryIcon(item);
                const categorySlug = item?.slug || item?._id;

                return (
                  <Link
                    key={item._id || item.slug || item.name}
                    to={`/category/${categorySlug}`}
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
          ) : (
            <div className="rounded-[22px] bg-white/70 px-4 py-8 text-center">
              <p
                className="text-sm font-semibold"
                style={{ color: CATEGORY_THEME.colors.text }}
              >
                No categories found
              </p>

              <p
                className="mt-1 text-xs font-medium"
                style={{ color: CATEGORY_THEME.colors.mutedText }}
              >
                Please add active categories from admin panel.
              </p>
            </div>
          )}
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