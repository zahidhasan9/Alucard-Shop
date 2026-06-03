import { Link } from 'react-router-dom';
import {
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  ShoppingBag,
  Truck,
  RotateCcw,
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Cart', href: '/cart' },
    { name: 'Compare', href: '/compare' },
    { name: 'Wishlist', href: '/wishlist' },
    { name: 'Account', href: '/dashboard' },
    
  ];

  const supportLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
  ];

  return (
    <footer className="bg-gray-950 pb-20 text-white lg:pb-0">
      <div className="border-b border-white/10 bg-gray-900">
        <div className="container mx-auto grid gap-3 px-4 py-5 sm:grid-cols-3">
          <MiniFeature
            icon={<Truck size={22} />}
            title="Fast Delivery"
            desc="Quick delivery support"
          />
          <MiniFeature
            icon={<ShieldCheck size={22} />}
            title="Secure Shopping"
            desc="Protected checkout"
          />
          <MiniFeature
            icon={<RotateCcw size={22} />}
            title="Easy Return"
            desc="Simple return policy"
          />
        </div>
      </div>

      <div className="container mx-auto grid gap-8 px-4 py-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-yellow-400 text-gray-950">
              <ShoppingBag size={26} />
            </span>
            <div>
              <h2 className="text-2xl font-black text-yellow-400">
                ALUCARD SHOP
              </h2>
              <p className="text-xs font-bold tracking-[0.25em] text-gray-400">
                ONLINE STORE
              </p>
            </div>
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
            A modern eCommerce shopping experience with clean design, fast
            browsing and trusted customer support.
          </p>

          <div className="mt-5 flex gap-3">
            {[Facebook, Instagram, Github].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-gray-300 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <FooterColumn title="Quick Links" links={quickLinks} />
        <FooterColumn title="Support" links={supportLinks} />

        <div>
          <h3 className="text-lg font-black text-white">Contact</h3>

          <ul className="mt-4 space-y-3 text-sm text-gray-400">
            <ContactItem icon={<Mail size={17} />} text="support@alucardshop.com" />
            <ContactItem icon={<Phone size={17} />} text="+880 1728 817812" />
            <ContactItem icon={<MapPin size={17} />} text="Sylhet, Bangladesh" />
          </ul>

          <div className="mt-5 rounded-2xl bg-white/5 p-4">
            <p className="text-sm font-bold text-yellow-400">
              Need help with an order?
            </p>
            <Link
              to="/contact"
              className="mt-3 inline-flex rounded-full bg-yellow-400 px-5 py-2 text-sm font-black text-gray-950 hover:bg-yellow-500"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-gray-500">
        © 2026 Alucard Shop. All Rights Reserved.
      </div>
    </footer>
  );
};

const MiniFeature = ({ icon, title, desc }) => (
  <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-4">
    <div className="grid h-11 w-11 place-items-center rounded-full bg-yellow-400 text-gray-950">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-black text-white">{title}</h3>
      <p className="text-xs text-gray-400">{desc}</p>
    </div>
  </div>
);

const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="text-lg font-black text-white">{title}</h3>
    <ul className="mt-4 space-y-3">
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.href}
            className="text-sm font-semibold text-gray-400 transition hover:text-yellow-400"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const ContactItem = ({ icon, text }) => (
  <li className="flex items-center gap-3">
    <span className="text-yellow-400">{icon}</span>
    <span>{text}</span>
  </li>
);

export default Footer;