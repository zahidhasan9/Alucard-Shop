// import React from 'react';

// const subcat = [
//   {
//     name: 'sample'
//   },
//   {
//     name: 'aample'
//   },
//   {
//     name: 'bample'
//   },
//   {
//     name: 'cample'
//   },
//   {
//     name: 'dample'
//   },
//   {
//     name: 'eample'
//   },
//   {
//     name: 'fample'
//   },
//   {
//     name: 'gample'
//   },
//   {
//     name: 'hample'
//   },
//   {
//     name: 'iample'
//   }
// ];

// const HeaderOfView = () => {
//   return (
//     <>
//       <div className="bg-white shadow-lg mb-10">
//         <div className=" container font-Work_sans ">
//           <div className="px-1">
//             <h1 className="text-md md:text-2xl tracking-tight py-2">Category Name</h1>
//             <p className="text-xs md:text-sm tracking-wide py-1 pb-4 md:leading-relaxed leading-relaxed">
//               Details:WiFi Camera Price starts from BDT 2,280 to BDT 8,500 in Bangladesh, depending on brand, model, and
//               features. Buy Portable WiFi Cameras at best price from Star Tech online shop. Browse below and order yours
//               now!
//             </p>
//           </div>
//           <div className="py-1 pb-6">
//             <ul className="flex flex-wrap gap-2">
//               {subcat.map((data, idx) => (
//                 <li key={idx} className="px-2.5 py-1.5 border rounded-2xl text-sm hover:bg-gray-100 cursor-pointer">
//                   {data.name}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default HeaderOfView;

const HeaderOfView = () => {
  return (
    <section className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-yellow-600">
        Collection
      </p>

      <h1 className="mt-2 text-3xl font-black text-gray-950">
        All Products
      </h1>

      <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-500">
        Explore quality products with smart filtering, clear pricing and smooth
        shopping experience.
      </p>
    </section>
  );
};

export default HeaderOfView;
