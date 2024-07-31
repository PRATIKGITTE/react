import React, { useState, useEffect } from 'react';
import axios from 'axios';


const LoginForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [submittedData, setSubmittedData] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/submit', formData);
      setMessage(response.data);
      setFormData({ name: '', email: '', mobile: '' });
      fetchSubmissions();
    } catch (error) {
      console.error('There was an error submitting the form!', error);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/submissions');
      setSubmittedData(response.data);
    } catch (error) {
      console.error('There was an error fetching the submissions!', error);
    }
  };

  return (
    <div className="form-container">
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p>{message}</p>}
      {submittedData.length > 0 && (
        <div className="submitted-data">
          <h3>Submitted Data</h3>
          {submittedData.map((data, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {data.name}</p>
              <p><strong>Email:</strong> {data.email}</p>
              <p><strong>Mobile Number:</strong> {data.mobile}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoginForm;
