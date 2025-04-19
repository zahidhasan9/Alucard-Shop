import React from 'react';
import { Github, Facebook, Twitter } from 'lucide-react';

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

  return (
    <footer className="bg-yellow-500 text-white py-12">
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
