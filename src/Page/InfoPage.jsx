import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Headphones,
  LockKeyhole,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Store,
  Truck,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const pageContent = {
  about: {
    title: 'About Alucard Shop',
    badge: 'Trusted Online Store',
    subtitle:
      'Simple shopping, clear product details and reliable customer support.',
    icon: Store,
    ctaLabel: 'Shop Now',
    ctaPath: '/products',
    highlights: [
      { icon: ShoppingBag, title: 'Quality Products', text: 'Carefully selected items.' },
      { icon: Truck, title: 'Fast Delivery', text: 'Quick and safe order handling.' },
      { icon: Headphones, title: 'Support', text: 'Help before and after purchase.' },
    ],
    sections: [
      {
        heading: 'Who We Are',
        points: [
          'A modern eCommerce store for everyday shopping.',
          'Focused on simple browsing and smooth checkout.',
          'Built with customer trust and convenience in mind.',
        ],
      },
      {
        heading: 'What We Offer',
        points: [
          'Clear product information.',
          'Organized product categories.',
          'Easy order and support experience.',
        ],
      },
    ],
  },

  contact: {
    title: 'Contact Us',
    badge: 'Customer Support',
    subtitle:
      'Have a question about your order, product or return? Contact us directly.',
    icon: Phone,
    ctaLabel: 'Browse Products',
    ctaPath: '/products',
    highlights: [
      {
        icon: Mail,
        title: 'Email',
        text: 'support@alucardshop.com',
        href: 'mailto:support@alucardshop.com',
      },
      {
        icon: Phone,
        title: 'Phone',
        text: '+880 1728 817812',
        href: 'tel:+8801728817812',
      },
      {
        icon: MapPin,
        title: 'Address',
        text: 'Sylhet, Bangladesh',
      },
    ],
    sections: [
      {
        heading: 'Before Contacting',
        points: [
          'Keep your order ID ready.',
          'Mention your product name.',
          'Explain the issue shortly.',
        ],
      },
      {
        heading: 'Support Topics',
        points: [
          'Order status and delivery update.',
          'Product information.',
          'Return or replacement request.',
        ],
      },
    ],
  },

  privacy: {
    title: 'Privacy Policy',
    badge: 'Safe & Secure',
    subtitle:
      'We use your information only to process orders and improve support.',
    icon: ShieldCheck,
    ctaLabel: 'Continue Shopping',
    ctaPath: '/products',
    highlights: [
      { icon: LockKeyhole, title: 'Protected Data', text: 'Handled carefully.' },
      { icon: ShieldCheck, title: 'No Selling', text: 'We do not sell customer data.' },
      { icon: CheckCircle2, title: 'Limited Use', text: 'Used for order support only.' },
    ],
    sections: [
      {
        heading: 'Information We Collect',
        points: [
          'Name, email and phone number.',
          'Delivery address.',
          'Order and payment status details.',
        ],
      },
      {
        heading: 'How We Use It',
        points: [
          'To process your order.',
          'To provide delivery updates.',
          'To help with customer support.',
        ],
      },
    ],
  },

  return: {
    title: 'Return Policy',
    badge: 'Easy Return Support',
    subtitle:
      'Return or replacement support is available for damaged, incorrect or defective items.',
    icon: RotateCcw,
    ctaLabel: 'Shop Confidently',
    ctaPath: '/products',
    highlights: [
      { icon: Clock3, title: 'Return Window', text: 'Apply within eligible time.' },
      { icon: PackageCheck, title: 'Condition', text: 'Unused with packaging.' },
      { icon: Headphones, title: 'Review', text: 'Support team will guide you.' },
    ],
    sections: [
      {
        heading: 'Eligible Cases',
        points: [
          'Damaged product.',
          'Wrong item delivered.',
          'Defective product.',
        ],
      },
      {
        heading: 'Required Details',
        points: [
          'Order ID.',
          'Product name.',
          'Clear issue details or photos.',
        ],
      },
    ],
  },
};

const InfoPage = ({ type = 'about' }) => {
  const data = pageContent[type] || pageContent.about;
  const Icon = data.icon;

  usePageTitle(`${data.title} | Alucard Shop`, data.subtitle);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-8 font-Work_sans text-[#0A0A0A] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Compact Hero */}
        <section className="overflow-hidden rounded-[28px] bg-white shadow-sm ring-1 ring-black/5">
          <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#F7C600]/15 px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#111111]">
                <Icon size={15} />
                {data.badge}
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-black leading-tight tracking-[-0.04em] text-[#0A0A0A] sm:text-4xl lg:text-5xl">
                {data.title}
              </h1>

              <p className="mt-4 max-w-xl text-sm font-medium leading-7 text-black/55 sm:text-base">
                {data.subtitle}
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to={data.ctaPath}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-sm font-black text-white transition hover:bg-black/85"
                >
                  {data.ctaLabel}
                  <ArrowRight size={17} />
                </Link>

                {type !== 'contact' && (
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-[#F7C600] px-6 py-3 text-sm font-black text-[#0A0A0A] transition hover:bg-[#ffd83d]"
                  >
                    Contact Support
                  </Link>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center bg-[#0A0A0A] p-8 text-white">
              <div className="w-full max-w-sm rounded-[26px] border border-white/10 bg-white/[0.06] p-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7C600] text-[#0A0A0A]">
                  <Icon size={30} />
                </div>

                <p className="mt-5 text-lg font-black leading-snug">
                  Fast, simple and customer-friendly shopping.
                </p>

                <p className="mt-2 text-sm font-medium leading-6 text-white/60">
                  Designed to help customers find information quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Cards */}
        <section className="mt-5 grid gap-4 md:grid-cols-3">
          {data.highlights.map((item) => {
            const HighlightIcon = item.icon;

            const card = (
              <div className="h-full rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F7C600]/20 text-[#0A0A0A]">
                    <HighlightIcon size={22} />
                  </div>

                  <div>
                    <h2 className="text-base font-black text-[#0A0A0A]">
                      {item.title}
                    </h2>
                    <p className="mt-1 text-sm font-medium text-black/50">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            );

            return item.href ? (
              <a key={item.title} href={item.href}>
                {card}
              </a>
            ) : (
              <div key={item.title}>{card}</div>
            );
          })}
        </section>

        {/* Main Info */}
        <section className="mt-5 grid gap-4 lg:grid-cols-2">
          {data.sections.map((section) => (
            <article
              key={section.heading}
              className="rounded-[26px] bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-xl font-black tracking-[-0.02em] text-[#0A0A0A]">
                {section.heading}
              </h2>

              <ul className="mt-5 space-y-3">
                {section.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 shrink-0 text-[#F7C600]"
                    />
                    <span className="text-sm font-medium leading-6 text-black/60">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        {/* Contact Action Box */}
        {type === 'contact' && (
          <section className="mt-5 grid overflow-hidden rounded-[26px] bg-white shadow-sm ring-1 ring-black/5 md:grid-cols-3">
            <a
              href="mailto:support@alucardshop.com"
              className="border-b border-black/5 p-5 transition hover:bg-[#F7C600]/10 md:border-b-0 md:border-r"
            >
              <Mail size={23} />
              <p className="mt-3 text-sm font-black">Email Support</p>
              <p className="mt-1 text-sm font-medium text-black/50">
                support@alucardshop.com
              </p>
            </a>

            <a
              href="tel:+8801728817812"
              className="border-b border-black/5 p-5 transition hover:bg-[#F7C600]/10 md:border-b-0 md:border-r"
            >
              <Phone size={23} />
              <p className="mt-3 text-sm font-black">Call Us</p>
              <p className="mt-1 text-sm font-medium text-black/50">
                +880 1728 817812
              </p>
            </a>

            <div className="p-5 transition hover:bg-[#F7C600]/10">
              <MapPin size={23} />
              <p className="mt-3 text-sm font-black">Location</p>
              <p className="mt-1 text-sm font-medium text-black/50">
                Sylhet, Bangladesh
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default InfoPage;