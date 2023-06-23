import React from "react";
import { useState, useEffect } from "react";
import Axios from "../../Axios";
import moment from "moment";

function AllOrders() {
  const [orders, setOrders] = useState([]);

  const getAllOrders = async () => {
    try {
      const response = await Axios.get("/orders");
      console.log(response.data.orders);
      setOrders(response.data.orders);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  const groupOrdersByDate = () => {
    const groupedOrders = {};
    orders.forEach((order) => {
      const date = moment(order.updatedAt).format("MM-DD-YYYY");
      if (!groupedOrders[date]) {
        groupedOrders[date] = [];
      }
      groupedOrders[date].push(order);
    });
    return groupedOrders;
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold">All Orders</h1>
      {orders && (
        <div className="grid grid-cols-1 gap-4">
          {Object.entries(groupOrdersByDate()).map(([date, orders]) => (
            <div key={date} className="border p-4">
              <h2 className="text-xl font-bold mb-2">{date}</h2>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="px-4 py-2">User</th>
                    <th className="px-4 py-2">Products</th>
                    <th className="px-4 py-2">Qty</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="border px-4 py-2">
                        {order.userId && order.userId.username} {"  "} ({" "}
                        {order.userId?.admissionNumber}) (
                        {order.userId?.studentClass})
                      </td>
                      <td className="border px-4 py-2">
                        <ol className="list-none">
                          {order.products.map((product) => (
                            <li key={product._id} className="uppercase">
                              {product.productId.title}
                            </li>
                          ))}
                        </ol>
                      </td>
                      <td className="border px-4 py-2">
                        <ol className="list-none">
                          {order.products.map((product) => (
                            <li key={product._id}>{product.quantity}</li>
                          ))}
                        </ol>
                      </td>
                      <td className="border px-4 py-2">
                        <ol className="list-none">
                          {order.products.map((product) => (
                            <li key={product._id}>{product.productId.price}</li>
                          ))}
                        </ol>
                      </td>
                      <td className="border px-4 py-2">{order.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllOrders;
