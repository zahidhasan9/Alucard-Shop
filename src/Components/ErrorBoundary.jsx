// import { Component } from 'react';
// import { Link } from 'react-router-dom';
// import { AlertTriangle, RotateCcw } from 'lucide-react';

// class ErrorBoundary extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   componentDidCatch(error, info) {
//     console.error('App crashed:', error, info);
//   }

//   render() {
//     if (this.state.hasError) {
//       return (
//         <main className="min-h-[70vh] bg-gray-100 px-4 py-16">
//           <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
//             <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
//               <AlertTriangle size={42} />
//             </div>

//             <h1 className="text-3xl font-black text-gray-950">
//               Something went wrong
//             </h1>

//             <p className="mt-3 text-sm leading-6 text-gray-500">
//               The page could not load properly. Please reload the page or go
//               back to the homepage.
//             </p>

//             <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
//               <button
//                 type="button"
//                 onClick={() => window.location.reload()}
//                 className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400"
//               >
//                 <RotateCcw size={18} />
//                 Reload
//               </button>

//               <Link
//                 to="/"
//                 className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-black"
//               >
//                 Back to Home
//               </Link>
//             </div>
//           </div>
//         </main>
//       );
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;




import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home, RotateCcw, ShoppingBag } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error?.message || 'Something went wrong',
    };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-gray-100 px-4 py-10 font-Work_sans">
          <div className="container mx-auto flex min-h-[70vh] items-center justify-center">
            <div className="w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-white text-center shadow-sm">
              <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-red-700 p-8 text-white">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-red-100 text-red-600">
                  <AlertTriangle size={44} />
                </div>

                <h1 className="mt-5 text-3xl font-black">
                  Something went wrong
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-200">
                  The page could not load properly. Please reload the page or
                  go back to the homepage.
                </p>
              </div>

              <div className="p-6">
                {this.state.errorMessage && (
                  <div className="mb-5 rounded-2xl bg-gray-50 p-4 text-left">
                    <p className="text-xs font-black uppercase tracking-wide text-gray-500">
                      Error Message
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {this.state.errorMessage}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gray-950 px-6 py-3 text-sm font-black text-yellow-400 transition hover:bg-yellow-400 hover:text-gray-950"
                  >
                    <RotateCcw size={18} />
                    Reload Page
                  </button>

                  <Link
                    to="/"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    <Home size={18} />
                    Back to Home
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-6 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50"
                  >
                    <ShoppingBag size={18} />
                    Shop Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;