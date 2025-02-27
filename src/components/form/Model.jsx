import React, { useState } from 'react';
import axios from 'axios';

export default function Model() {
  const [formData, setFormData] = useState({
    name: '',
    sign: '',
    date: ''
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // Track success or error messages

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Remove error when user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.sign.trim()) newErrors.sign = 'Signature is required';
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setIsSuccess(false); // Indicate an error
      return; // Stop if validation fails
    }

    try {
      const response = await axios.post('http://localhost:8080/api/form/add-model', formData);
      setMessage(response.data.message);
      setIsSuccess(true); // Indicate success
      setFormData({ name: '', sign: '', date: '' }); // Reset form
      setErrors({}); // Clear errors after successful submission
    } catch (error) {
      setMessage(error.response?.data?.error || 'Error submitting data');
      setIsSuccess(false); // Indicate an error
    }
  };

  return (
    <div className="container mt-[200px]">
      <h2 className="text-center mb-10 font-bold text-2xl">Model (Minor)</h2>
      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        
        {/* Name Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="text" name="name" id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " value={formData.name} onChange={handleChange}
          />
          <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">Full Name*</label>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Signature Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="text" name="sign" id="sign"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " value={formData.sign} onChange={handleChange}
          />
          <label htmlFor="sign" className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">Signature*</label>
          {errors.sign && <p className="text-red-500 text-sm mt-1">{errors.sign}</p>}
        </div>

        {/* Date Input */}
        <div className="relative z-0 w-full mb-5 group">
          <input 
            type="date" name="date" id="date"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " value={formData.date} onChange={handleChange}
          />
          <label htmlFor="date" className="absolute text-sm text-gray-500 dark:text-gray-400 transform -translate-y-6 scale-75 top-3 -z-10 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600">Date*</label>
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
          Submit
        </button>
      </form>

      {/* Display success or error message */}
      {message && (
        <p className={`text-center mt-4 ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
