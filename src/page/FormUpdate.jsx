import React, { useEffect, useState } from "react";
import { options } from "../util";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FormUpdate() {
  const [formData, setFormData] = useState({});
  const [name, setName] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [loading, setLoading] = useState(true);

  const renderOptions = (optionsList, depth = 0) => {
    return optionsList.map((option) => {
      const indentation = "\u00A0\u00A0\u00A0\u00A0".repeat(depth);
      return (
        <React.Fragment key={option.value}>
          <option value={option.value}>
            {indentation}
            {option.label}
          </option>
          {option.options && renderOptions(option.options, depth + 1)}
        </React.Fragment>
      );
    });
  };

  useEffect(() => {
    axios(`https://from-submit-server.vercel.app`, {
      method: "GET",
      //   headers: {
      //     authorization: `bearer ${localStorage.getItem("userToken")}`,
      //   },
    })
      .then((res) => {
        setFormData(res?.data?.data[0]);
        setName(res?.data?.data[0]?.name);
        setSelectedSector(res?.data?.data[0]?.sector);
        setTermsAgreed(res?.data?.data[0]?.termsAgreed || false);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedData = {
      ...formData,
      name,
      sector: selectedSector,
      termsAgreed,
    };

    axios
      .patch(
        `https://from-submit-server.vercel.app/update/${formData?._id}`,
        updatedData
      )
      .then((res) => {
        console.log("Data updated successfully", res.data);
        alert("Update the data successfully");
      })
      .catch((error) => {
        console.error("Error updating data", error);
      });
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="shadow-lg p-6 rounded-md">
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <button className="focus:bg-red-600 border py-1 px-4 bg-indigo-500 text-white rounded-md">
              Home
            </button>
          </Link>

          <Link to={"/update"}>
            <button className="focus:bg-red-600 border py-1 px-4 bg-indigo-500 text-white rounded-md ml-2">
              View
            </button>
          </Link>
        </div>
        <h2 className="text-xl">
          Your Submitted data & Here you can also update!
        </h2>
        {loading ? (
          <p>Loading....</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mt-4">
              <label htmlFor="name">Name:</label> <br />
              <input
                className="w-full p-2 border border-1 rounded-md mt-1"
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label htmlFor="sectors">Sectors:</label> <br />
              <select
                className="w-full mt-1 border-2 rounded-md p-2 bg-white"
                size="5"
                id="sectors"
                name="sectors"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                required
              >
                {renderOptions(options)}
              </select>
            </div>
            <div className="mt-4">
              <input
                type="checkbox"
                id="termsAgreed"
                name="termsAgreed"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                required
              />
              <label htmlFor="termsAgreed" className="ml-2">
                Agree to terms
              </label>
            </div>
            <button className="border py-1 px-4 bg-indigo-500 text-white rounded-md mt-2">
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
