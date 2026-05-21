import { Link } from 'react-router-dom';
import {
  Shirt,
  Smartphone,
  Watch,
  Headphones,
  Baby,
  Sparkles,
  ShoppingBag,
  Gift,
} from 'lucide-react';

const categories = [
  { name: 'Men', icon: Shirt },
  { name: 'Women', icon: Sparkles },
  { name: 'Electronics', icon: Smartphone },
  { name: 'Accessories', icon: Watch },
  { name: 'Audio', icon: Headphones },
  { name: 'Baby', icon: Baby },
  { name: 'Fashion', icon: ShoppingBag },
  { name: 'Gifts', icon: Gift },
];

const CategoryIconSection = () => {
  return (
    <section className="bg-white py-10">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
              Browse
            </p>
            <h2 className="mt-1 text-2xl font-black text-gray-950 md:text-3xl">
              Shop by Category
            </h2>
          </div>

          <Link
            to="/products"
            className="hidden rounded-full bg-black px-5 py-2 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black sm:inline-flex"
          >
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to="/products"
                className="group rounded-3xl bg-yellow-50 p-5 text-center ring-1 ring-yellow-200 transition hover:-translate-y-1 hover:bg-yellow-400 hover:shadow-lg"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-sm transition group-hover:bg-black group-hover:text-yellow-400">
                  <Icon size={26} />
                </div>

                <p className="mt-3 text-sm font-black text-gray-950">
                  {item.name}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryIconSection;