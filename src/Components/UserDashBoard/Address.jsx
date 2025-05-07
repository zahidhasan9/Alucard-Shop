import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import Loader from '../../Components/Loader.jsx'
import { createAddress,
         getAllAddresses,
         updateAddress,
         deleteAddress} from '../../features/addressSlice.js';


const AddressSection = () => {
   const [showModal, setShowModal] = useState(false);
   const [isEditing, setIsEditing] = useState(false);
   const [editId, setEditId] = useState(null);
  
   const { addresses, loading } = useSelector(state => state.addressReducer);
   const dispatch = useDispatch();

   const [address, setAddress] = useState({
      fullName: '',
      phone: '',
      street: '',
      city: '',
      postalCode: '',
      division: '',
   });

   useEffect(() => {
      dispatch(getAllAddresses());
   }, [dispatch]);

   const handleInputChange = e => {
      setAddress({ ...address, [e.target.name]: e.target.value });
   };
   const handleSave = () => {
      if (isEditing) {
         dispatch(updateAddress({ id: editId, data: address }));
         setTimeout(() => {
            dispatch(getAllAddresses());
          }, 1000); 
      } else {
         dispatch(createAddress(address));
         setTimeout(() => {
            dispatch(getAllAddresses());
          }, 1000); 
      }
      setShowModal(false);
      setIsEditing(false);
      setEditId(null);
      setAddress({
         fullName: '',
         phone: '',
         street: '',
         city: '',
         postalCode: '',
         division: '',
      });
   };

   const handleEdit = (addr) => {
      console.log("Editing address:", addr); // <-- এটা যোগ করো
      setIsEditing(true);
      setEditId(addr._id); // assuming MongoDB _id
      setAddress({
         fullName: addr.fullName,
         phone: addr.phone,
         street: addr.street,
         city: addr.city,
         postalCode: addr.postalCode,
         division: addr.division,
      });
      setShowModal(true);
   };

   const handleDelete = id => {
      if (confirm("Are you sure you want to delete this address?")) {
         dispatch(deleteAddress(id));
      }
   };

   return (
      <div className="border border-gray-200 rounded-xl shadow-sm p-6 bg-white">
         <h2 className="text-lg font-semibold text-gray-800 mb-6">My Address</h2>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Address Info */}
            <div className="md:col-span-2 text-sm text-gray-700 space-y-4">
               {loading ? (
                  <Loader/>
               ) : addresses.length > 0 ? (
                  addresses.map((addr, idx) => (
                     <div key={idx} className="border-b pb-3 relative group">
                        <div className="space-y-1">
                           <p><span className="font-medium">Name:</span> {addr.fullName}</p>
                           <p><span className="font-medium">Phone:</span> {addr.phone}</p>
                           <p><span className="font-medium">Division:</span> {addr.division}</p>
                           <p><span className="font-medium">City:</span> {addr.city}</p>
                           <p><span className="font-medium">Postal Code:</span> {addr.postalCode}</p>
                           <p><span className="font-medium">street:</span> {addr.street}</p>
                        </div>

                        <div className="absolute top-0 right-0 flex gap-2  group-hover:opacity-100 transition-opacity">
                           <button
                              onClick={() => handleEdit(addr)}
                              className="text-blue-600 text-xs flex items-center gap-1 hover:underline">
                              <Pencil size={14} /> Edit
                           </button>
                           <button
                              onClick={() => handleDelete(addr._id)}
                              className="text-red-500 text-xs flex items-center gap-1 hover:underline">
                              <Trash2 size={14} /> Delete
                           </button>
                        </div>
                     </div>
                  ))
               ) : (
                  <p>Add New Addresses.</p>
               )}
            </div>

            {/* Right: Guide */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-sm text-gray-600">
               <h4 className="text-sm font-semibold mb-2 text-gray-800">Tips</h4>
               <ul className="list-disc list-inside space-y-1">
                  <li>Use a valid street address</li>
                  <li>Ensure correct postal code</li>
                  <li>Double-check your contact number</li>
               </ul>
            </div>
         </div>

         {/* Button */}
         <div className="mt-6">
            <button
               onClick={() => {
                  setShowModal(true);
                  setIsEditing(false);
                  setEditId(null);
                  setAddress({
                     fullName: '',
                     phone: '',
                     division: '',
                     city: '',
                     postalCode: '',
                     street: '',
                  });
               }}
               className="bg-black font-semibold text-white text-sm px-5 py-2 rounded-md hover:bg-gray-800 transition">
               Add Address
            </button>
         </div>

         {/* Modal */}
         {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center">
               <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                     {isEditing ? 'Edit Address' : 'Add New Address'}
                  </h3>
                  <div className="space-y-3">
                     {/* {['name', 'phone', 'street', 'fullName', 'postalCode', 'country'].map(field => ( */}
                        <div >
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                              
                           </label>
                           <input
                              name='fullName'
                              placeholder='Full Name'
                              value={address.fullName}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              type="text"
                           />
                        </div>

                        {/* <div key={field}>
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                              {field.replace(/([A-Z])/g, ' $1')}
                           </label>
                           <input
                              name={field}
                              value={address[field]}
                              onChange={handleInputChange}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              type="text"
                           />
                        </div> */}

                           <div >
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                           </label>
                           <input  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              name='phone'
                              placeholder='Phone Number'
                              value={address.phone}
                              onChange={handleInputChange}
                              type="text"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                           </label>
                           <input  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              name='division'
                              placeholder='Division'
                              value={address.division}
                              onChange={handleInputChange}
                              type="text"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                           </label>
                           <input  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              name='city'
                              placeholder='city'
                              value={address.city}
                              onChange={handleInputChange}
                              type="text"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                           </label>
                           <input  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              name='street'
                              placeholder='Street'
                              value={address.street}
                              onChange={handleInputChange}
                              type="text"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-medium text-gray-600 capitalize mb-1">
                           </label>
                           <input  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                              name='postalCode'
                              placeholder='Postal Code'
                              value={address.postalCode}
                              onChange={handleInputChange}
                              type="text"
                           />
                        </div>
                     
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                     <button onClick={() => setShowModal(false)} className="text-sm border border-black text-black px-4 py-1.5 rounded-md hover:bg-black hover:text-white transition-all">
                        Cancel
                     </button>
                     <button
                        onClick={handleSave}
                        className="text-sm bg-black text-white px-5 py-1.5 rounded-md hover:opacity-90 transition-all disabled:opacity-50">
                        {isEditing ? 'Update' : 'Save'}
                     </button>
                  </div>

                  <button
                     className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                     onClick={() => setShowModal(false)}>
                     ✕
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default AddressSection;
