import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductQuestions, submitQuestion } from '../../../features/questionSlice';

const ProductQuestions = ({ productId }) => {
  const dispatch = useDispatch();
  const { questions, loading } = useSelector(state => state.question || { questions: [] });
  const [question, setQuestion] = useState('');

  useEffect(() => {
    if (productId) dispatch(fetchProductQuestions(productId));
  }, [dispatch, productId]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!question.trim()) return;
    dispatch(submitQuestion({ product: productId, question })).then(() => setQuestion(''));
  };

  return (
    <section className="mt-10 rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="text-xl font-black text-gray-950">Product Q&A</h2>
      <p className="mt-1 text-sm text-gray-500">Ask anything about size, delivery, warranty, or product details.</p>

      <form onSubmit={handleSubmit} className="mt-5 flex gap-3">
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Write your question..."
          className="flex-1 rounded-2xl border px-4 py-3 outline-none focus:border-black"
        />
        <button disabled={loading} className="rounded-2xl bg-black px-5 py-3 font-bold text-white disabled:opacity-60">Ask</button>
      </form>

      <div className="mt-6 space-y-4">
        {questions.length === 0 ? (
          <p className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-500">No questions yet.</p>
        ) : (
          questions.map(item => (
            <div key={item._id} className="rounded-2xl border bg-gray-50 p-4">
              <p className="font-semibold text-gray-900">Q: {item.question}</p>
              <p className="mt-1 text-xs text-gray-500">Asked by {item.user?.firstName || 'Customer'}</p>
              {item.answers?.map(answer => (
                <div key={answer._id} className="mt-3 rounded-xl bg-white p-3 text-sm text-gray-700">
                  <span className="font-bold text-green-700">A:</span> {answer.answer}
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ProductQuestions;
