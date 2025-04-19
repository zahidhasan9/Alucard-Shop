import React from 'react';

const Newsletter = () => {
  return (
    <>
      <div className="container">
        <section className=" py-12 px-4 border-b-2 border-gray-500 border-opacity-35">
          <div className="">
            <div className="font-Work_sans">
              <h2 className="text-2xl font-semibold mb-2">Newsletter</h2>
              <p className="text-gray-600 mb-6 text-sm">Subcribe to get information about products and coupons</p>
            </div>

            <div className="w-full flex-col sm:flex-row justify-between">
              <form className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="md:w-3/4 w-80 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-yellow-400 text-white rounded-r-md hover:bg-yellow-500 transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Newsletter;
