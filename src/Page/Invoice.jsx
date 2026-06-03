import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchOrderById } from '../features/OrderSlice';
import Loader from '../Components/Loader';

const formatPrice = value => {
  const amount = Number(value || 0);
  return `৳${amount.toLocaleString('en-BD')}`;
};

const formatDate = date => {
  if (!date) return 'N/A';

  return new Date(date).toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getPaymentLabel = order => {
  if (order?.manualPayment?.provider) {
    return order.manualPayment.provider.toUpperCase();
  }

  if (order?.paymentMethod?.method === 'cod') return 'Cash On Delivery';
  if (order?.paymentMethod?.method === 'manual') return 'Manual Payment';
  if (order?.paymentMethod?.method === 'online') return 'Online';

  return order?.paymentMethod?.method || 'N/A';
};

const InvoicePage = () => {
  const invoiceRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading } = useSelector(state => state.Order);

  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id));
    }
  }, [dispatch, id]);

  const handleDownloadInvoice = async () => {
    if (!invoiceRef.current || downloading) return;

    try {
      setDownloading(true);

      const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
        import('jspdf'),
        import('html2canvas'),
      ]);

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`invoice-${order?.orderId || order?._id || id}.pdf`);
    } catch (error) {
      console.error('Invoice download failed:', error);
    } finally {
      setDownloading(false);
    }
  };

  if (loading && !order) {
    return <Loader />;
  }

  const orderItems = order?.orderItems || [];
  const address = order?.shippingAddress || {};
  const user = order?.user || {};
  const orderNumber = order?.orderId || order?._id || id;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-8 font-Work_sans">
      <div className="mx-auto mb-5 flex max-w-4xl justify-end">
        <button
          type="button"
          onClick={handleDownloadInvoice}
          disabled={downloading}
          className="rounded-2xl bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? 'Preparing PDF...' : 'Download Invoice'}
        </button>
      </div>

      <section
        ref={invoiceRef}
        className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-sm"
      >
        <header className="flex flex-wrap items-start justify-between gap-5 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl font-black text-gray-950">Invoice</h1>

            <p className="mt-2 text-sm font-semibold text-gray-500">
              Thank you for your purchase!
            </p>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-black text-gray-950">
              Alucard Shop
            </h2>

            <p className="mt-1 text-sm font-bold text-gray-500">
              Bangladesh
            </p>
          </div>
        </header>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <h2 className="text-lg font-black text-gray-950">
              Invoice Details
            </h2>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-600">
              <p>
                <span className="text-gray-950">Order ID:</span> {orderNumber}
              </p>

              <p>
                <span className="text-gray-950">Date:</span>{' '}
                {formatDate(order?.createdAt)}
              </p>

              <p>
                <span className="text-gray-950">Status:</span>{' '}
                {order?.isDelivered ? 'Delivered' : order?.Delivery || 'Processing'}
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <h2 className="text-lg font-black text-gray-950">
              Customer Info
            </h2>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-600">
              <p>
                <span className="text-gray-950">Name:</span>{' '}
                {address?.fullName ||
                  `${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
                  'N/A'}
              </p>

              <p>
                <span className="text-gray-950">Email:</span>{' '}
                {address?.email || user?.email || 'N/A'}
              </p>

              <p>
                <span className="text-gray-950">Phone:</span>{' '}
                {address?.phone || user?.phone || 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl bg-gray-50 p-5">
          <h2 className="text-lg font-black text-gray-950">
            Shipping Address
          </h2>

          <p className="mt-3 text-sm font-bold leading-6 text-gray-600">
            {address?.address || 'N/A'}
            <br />
            City: {address?.city || 'N/A'}
            <br />
            Division: {address?.division || 'N/A'}
            <br />
            Postal Code: {address?.postalCode || 'N/A'}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="mb-4 text-lg font-black text-gray-950">
            Ordered Items
          </h2>

          <div className="overflow-hidden rounded-2xl border border-gray-200">
            <table className="w-full border-collapse text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-xs font-black uppercase tracking-wide text-gray-500">
                    Product
                  </th>

                  <th className="px-4 py-3 text-center text-xs font-black uppercase tracking-wide text-gray-500">
                    Qty
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Price
                  </th>

                  <th className="px-4 py-3 text-right text-xs font-black uppercase tracking-wide text-gray-500">
                    Total
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {orderItems.length ? (
                  orderItems.map((item, index) => {
                    const qty = Number(item?.qty || item?.quantity || 1);
                    const price = Number(item?.price || 0);

                    return (
                      <tr key={item?._id || index}>
                        <td className="px-4 py-4">
                          <p className="text-sm font-black text-gray-950">
                            {item?.name || 'N/A'}
                          </p>

                          {item?.variantLabel && (
                            <p className="mt-1 text-xs font-bold text-gray-500">
                              Variant: {item.variantLabel}
                            </p>
                          )}

                          {item?.variantSku && (
                            <p className="mt-1 text-xs font-bold text-gray-400">
                              SKU: {item.variantSku}
                            </p>
                          )}
                        </td>

                        <td className="px-4 py-4 text-center text-sm font-bold text-gray-600">
                          {qty}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-bold text-gray-600">
                          {formatPrice(price)}
                        </td>

                        <td className="px-4 py-4 text-right text-sm font-black text-gray-950">
                          {formatPrice(price * qty)}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-4 py-8 text-center text-sm font-bold text-gray-500"
                    >
                      No items found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl bg-gray-50 p-5">
            <h3 className="text-lg font-black text-gray-950">
              Payment Info
            </h3>

            <div className="mt-4 space-y-2 text-sm font-bold text-gray-600">
              <p>
                <span className="text-gray-950">Method:</span>{' '}
                {getPaymentLabel(order)}
              </p>

              <p>
                <span className="text-gray-950">Status:</span>{' '}
                {order?.isPaid ? 'Paid' : order?.paymentMethod?.status || 'Unpaid'}
              </p>

              {order?.paymentMethod?.transactionId && (
                <p>
                  <span className="text-gray-950">Transaction ID:</span>{' '}
                  {order.paymentMethod.transactionId}
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl bg-gray-50 p-5">
            <h3 className="text-lg font-black text-gray-950">
              Summary
            </h3>

            <div className="mt-4 space-y-3 text-sm font-bold text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(order?.itemsPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatPrice(order?.shippingPrice)}</span>
              </div>

              {Number(order?.discountPrice || 0) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-{formatPrice(order?.discountPrice)}</span>
                </div>
              )}

              <div className="flex justify-between border-t border-gray-200 pt-4 text-xl font-black text-gray-950">
                <span>Total</span>
                <span>{formatPrice(order?.totalPrice)}</span>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 border-t border-gray-200 pt-5 text-center text-xs font-bold text-gray-500">
          © 2026 Alucard Shop. All rights reserved.
        </footer>
      </section>
    </main>
  );
};

export default InvoicePage;