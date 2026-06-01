// import { useEffect, useState } from 'react';
// import { HelpCircle, MessageCircle, Send } from 'lucide-react';
// import { getQAs, saveQAs } from '../../../utils/shopHelpers';

// const ProductQA = ({ productId }) => {
//   const [items, setItems] = useState([]);
//   const [question, setQuestion] = useState('');

//   useEffect(() => {
//     if (productId) {
//       setItems(getQAs(productId));
//     }
//   }, [productId]);

//   const handleSubmit = () => {
//     if (!question.trim()) return;

//     const updated = [
//       {
//         id: Date.now(),
//         question: question.trim(),
//         answer: '',
//         createdAt: new Date().toISOString(),
//       },
//       ...items,
//     ];

//     setItems(updated);
//     saveQAs(productId, updated);
//     setQuestion('');
//   };

//   return (
//     <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
//       <div className="mb-5 flex items-center gap-3">
//         <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400 text-black">
//           <HelpCircle size={24} />
//         </div>

//         <div>
//           <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
//             Product Q&A
//           </p>

//           <h2 className="text-2xl font-black text-gray-950">
//             Ask about this product
//           </h2>
//         </div>
//       </div>

//       <div className="rounded-3xl bg-gray-50 p-4">
//         <textarea
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           placeholder="Ask your question..."
//           className="min-h-24 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold outline-none focus:border-yellow-400"
//         />

//         <button
//           type="button"
//           onClick={handleSubmit}
//           className="mt-3 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black"
//         >
//           <Send size={17} />
//           Submit Question
//         </button>
//       </div>

//       <div className="mt-6 space-y-4">
//         {items.length ? (
//           items.map((item) => (
//             <div
//               key={item.id}
//               className="rounded-3xl border border-gray-100 p-4"
//             >
//               <div className="flex gap-3">
//                 <MessageCircle className="mt-1 text-yellow-600" size={20} />

//                 <div>
//                   <p className="font-black text-gray-950">{item.question}</p>

//                   <p className="mt-2 text-sm font-semibold text-gray-500">
//                     {item.answer ||
//                       'Answer pending. Support team will answer soon.'}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="rounded-3xl bg-yellow-50 p-5 text-sm font-bold text-gray-700">
//             No questions yet. Be the first to ask.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ProductQA;




import { useEffect, useState } from 'react';
import { HelpCircle, MessageCircle, Send } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  fetchProductQuestions,
  submitQuestion,
} from '../../../features/questionSlice';

const getUserName = user => {
  const fullName = `${user?.firstName || ''} ${user?.lastName || ''}`.trim();
  return fullName || user?.name || 'Customer';
};

const ProductQA = ({ productId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { questions = [], loading } = useSelector(state => state.question);
  const { user, isAuthenticated } = useSelector(state => state.user);

  const [question, setQuestion] = useState('');
  const [localError, setLocalError] = useState('');

  const isLoggedIn = Boolean(user || isAuthenticated);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductQuestions(productId));
    }
  }, [dispatch, productId]);

  const handleSubmit = async () => {
    setLocalError('');

    if (!productId) {
      setLocalError('Product information is missing.');
      return;
    }

    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    const cleanQuestion = question.trim();

    if (!cleanQuestion) {
      setLocalError('Please write your question first.');
      return;
    }

    if (cleanQuestion.length < 5) {
      setLocalError('Question must be at least 5 characters long.');
      return;
    }

    try {
      await dispatch(
        submitQuestion({
          product: productId,
          question: cleanQuestion,
        })
      ).unwrap();

      setQuestion('');
    } catch (error) {
      setLocalError(
        typeof error === 'string'
          ? error
          : 'Failed to submit question. Please try again.'
      );
    }
  };

  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-100 text-yellow-700">
          <HelpCircle size={22} />
        </div>

        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-yellow-600">
            Product Q&A
          </p>
          <h2 className="text-2xl font-black text-gray-950">
            Ask about this product
          </h2>
        </div>
      </div>

      <div className="rounded-3xl bg-gray-50 p-4">
        {localError && (
          <div className="mb-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            {localError}
          </div>
        )}

        <textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={
            isLoggedIn
              ? 'Ask your question...'
              : 'Please login to ask a question.'
          }
          className="min-h-24 w-full rounded-2xl border border-gray-200 bg-white p-4 text-sm font-semibold outline-none focus:border-yellow-400"
          disabled={loading}
        />

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send size={17} />
          {loading ? 'Submitting...' : isLoggedIn ? 'Submit Question' : 'Login to Ask'}
        </button>

        <p className="mt-3 text-xs font-semibold text-gray-500">
          Your question may need admin approval before it appears publicly.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        {loading && !questions.length ? (
          <div className="rounded-3xl bg-yellow-50 p-5 text-sm font-bold text-gray-700">
            Loading questions...
          </div>
        ) : questions.length ? (
          questions.map(item => (
            <div
              key={item._id || item.id}
              className="rounded-3xl border border-gray-100 p-4"
            >
              <div className="flex gap-3">
                <MessageCircle
                  className="mt-1 flex-shrink-0 text-yellow-600"
                  size={20}
                />

                <div className="min-w-0 flex-1">
                  <p className="font-black text-gray-950">{item.question}</p>

                  <p className="mt-1 text-xs font-semibold text-gray-400">
                    Asked by {getUserName(item.user)}
                  </p>

                  {item.answers?.length ? (
                    <div className="mt-3 space-y-2">
                      {item.answers.map(answer => (
                        <div
                          key={answer._id}
                          className="rounded-2xl bg-yellow-50 p-3"
                        >
                          <p className="text-sm font-semibold text-gray-700">
                            {answer.answer}
                          </p>

                          <p className="mt-1 text-xs font-bold text-yellow-700">
                            {answer.isAdminAnswer ? 'Admin Answer' : 'Answer'}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm font-semibold text-gray-500">
                      Answer pending. Support team will answer soon.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-3xl bg-yellow-50 p-5 text-sm font-bold text-gray-700">
            No questions yet. Be the first to ask.
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductQA;