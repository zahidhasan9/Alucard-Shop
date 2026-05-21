import { CheckCircle, Clock, PackageCheck, PackageOpen, Truck } from 'lucide-react';

const steps = [
  { key: 'placed', label: 'Order Placed', icon: Clock },
  { key: 'confirmed', label: 'Confirmed', icon: CheckCircle },
  { key: 'processing', label: 'Processing', icon: PackageOpen },
  { key: 'shipped', label: 'Shipped', icon: Truck },
  { key: 'delivered', label: 'Delivered', icon: PackageCheck },
];

const getCurrentStep = (order) => {
  const status =
    order?.deliveryStatus ||
    order?.status ||
    (order?.isDelivered ? 'delivered' : 'placed');

  const normalized = String(status).toLowerCase();

  if (order?.isDelivered || normalized.includes('deliver')) return 4;
  if (normalized.includes('ship')) return 3;
  if (normalized.includes('process')) return 2;
  if (normalized.includes('confirm')) return 1;

  return 0;
};

const OrderTimeline = ({ order }) => {
  const activeIndex = getCurrentStep(order);

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <h2 className="text-xl font-black text-gray-950">Order Tracking</h2>

      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index <= activeIndex;

          return (
            <div key={step.key} className="relative">
              <div
                className={`rounded-3xl p-4 text-center ring-1 ${
                  isActive
                    ? 'bg-yellow-400 text-black ring-yellow-400'
                    : 'bg-gray-50 text-gray-400 ring-gray-100'
                }`}
              >
                <div
                  className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${
                    isActive ? 'bg-black text-yellow-400' : 'bg-white'
                  }`}
                >
                  <Icon size={23} />
                </div>

                <p className="mt-3 text-sm font-black">{step.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTimeline;