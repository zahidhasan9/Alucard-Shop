import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

import SliderImg from '../assets/images/Carousel/slider-1.jpg';
import SliderImg2 from '../assets/images/Carousel/slider-2.jpg';
import SliderImg3 from '../assets/images/Carousel/slider-3.jpg';

const HERO_THEME = {
  brand: 'Alucard Shop',
  colors: {
    yellow: '#F7C600',
    black: '#0A0A0A',
    white: '#FFFFFF',
    mutedWhite: 'rgba(255,255,255,0.72)',
    glass: 'rgba(255,255,255,0.12)',
    glassBorder: 'rgba(255,255,255,0.18)',
  },
};

const slides = [
  {
    image: SliderImg,
    label: 'Smart Collection',
    title: 'Smartphones & Tablets',
    subtitle: 'Latest gadgets, clean design, and trusted deals for everyday use.',
  },
  {
    image: SliderImg2,
    label: 'Premium Accessories',
    title: 'Electronics & Accessories',
    subtitle: 'Upgrade your setup with modern accessories and essential tech.',
  },
  {
    image: SliderImg3,
    label: 'New Arrival',
    title: 'Fresh Tech Products',
    subtitle: 'Discover new products selected for smart shoppers.',
  },
];

const Carousel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goNext = () => {
    setActive((prev) => (prev + 1) % slides.length);
  };

  const goPrev = () => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section
      className="relative overflow-hidden font-Work_sans"
      style={{ backgroundColor: HERO_THEME.colors.black }}
    >
      <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[580px]">
        {slides.map((slide, index) => {
          const isActive = active === index;

          return (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                isActive ? 'z-10 opacity-100' : 'z-0 opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.title}
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/15" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/15" />
            </div>
          );
        })}

        <div className="relative z-20 mx-auto flex min-h-[420px] max-w-7xl items-center px-4 py-12 sm:min-h-[500px] lg:min-h-[580px] lg:px-8">
          <div className="max-w-2xl">
            <div
              className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-[0.18em]"
              style={{
                backgroundColor: HERO_THEME.colors.glass,
                borderColor: HERO_THEME.colors.glassBorder,
                color: HERO_THEME.colors.yellow,
              }}
            >
              <Sparkles size={14} />
              {slides[active].label}
            </div>

            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.32em]"
              style={{ color: HERO_THEME.colors.mutedWhite }}
            >
              {HERO_THEME.brand}
            </p>

            <h1
              className="max-w-2xl text-[40px] font-semibold leading-[1.04] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
              style={{ color: HERO_THEME.colors.white }}
            >
              {slides[active].title}
            </h1>

            <p
              className="mt-5 max-w-xl text-base font-medium leading-7 sm:text-lg"
              style={{ color: HERO_THEME.colors.mutedWhite }}
            >
              {slides[active].subtitle}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-black transition-colors hover:bg-yellow-300"
              >
                Shop Now
                <ArrowUpRight size={17} />
              </Link>

              <Link
                to="/compare"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Compare Products
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 right-4 z-30 flex items-center gap-2 lg:right-8">
          <button
            type="button"
            onClick={goPrev}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#F7C600] hover:text-black"
            aria-label="Previous slide"
          >
            <ChevronLeft size={19} />
          </button>

          <button
            type="button"
            onClick={goNext}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-[#F7C600] hover:text-black"
            aria-label="Next slide"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="absolute bottom-7 left-4 z-30 flex items-center gap-2 lg:left-8">
          {slides.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActive(index)}
              className="h-1.5 rounded-full transition-[width,background-color] duration-200"
              style={{
                width: active === index ? '34px' : '8px',
                backgroundColor:
                  active === index
                    ? HERO_THEME.colors.yellow
                    : 'rgba(255,255,255,0.45)',
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;