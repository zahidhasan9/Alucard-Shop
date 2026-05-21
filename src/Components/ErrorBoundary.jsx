import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RotateCcw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="min-h-[70vh] bg-gray-100 px-4 py-16">
          <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-black/5">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 text-yellow-700">
              <AlertTriangle size={42} />
            </div>

            <h1 className="text-3xl font-black text-gray-950">
              Something went wrong
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              The page could not load properly. Please reload the page or go
              back to the homepage.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-yellow-400"
              >
                <RotateCcw size={18} />
                Reload
              </button>

              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-black"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;