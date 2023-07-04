// OrderUpdateForm.js

import React, { useState } from "react";
import Axios from "../Axios";

const OrderUpdateForm = ({
  orderId,
  onUpdate,
  setShowUpdateForm,
  updateForm,
}) => {
  const [paidAmount, setPaidAmount] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.patch(`/orders/${orderId}`, {
        paidAmount,
      });

      onUpdate(response.data.order);
    } catch (error) {
      console.log(error);
      // Handle error as needed
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
      <div className="bg-gray-400 p-4 rounded-lg shadow-lg">
        <form onSubmit={handleUpdate} className="justify-center items-center">
          <label htmlFor="paidAmount" className="block mb-2">
            Paid Amount:
          </label>
          <input
            type="number"
            id="paidAmount"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
          />
          <button
            onClick={() => setShowUpdateForm(!updateForm)}
            type="submit"
            className="bg-red-500 mx-2 text-white py-1 px-4 rounded"
          >
            close
          </button>
          <button
            type="submit"
            className="bg-green-500 mx-2 text-white py-1 px-4 rounded"
          >
            update
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderUpdateForm;
