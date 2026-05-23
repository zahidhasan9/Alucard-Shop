import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { submitReturnRequest } from '../../../features/returnSlice';

const ReturnRequestButton = ({ order }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('damaged');
  const [note, setNote] = useState('');

  if (order?.Delivery !== 'delivered') return null;

  const submit = () => {
    const formData = new FormData();
    formData.append('orderId', order.orderId);
    formData.append('reason', reason);
    formData.append('note', note);
    dispatch(submitReturnRequest(formData));
    setOpen(false);
  };

  return (
    <div>
      <button onClick={() => setOpen(true)} className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 font-bold text-red-600">Request return/refund</button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <h3 className="text-xl font-black">Return / Refund Request</h3>
            <select value={reason} onChange={e => setReason(e.target.value)} className="mt-4 w-full rounded-2xl border px-4 py-3">
              <option value="damaged">Product damaged</option>
              <option value="wrong_item">Wrong item</option>
              <option value="not_as_described">Not as described</option>
              <option value="size_issue">Size issue</option>
              <option value="other">Other</option>
            </select>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Write details..." className="mt-3 h-28 w-full rounded-2xl border px-4 py-3" />
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-2xl border px-4 py-3 font-bold">Cancel</button>
              <button onClick={submit} className="rounded-2xl bg-black px-4 py-3 font-bold text-white">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnRequestButton;
