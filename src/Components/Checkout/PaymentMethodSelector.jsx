import { useEffect, useState } from 'react';
import { Banknote, CreditCard, Smartphone } from 'lucide-react';
import { STORAGE_KEYS } from '../../utils/shopHelpers';

const methods = [
  {
    id: 'cod',
    title: 'Cash on Delivery',
    subtitle: 'Pay when your product arrives',
    icon: Banknote,
    available: true,
  },
  {
    id: 'manual',
    title: 'Manual bKash/Nagad Payment',
    subtitle: 'Customer pays manually and enters transaction ID',
    icon: Smartphone,
    available: true,
  },
  {
    id: 'gateway',
    title: 'Online Gateway',
    subtitle: 'Gateway-ready, merchant account required',
    icon: CreditCard,
    available: false,
  },
];

const PaymentMethodSelector = ({ onChange }) => {
  const [method, setMethod] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.payment) || 'cod';
  });

  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.payment, method);

    onChange?.({
      method,
      transactionId,
      status: method === 'manual' && transactionId ? 'submitted' : 'pending',
    });
  }, [method, transactionId]);

  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5">
      <h3 className="text-lg font-black text-gray-950">Payment Method</h3>

      <div className="mt-4 grid gap-3">
        {methods.map((item) => {
          const Icon = item.icon;
          const active = method === item.id;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!item.available}
              onClick={() => setMethod(item.id)}
              className={`flex items-center gap-4 rounded-3xl border p-4 text-left transition ${
                active
                  ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
                  : 'border-gray-200 bg-white hover:border-yellow-300'
              } ${!item.available ? 'cursor-not-allowed opacity-60' : ''}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  active ? 'bg-yellow-400 text-black' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Icon size={23} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-black text-gray-950">{item.title}</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  {item.subtitle}
                </p>
              </div>

              <span
                className={`h-4 w-4 rounded-full border ${
                  active ? 'border-black bg-black' : 'border-gray-300'
                }`}
              />
            </button>
          );
        })}
      </div>

      {method === 'manual' && (
        <div className="mt-5 rounded-3xl bg-gray-50 p-4">
          <p className="text-sm font-black text-gray-950">
            Manual Payment Instruction
          </p>

          <p className="mt-2 text-sm leading-6 text-gray-600">
            Send payment to your business bKash/Nagad number, then enter the
            transaction ID below. This is not automatic gateway verification.
          </p>

          <input
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder="Enter transaction ID"
            className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
          />
        </div>
      )}

      {method === 'gateway' && (
        <div className="mt-5 rounded-3xl bg-yellow-50 p-4 text-sm font-bold text-gray-700">
          Online gateway will be enabled after adding merchant credentials.
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSelector;