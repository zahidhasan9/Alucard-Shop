import { CreditCard, Headphones, RotateCcw, Truck } from 'lucide-react';

const items = [
  {
    title: 'Fast Delivery',
    text: 'Quick delivery across Bangladesh',
    icon: Truck,
  },
  {
    title: 'Secure Payment',
    text: 'Safe checkout and trusted payment',
    icon: CreditCard,
  },
  {
    title: 'Easy Return',
    text: 'Simple return and replacement policy',
    icon: RotateCcw,
  },
  {
    title: 'Support',
    text: 'Friendly customer support',
    icon: Headphones,
  },
];

const TrustBadges = () => {
  return (
    <section className="bg-gray-100 py-10">
      <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-black">
                  <Icon size={26} />
                </div>

                <div>
                  <h3 className="font-black text-gray-950">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-gray-500">
                    {item.text}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TrustBadges;