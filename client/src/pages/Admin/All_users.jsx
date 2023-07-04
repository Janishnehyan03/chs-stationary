import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "../../Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import OrderUpdateForm from "../../components/OrderUpdateForm";
import moment from "moment";

function All_users() {
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const getAllUsers = async () => {
    let response = await Axios.get("/users");
    console.log(response.data);
    setUsers(response.data.users);
  };
  useEffect(() => {
    getAllUsers();
  }, []);
  return (
    <div className="container">
      <Link
        to="/signup"
        className="float-right bg-green-400 px-3 py-1 uppercase text-gray-100 m-3 font-bold"
      >
        Add User
      </Link>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Username
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Password
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      View
                    </th>
                    <th
                      scope="col"
                      className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Pending
                    </th>
                    <th
                      scope="col"
                      className="px-6  py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Paid
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Update
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((person) => (
                    <tr key={person.email}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {person.username} ({person.studentClass}){" "}
                              {person.admissionNumber}
                            </div>
                          </div>
                        </div>
                      </td>
                      {showUpdateForm && (
                        <OrderUpdateForm
                          setShowUpdateForm={setShowUpdateForm}
                          updateForm={showUpdateForm}
                          // orderId={person.orderDetails.map((item,key))}
                        />
                      )}
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span
                          className="flex items-center"
                          onClick={handleTogglePassword}
                        >
                          <p className="mr-3 font-bold">
                            {showPassword ? person.password : "*****"}
                          </p>
                          <FontAwesomeIcon
                            className="hover:cursor-pointer"
                            icon={showPassword ? faEyeSlash : faEye}
                          />
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p className="text-green-500 font-bold mr-2">
                          RS: {person.totalPaidAmount}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p className="text-red-500 font-bold mr-2">
                          RS: {person.totalPendingAmount}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <FontAwesomeIcon
                          className="cursor-pointer"
                          onClick={(e) => setShowUpdateForm(!showUpdateForm)}
                          icon={faEdit}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default All_users;
