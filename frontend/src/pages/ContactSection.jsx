import React, { useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojpobop';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Collaboration',
    message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    try {
      setStatus('loading');
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      setStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: 'Collaboration',
        message: ''
      });
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section-block section-contact reveal-block depth-shift" data-depth="6">
      <div className="container contact-grid">
        <div className="section-head contact-head">
          <p>Let's Connect</p>
          <h2>Have a project in mind? Let's build it together.</h2>
          <span>I am open to full-stack roles, internships, and freelance collaborations.</span>

          <div className="contact-meta">
            <div>
              <h3>Email</h3>
              <a href="mailto:subhamsadangi@gmail.com">subhamsadangi@gmail.com</a>
            </div>
            <div>
              <h3>Location</h3>
              <p>Odisha, India</p>
            </div>
            <div>
              <h3>Availability</h3>
              <p>Open to internships and project collaboration.</p>
            </div>
          </div>
        </div>

        <form className="contact-form hover-target" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your full name" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />

          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" value={formData.subject} onChange={handleChange}>
            <option value="Collaboration">Collaboration</option>
            <option value="Internship Opportunity">Internship Opportunity</option>
            <option value="Freelance Project">Freelance Project</option>
          </select>

          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Share your idea, timeline, and goals." />

          <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Sending...' : 'Send message'}
          </button>

          {status === 'success' && <p className="form-feedback success">Message sent successfully.</p>}
          {status === 'error' && <p className="form-feedback error">Please complete all fields and try again.</p>}
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
