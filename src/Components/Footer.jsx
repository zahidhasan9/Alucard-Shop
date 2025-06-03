import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Github, Facebook, Twitter, ShoppingCart } from 'lucide-react';
import CartSidebar from './CertSidebar';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'Shop', href: '#' },
    { name: 'About Us', href: '#' },
    { name: 'Contact', href: '#' }
  ];

  const supportLinks = [
    { name: 'FAQ', href: '#' },
    { name: 'Documentation', href: '#' },
    { name: 'Support Center', href: '#' },
    { name: 'Terms & Conditions', href: '#' }
  ];

  const socialLinks = [
    { href: '#', icon: <Github className="w-5 h-5" /> },
    { href: '#', icon: <Facebook className="w-5 h-5" /> },
    { href: '#', icon: <Twitter className="w-5 h-5" /> }
  ];

  const [isCartOpen, setIsCartOpen] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const totalItem = cartItems?.items?.length || 0;

  return (
    <footer className="bg-yellow-500 text-white py-12 relative">
      <div className="p-6 ">
        <button
          className="fixed top-96 right-1 bg-yellow-400 p-2 rounded-full shadow z-50 "
          onClick={() => setIsCartOpen(true)}
        >
          <div className="relative inline-block">
            <ShoppingCart className="h-6 w-6 text-black" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
              {totalItem}
            </span>
          </div>
        </button>

        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              <span className="text-black">ZOTAC </span>
              <span>FURY</span>
            </h3>
            <p className="text- text-sm">Developd by Vite js and Tailwion Css.</p>
            <p className="text- text-sm mt-2">© 2025 Jahid Hasan Rimel. All Rights Reserved.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className=" hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className=" hover:text-white transition">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: support@gmail.com</li>
              <li>Phone: +880 (172) 8817812</li>
              <li>Address: Sylhet, Bangladesh</li>
            </ul>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((link, index) => (
                <a key={index} href={link.href} className=" hover:text-white transition">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
