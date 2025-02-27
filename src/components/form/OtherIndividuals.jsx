import React, { useState } from 'react';

export default function OtherIndividuals() {
  const [formData, setFormData] = useState({
    name: '',
    sign: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const validateForm = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name & Role is required.';
    if (!formData.sign.trim()) newErrors.sign = 'Signature is required.';
    if (!formData.date) newErrors.date = 'Date is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    // Clear error when user starts typing
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Stop if validation fails

    try {
      const response = await fetch('http://localhost:8080/api/form/add-individuals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Data submitted successfully!');
        setFormData({ name: '', sign: '', date: '' });
        setErrors({});
      } else {
        setMessage(data.errors ? data.errors[0].msg : 'Submission failed.');
      }
    } catch (error) {
      setMessage('Error submitting form');
    }
  };

  return (
    <div className='container mt-20'>
      <h2 className='text-center mb-10 font-bold text-2xl'>
        Other Individuals (if applicable, e.g., additional team members in footage)
      </h2>

      {message && <p className={`text-center ${message.includes('success') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name & Role
          </label>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Signature Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="sign"
            id="sign"
            value={formData.sign}
            onChange={handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.sign ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            placeholder=" "
          />
          <label htmlFor="sign" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Signature
          </label>
          {errors.sign && <p className="text-red-500 text-xs mt-1">{errors.sign}</p>}
        </div>

        {/* Date Field */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="date"
            name="date"
            id="date"
            value={formData.date}
            onChange={handleChange}
            className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
          />
          <label htmlFor="date" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Date
          </label>
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
