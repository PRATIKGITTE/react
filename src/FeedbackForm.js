import React, { useState } from 'react';

const FeedbackForm = () => {
  const [formData, setFormData] = useState({ name: '', feedback: '' });
  const [submissions, setSubmissions] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissions([...submissions, formData]);
    setFormData({ name: '', feedback: '' });
  };

  return (
    <div>
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Feedback:</label>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      <h3>Submissions</h3>
      <ul>
        {submissions.map((submission, index) => (
          <li key={index}>
            <strong>{submission.name}:</strong> {submission.feedback}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedbackForm;
