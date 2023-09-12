import React, { useState } from "react";
import { options } from "../util";
import { Link } from "react-router-dom";
import axios from "axios";

export default function FormSubmit() {
  const [selectedOption, setSelectedOption] = useState("");
  const [name, setName] = useState("");
  const [termsAgreed, setTermsAgreed] = useState(false);

  const handleOptionSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
  };
  const handleNameChange = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const handleTermsAgreedChange = (event) => {
    const checked = event.target.checked;
    setTermsAgreed(checked);
  };
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      name: name,
      sector: selectedOption.trim(),
      termsAgreed: termsAgreed,
    };
    const url = "https://from-submit-server.vercel.app/submit";
    try {
      const response = await axios.post(url, data);
      console.log("API Response:", response.data);
      alert("Submit the data successfully");
    } catch (error) {
      console.error("API Error:", error);
    }
  };
  return (
    <div className=" flex justify-center mt-8 ">
      <div className="shadow-lg p-6 rounded-md">
        <div className="flex justify-center mb-4">
          <Link to={"/"}>
            <button className="focus:bg-red-600 border py-1 px-4 bg-indigo-500 text-white rounded-md">
              Home{" "}
            </button>
          </Link>

          <Link to={"/update"}>
            <button className="focus:bg-red-600 border py-1 px-4 bg-indigo-500 text-white rounded-md ml-2">
              View
            </button>
          </Link>
        </div>
        <h2 className="text-xl">
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="">Name : </label> <br />
            <input
              className="w-full p-2 border border-1 rounded-md mt-1 "
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="">Sectors : </label> <br />
            <select
              className="w-full mt-1 border-2 rounded-md p-2 bg-white"
              size="5"
              id="sectors"
              name="sectors"
              // value={selectedOption || ""}
              onChange={handleOptionSelect}
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
              onChange={handleTermsAgreedChange}
              required
            />
            <label htmlFor="" className="ml-2 ">
              Agree to terms
            </label>
          </div>
          <button className=" border py-1 px-4 bg-indigo-500 text-white rounded-md mt-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
