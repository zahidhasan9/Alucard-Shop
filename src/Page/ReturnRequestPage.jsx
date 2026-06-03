import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  ImagePlus,
  Loader2,
  PackageSearch,
  RotateCcw,
  Send,
  ShoppingBag,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';

import EmptyState from '../Components/UI/EmptyState';
import usePageTitle from '../hooks/usePageTitle';
import * as API from '../features/API';

const returnReasons = [
  {
    value: 'damaged',
    label: 'Damaged product',
  },
  {
    value: 'wrong_item',
    label: 'Wrong item received',
  },
  {
    value: 'size_issue',
    label: 'Size / color issue',
  },
  {
    value: 'not_as_described',
    label: 'Product not as described',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

const statusStyle = {
  pending: 'border-yellow-200 bg-yellow-100 text-yellow-900',
  approved: 'border-black bg-black text-yellow-300',
  rejected: 'border-red-200 bg-red-50 text-red-700',
  received: 'border-blue-200 bg-blue-50 text-blue-700',
  refunded: 'border-black bg-black text-yellow-300',
  cancelled: 'border-gray-200 bg-gray-100 text-gray-600',
};

const statusLabel = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  received: 'Received',
  refunded: 'Refunded',
  cancelled: 'Cancelled',
};

const getRequestsFromPayload = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.requests)) return payload.requests;
  if (Array.isArray(payload?.returnRequests)) return payload.returnRequests;
  if (Array.isArray(payload?.data?.requests)) return payload.data.requests;
  if (Array.isArray(payload?.data)) return payload.data;

  return [];
};

const formatDate = (date) => {
  if (!date) return 'N/A';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'N/A';
  }

  return parsedDate.toLocaleDateString('en-BD', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const getReasonLabel = (reason) => {
  return returnReasons.find((item) => item.value === reason)?.label || reason || 'N/A';
};

const ReturnRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    orderId: '',
    reason: 'damaged',
    note: '',
  });

  usePageTitle(
    'Return Request | Alucard Shop',
    'Submit return or replacement requests for your orders.'
  );

  const totalRequests = requests.length;

  const pendingRequests = useMemo(() => {
    return requests.filter((request) => request?.status === 'pending').length;
  }, [requests]);

  const loadMyReturnRequests = async () => {
    try {
      setLoadingRequests(true);

      const res = await API.getMyReturnRequests();
      setRequests(getRequestsFromPayload(res.data));
    } catch (error) {
      toast.error(
        error?.response?.data?.message || 'Return requests could not be loaded'
      );
      setRequests([]);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    loadMyReturnRequests();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    setImages(selectedFiles);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const resetForm = () => {
    setForm({
      orderId: '',
      reason: 'damaged',
      note: '',
    });
    setImages([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.orderId.trim()) {
      toast.error('Order ID is required');
      return;
    }

    if (!form.reason.trim()) {
      toast.error('Reason is required');
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append('orderId', form.orderId.trim());
      formData.append('reason', form.reason);
      formData.append('note', form.note.trim());

      images.forEach((image) => {
        formData.append('images', image);
      });

      await API.createReturnRequest(formData);

      toast.success('Return request submitted');
      resetForm();
      loadMyReturnRequests();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          'Return request failed. Make sure the order is delivered and within return window.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-4 py-6 font-Work_sans lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="overflow-hidden rounded-[34px] border border-black/5 bg-white shadow-sm">
          <div className="relative overflow-hidden bg-gradient-to-br from-yellow-200 via-yellow-100 to-white p-5 md:p-7">
            <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-yellow-300/60 blur-3xl" />
            <div className="absolute -bottom-24 left-8 h-52 w-52 rounded-full bg-yellow-200/70 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[24px] bg-black text-yellow-300 shadow-sm">
                  <RotateCcw size={34} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.22em] text-yellow-800">
                    Return Center
                  </p>

                  <h1 className="mt-1 text-2xl font-medium tracking-tight text-black md:text-4xl">
                    Return / Refund Request
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-gray-600">
                    Submit return, refund or replacement requests for delivered
                    orders. Requests are reviewed manually by support.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:w-[300px]">
                <SummaryCard
                  label="Total"
                  value={totalRequests}
                  icon={ClipboardList}
                />

                <SummaryCard
                  label="Pending"
                  value={pendingRequests}
                  icon={PackageSearch}
                />
              </div>
            </div>
          </div>
        </section>

        <div className="mt-6 grid gap-5 lg:grid-cols-[410px_1fr]">
          <form
            onSubmit={handleSubmit}
            className="h-fit rounded-[30px] border border-black/5 bg-white p-5 shadow-sm md:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-[18px] bg-yellow-300 text-black">
                <Send size={20} strokeWidth={1.8} />
              </div>

              <div>
                <h2 className="text-xl font-medium tracking-tight text-black">
                  Request Form
                </h2>

                <p className="mt-1 text-sm font-normal text-gray-500">
                  Only delivered orders are eligible for return request.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InputField
                label="Order ID"
                name="orderId"
                value={form.orderId}
                onChange={handleInputChange}
                placeholder="Example: ORD-123456"
              />

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                  Reason
                </span>

                <select
                  name="reason"
                  value={form.reason}
                  onChange={handleInputChange}
                  className="h-12 w-full rounded-2xl border border-black/10 bg-[#fbfbfd] px-4 text-sm font-normal text-black outline-none transition focus:border-yellow-300 focus:bg-white"
                >
                  {returnReasons.map((reason) => (
                    <option key={reason.value} value={reason.value}>
                      {reason.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                  Note
                </span>

                <textarea
                  name="note"
                  value={form.note}
                  onChange={handleInputChange}
                  placeholder="Explain your issue..."
                  className="min-h-28 w-full resize-none rounded-2xl border border-black/10 bg-[#fbfbfd] px-4 py-3 text-sm font-normal leading-6 text-black outline-none transition placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
                  Images
                </span>

                <div className="rounded-2xl border border-dashed border-yellow-300 bg-yellow-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-yellow-300 text-black">
                      <ImagePlus size={18} strokeWidth={1.8} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-black">
                        Upload product issue image
                      </p>
                      <p className="text-xs font-normal text-gray-500">
                        Maximum 4 images allowed.
                      </p>
                    </div>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="mt-4 w-full text-sm text-gray-600"
                  />

                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <div
                          key={`${image.name}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2"
                        >
                          <span className="truncate text-xs font-normal text-gray-600">
                            {image.name}
                          </span>

                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600"
                          >
                            <X size={13} strokeWidth={2} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-black px-6 py-3.5 text-sm font-medium text-yellow-300 transition hover:bg-yellow-300 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 size={17} strokeWidth={1.8} className="animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  <Send size={17} strokeWidth={1.8} />
                  Submit Request
                </>
              )}
            </button>

            <div className="mt-4 flex gap-3 rounded-2xl bg-yellow-50 p-4 text-sm font-normal leading-6 text-yellow-900">
              <AlertCircle size={18} strokeWidth={1.8} className="mt-0.5 shrink-0" />
              <p>
                Return request works only for delivered orders and must be
                submitted within the allowed return window.
              </p>
            </div>
          </form>

          <section className="rounded-[30px] border border-black/5 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-[18px] bg-yellow-100 text-yellow-800">
                  <PackageSearch size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h2 className="text-xl font-medium tracking-tight text-black">
                    My Return Requests
                  </h2>

                  <p className="mt-1 text-sm font-normal text-gray-500">
                    These requests are saved in backend database.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={loadMyReturnRequests}
                disabled={loadingRequests}
                className="w-fit rounded-full border border-yellow-200 bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-yellow-300 disabled:opacity-60"
              >
                Refresh
              </button>
            </div>

            {loadingRequests ? (
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-28 animate-pulse rounded-[24px] bg-[#f5f5f7]"
                  />
                ))}
              </div>
            ) : requests.length ? (
              <div className="space-y-3">
                {requests.map((request) => (
                  <ReturnRequestCard key={request._id} request={request} />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-yellow-300 bg-yellow-50 p-8">
                <EmptyState
                  icon={ShoppingBag}
                  title="No return requests"
                  message="Your submitted return requests will appear here."
                  buttonText="Go Shopping"
                  buttonLink="/products"
                />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

const SummaryCard = ({ label, value, icon: Icon }) => {
  return (
    <div className="rounded-[22px] border border-black/5 bg-white/75 p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-normal uppercase tracking-[0.16em] text-gray-500">
            {label}
          </p>

          <h3 className="mt-1 text-2xl font-medium tracking-tight text-black">
            {value}
          </h3>
        </div>

        <div className="grid h-9 w-9 place-items-center rounded-2xl bg-yellow-300 text-black">
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, ...props }) => {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-[0.16em] text-gray-500">
        {label}
      </span>

      <input
        {...props}
        className="h-12 w-full rounded-2xl border border-black/10 bg-[#fbfbfd] px-4 text-sm font-normal text-black outline-none transition placeholder:text-gray-400 focus:border-yellow-300 focus:bg-white"
      />
    </label>
  );
};

const ReturnRequestCard = ({ request }) => {
  const status = request?.status || 'pending';

  return (
    <article className="rounded-[24px] border border-black/5 bg-[#fbfbfd] p-4 transition hover:border-yellow-300 hover:bg-white hover:shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <h3 className="line-clamp-1 text-base font-medium tracking-tight text-black">
            Order #{request.orderId}
          </h3>

          <p className="mt-1 text-sm font-normal text-gray-500">
            Reason:{' '}
            <span className="text-black">{getReasonLabel(request.reason)}</span>
          </p>
        </div>

        <span
          className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
            statusStyle[status] || statusStyle.pending
          }`}
        >
          <CheckCircle2 size={13} strokeWidth={1.8} />
          {statusLabel[status] || status}
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <InfoPill
          icon={RotateCcw}
          label="Reason"
          value={getReasonLabel(request.reason)}
        />

        <InfoPill
          icon={CalendarDays}
          label="Submitted"
          value={formatDate(request.createdAt)}
        />
      </div>

      {request.note && (
        <div className="mt-3 rounded-2xl bg-white p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-gray-500">
            Note
          </p>

          <p className="mt-1 text-sm font-normal leading-6 text-gray-600">
            {request.note}
          </p>
        </div>
      )}

      {request.adminNote && (
        <div className="mt-3 rounded-2xl bg-yellow-50 p-4">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-yellow-800">
            Admin Note
          </p>

          <p className="mt-1 text-sm font-normal leading-6 text-yellow-900">
            {request.adminNote}
          </p>
        </div>
      )}
    </article>
  );
};

const InfoPill = ({ icon: Icon, label, value }) => {
  return (
    <div className="rounded-2xl bg-white p-3">
      <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-gray-500">
        <Icon size={14} strokeWidth={1.8} />
        {label}
      </div>

      <p className="mt-1 text-sm font-medium text-black">{value}</p>
    </div>
  );
};

export default ReturnRequestPage;