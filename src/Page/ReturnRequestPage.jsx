import { useState } from 'react';
import { PackageSearch, RotateCcw, Send } from 'lucide-react';
import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import { getReturnRequests, saveReturnRequest } from '../utils/shopHelpers';

const ReturnRequestPage = () => {
  const [requests, setRequests] = useState(() => getReturnRequests());

  const [form, setForm] = useState({
    orderId: '',
    productName: '',
    reason: 'Damaged product',
    note: '',
  });

  usePageTitle(
    'Return Request | Alucard Shop',
    'Submit return or replacement requests for your orders.'
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.orderId.trim() || !form.productName.trim()) return;

    const updated = saveReturnRequest(form);
    setRequests(updated);

    setForm({
      orderId: '',
      productName: '',
      reason: 'Damaged product',
      note: '',
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-6 rounded-3xl bg-yellow-400 p-7 text-black shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-yellow-400">
            <RotateCcw size={28} />
          </div>

          <h1 className="mt-5 text-3xl font-black">Return / Refund Request</h1>

          <p className="mt-2 max-w-2xl text-sm font-bold leading-6 text-black/70">
            Submit your return request with order ID and product details.
            Support team will review it manually.
          </p>
        </section>

        <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
          >
            <h2 className="text-xl font-black text-gray-950">
              Request Form
            </h2>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-black text-gray-800">
                  Order ID
                </label>

                <input
                  value={form.orderId}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      orderId: e.target.value,
                    }))
                  }
                  placeholder="Enter order ID"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-800">
                  Product Name
                </label>

                <input
                  value={form.productName}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }))
                  }
                  placeholder="Enter product name"
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-800">
                  Reason
                </label>

                <select
                  value={form.reason}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      reason: e.target.value,
                    }))
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                >
                  <option>Damaged product</option>
                  <option>Wrong product received</option>
                  <option>Size/color issue</option>
                  <option>Product not as described</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-800">
                  Note
                </label>

                <textarea
                  value={form.note}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      note: e.target.value,
                    }))
                  }
                  placeholder="Explain your issue..."
                  className="min-h-28 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-black px-6 py-4 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
            >
              <Send size={18} />
              Submit Request
            </button>
          </form>

          <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="mb-5 flex items-center gap-2 text-xl font-black text-gray-950">
              <PackageSearch size={22} />
              My Return Requests
            </h2>

            {requests.length ? (
              <div className="space-y-4">
                {requests.map((request) => (
                  <div
                    key={request.id}
                    className="rounded-3xl border border-gray-100 p-4"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-black text-gray-950">
                          {request.productName}
                        </p>

                        <p className="text-xs font-semibold text-gray-500">
                          Order: {request.orderId}
                        </p>
                      </div>

                      <span className="w-fit rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-700">
                        {request.status}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-bold text-gray-600">
                      Reason: {request.reason}
                    </p>

                    {request.note && (
                      <p className="mt-2 text-sm leading-6 text-gray-500">
                        {request.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No return requests"
                message="Your submitted return requests will appear here."
                buttonText="Go Shopping"
                buttonLink="/products"
              />
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default ReturnRequestPage;