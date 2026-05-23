const paymentNumbers = {
  bkash: '01XXXXXXXXX',
  nagad: '01XXXXXXXXX',
  rocket: '01XXXXXXXXX',
};

const ManualPaymentBox = ({ paymentMethod, manualPayment, setManualPayment, total }) => {
  if (!['bkash', 'nagad', 'rocket'].includes(paymentMethod)) return null;

  return (
    <div className="rounded-3xl border border-pink-100 bg-pink-50 p-5">
      <h3 className="text-lg font-black capitalize text-gray-950">{paymentMethod} manual payment</h3>
      <p className="mt-2 text-sm text-gray-600">
        Send ৳{total} to <span className="font-black text-gray-950">{paymentNumbers[paymentMethod]}</span>, then submit sender number and transaction ID.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <input value={manualPayment.senderNumber} onChange={e => setManualPayment({ ...manualPayment, senderNumber: e.target.value })} placeholder="Sender number" className="rounded-2xl border bg-white px-4 py-3 outline-none focus:border-black" />
        <input value={manualPayment.transactionId} onChange={e => setManualPayment({ ...manualPayment, transactionId: e.target.value })} placeholder="Transaction ID" className="rounded-2xl border bg-white px-4 py-3 outline-none focus:border-black" />
      </div>
    </div>
  );
};

export default ManualPaymentBox;
