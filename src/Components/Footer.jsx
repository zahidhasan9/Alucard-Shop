// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Github, Facebook, Twitter, ShoppingCart } from 'lucide-react';
// import CartSidebar from './CertSidebar';

// const Footer = () => {
//   const quickLinks = [
//     { name: 'Home', href: '#' },
//     { name: 'Shop', href: '#' },
//     { name: 'About Us', href: '#' },
//     { name: 'Contact', href: '#' }
//   ];

//   const supportLinks = [
//     { name: 'FAQ', href: '#' },
//     { name: 'Documentation', href: '#' },
//     { name: 'Support Center', href: '#' },
//     { name: 'Terms & Conditions', href: '#' }
//   ];

//   const socialLinks = [
//     { href: '#', icon: <Github className="w-5 h-5" /> },
//     { href: '#', icon: <Facebook className="w-5 h-5" /> },
//     { href: '#', icon: <Twitter className="w-5 h-5" /> }
//   ];

//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const { cartItems } = useSelector((state) => state.cart);
//   const totalItem = cartItems?.items?.length || 0;

//   return (
//     <footer className="bg-yellow-500 text-white py-12 relative">
//       <div className="p-6 ">
//         <button
//           className="fixed top-96 right-1 bg-yellow-400 p-2 rounded-full shadow z-50 "
//           onClick={() => setIsCartOpen(true)}
//         >
//           <div className="relative inline-block">
//             <ShoppingCart className="h-6 w-6 text-black" />
//             <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
//               {totalItem}
//             </span>
//           </div>
//         </button>

//         <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//       </div>
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//           {/* Company Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">
//               <span className="text-black">ZOTAC </span>
//               <span>FURY</span>
//             </h3>
//             <p className="text- text-sm">Developd by Vite js and Tailwion Css.</p>
//             <p className="text- text-sm mt-2">© 2025 Jahid Hasan Rimel. All Rights Reserved.</p>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2 text-sm">
//               {quickLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className=" hover:text-white transition">
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Support */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Support</h3>
//             <ul className="space-y-2 text-sm">
//               {supportLinks.map((link, index) => (
//                 <li key={index}>
//                   <a href={link.href} className=" hover:text-white transition">
//                     {link.name}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
//             <ul className="space-y-2 text-sm">
//               <li>Email: support@gmail.com</li>
//               <li>Phone: +880 (172) 8817812</li>
//               <li>Address: Sylhet, Bangladesh</li>
//             </ul>
//             <div className="flex space-x-4 mt-4">
//               {socialLinks.map((link, index) => (
//                 <a key={index} href={link.href} className=" hover:text-white transition">
//                   {link.icon}
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Link } from 'react-router-dom';
import {
  Facebook,
  Github,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
} from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Cart', href: '/cart' },
    { name: 'Account', href: '/dashboard' },
  ];

  const supportLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Return Policy', href: '/return-policy' },
  ];

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                <ShoppingBag size={23} />
              </span>

              <span className="text-2xl font-black">
                ALUCARD
                <span className="ml-1 text-yellow-400">SHOP</span>
              </span>
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
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-yellow-400">Quick Links</h3>

            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
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

          <div>
            <h3 className="text-lg font-black text-yellow-400">Support</h3>

            <ul className="mt-4 space-y-3">
              {supportLinks.map((link) => (
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

          <div>
            <h3 className="text-lg font-black text-yellow-400">Contact</h3>

            <ul className="mt-4 space-y-4 text-sm font-semibold text-gray-400">
              <li className="flex gap-3">
                <Mail size={18} className="shrink-0 text-yellow-400" />
                support@alucardshop.com
              </li>

              <li className="flex gap-3">
                <Phone size={18} className="shrink-0 text-yellow-400" />
                +880 1728 817812
              </li>

              <li className="flex gap-3">
                <MapPin size={18} className="shrink-0 text-yellow-400" />
                Sylhet, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-sm font-semibold text-gray-500">
          © 2026 Alucard Shop. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;