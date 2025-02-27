import React, { useState } from "react";
import axios from "axios";

export default function ParentGuardian() {
  const [formData, setFormData] = useState({
    name: "",
    sign: "",
    date: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
    setSuccessMessage(""); // Clear success message on input change
  };

  // Validate Fields Before Submission
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.sign.trim()) newErrors.sign = "Signature is required";
    if (!formData.date) newErrors.date = "Date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await axios.post("http://localhost:8080/api/form/add-parents", formData);

      // Show success message at bottom instead of alert
      setSuccessMessage("✅ Success! Data has been submitted successfully.");

      // Reset form fields after successful submission
      setFormData({ name: "", sign: "", date: "" });
    } catch (error) {
      setSuccessMessage("❌ An error occurred. Please try again.");
    }
  };

  return (
    <div className="container mt-[200px]">
      <h2 className="text-center mb-10 font-bold text-2xl">
        Parent/Guardian (Required for Model Under 18)
      </h2>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Full Name
          </label>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Signature */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="sign"
            id="sign"
            value={formData.sign}
            onChange={handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.sign ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label htmlFor="sign" className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Signature
          </label>
          {errors.sign && <p className="text-red-500 text-xs mt-1">{errors.sign}</p>}
        </div>

        {/* Date */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.date ? "border-red-500" : "border-gray-300"
            } appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label htmlFor="date" className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Date
          </label>
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>

        {/* Success Message */}
        {successMessage && (
          <p className="text-green-500 text-center mt-4 font-semibold">{successMessage}</p>
        )}
      </form>
    </div>
  );
}
