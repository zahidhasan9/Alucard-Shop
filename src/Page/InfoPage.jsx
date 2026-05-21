import { Mail, MapPin, Phone, RotateCcw, ShieldCheck, Store } from 'lucide-react';
import usePageTitle from '../hooks/usePageTitle';

const content = {
  about: {
    title: 'About Us',
    subtitle: 'We build a fast, trusted and modern online shopping experience.',
    icon: Store,
    sections: [
      {
        heading: 'Who We Are',
        text: 'Alucard Shop is focused on delivering quality products with a smooth browsing and checkout experience.',
      },
      {
        heading: 'Our Promise',
        text: 'We care about clear pricing, simple product information, fast delivery and helpful customer support.',
      },
    ],
  },
  contact: {
    title: 'Contact Us',
    subtitle: 'Need help? Reach out to our support team.',
    icon: Phone,
    sections: [
      {
        heading: 'Email',
        text: 'support@alucardshop.com',
      },
      {
        heading: 'Phone',
        text: '+880 1728 817812',
      },
      {
        heading: 'Address',
        text: 'Sylhet, Bangladesh',
      },
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'Your privacy and data protection matter to us.',
    icon: ShieldCheck,
    sections: [
      {
        heading: 'Information We Collect',
        text: 'We collect only necessary information such as name, email, phone, delivery address and order details to process your purchase.',
      },
      {
        heading: 'How We Use Data',
        text: 'Your information is used for order processing, customer support, delivery updates and improving the shopping experience.',
      },
      {
        heading: 'Data Safety',
        text: 'We do not sell your personal information. Your data is handled with care and used only for shopping-related purposes.',
      },
    ],
  },
  return: {
    title: 'Return Policy',
    subtitle: 'Shop confidently with a simple return and replacement policy.',
    icon: RotateCcw,
    sections: [
      {
        heading: 'Return Window',
        text: 'Products can be returned or replaced within the eligible return period if the item is damaged, incorrect or defective.',
      },
      {
        heading: 'Return Condition',
        text: 'Items should be unused, with original packaging and proof of purchase.',
      },
      {
        heading: 'Support',
        text: 'Contact support with your order ID and issue details to start a return request.',
      },
    ],
  },
};

const InfoPage = ({ type = 'about' }) => {
  const data = content[type] || content.about;
  const Icon = data.icon;

  usePageTitle(`${data.title} | Alucard Shop`, data.subtitle);

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-3xl bg-yellow-400 p-8 text-black shadow-sm">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-yellow-400">
            <Icon size={34} />
          </div>

          <h1 className="mt-6 text-4xl font-black">{data.title}</h1>

          <p className="mt-3 max-w-2xl text-sm font-bold leading-6 text-black/70">
            {data.subtitle}
          </p>
        </section>

        <section className="mt-6 grid gap-5">
          {data.sections.map((section) => (
            <div
              key={section.heading}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-xl font-black text-gray-950">
                {section.heading}
              </h2>

              <p className="mt-3 text-sm font-medium leading-7 text-gray-600">
                {section.text}
              </p>
            </div>
          ))}
        </section>

        {type === 'contact' && (
          <section className="mt-6 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <Mail className="text-yellow-700" />
              <p className="mt-3 font-black">Email Support</p>
              <p className="text-sm text-gray-500">support@alucardshop.com</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <Phone className="text-yellow-700" />
              <p className="mt-3 font-black">Phone</p>
              <p className="text-sm text-gray-500">+880 1728 817812</p>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
              <MapPin className="text-yellow-700" />
              <p className="mt-3 font-black">Location</p>
              <p className="text-sm text-gray-500">Sylhet, Bangladesh</p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default InfoPage;