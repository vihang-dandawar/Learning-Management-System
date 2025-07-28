import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {sendMessage} from '../../services/Userservice';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    mobileNum: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const validateForm = () => {
  const { name, email, mobileNum, subject, message } = formData;
  if (!name || !email || !mobileNum || !subject || !message) {
    alert("All fields are required.");
    return false;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Enter a valid email.");
    return false;
  }
  if (!/^\d{10}$/.test(mobileNum)) {
    alert("Enter a 10-digit mobile number.");
    return false;
  }
  return true;
};


 





  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!validateForm()) return;
    try {
      const response = await sendMessage(formData);
      console.log('Message sent successfully:', response.data);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message.');
    }
  };

  return (
    <>
      <section className="inner-banner py-5 bg-light">
        <div className="container text-center pt-5 pb-4">
          <h4 className="inner-text-title">Contact Us</h4>
          <ul className="list-inline">
            <li className="list-inline-item"><a href="/home">Home</a></li>
            <li className="list-inline-item text-muted"><i className="fas fa-angle-right mx-2"></i>Contact Us</li>
          </ul>
        </div>
      </section>

      <section className="w3l-contact py-5" id="contact">
        <div className="container py-md-5 py-4">
          <div className="text-center mx-auto mb-md-5 mb-4" style={{ maxWidth: '500px' }}>
            <p className="text-uppercase text-primary">Get In Touch</p>
            <h3 className="title-style">Contact Us</h3>
          </div>
          <div className="row contact-block">
            <div className="col-md-7">
              <form className="p-4 rounded shadow bg-white" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Your Name</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mobile Number</label>
                  <input type="text" name="mobileNum" className="form-control" value={formData.mobileNum} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input type="text" name="subject" className="form-control" value={formData.subject} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea name="message" className="form-control" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <div className="text-start">
                  <button type="submit" className="btn btn-primary px-4">Send Message</button>
                </div>
              </form>
            </div>
            <div className="col-md-5 ps-lg-5 mt-md-0 mt-5">
              <div className="bg-white p-4 rounded shadow">
                <div className="mb-4">
                  <h6><i className="fas fa-building me-2 text-primary"></i>School Address</h6>
                  <p>Eazy School, 10001, 5th Avenue, #06 lane street, NY - 10017.</p>
                </div>
                <div className="mb-4">
                  <h6><i className="fas fa-phone-alt me-2 text-primary"></i>Call Us</h6>
                  <p><a href="tel:+1(21) 234 4567">+1(21) 673 4587</a></p>
                </div>
                <div className="mb-4">
                  <h6><i className="fas fa-envelope-open-text me-2 text-primary"></i>Email Us</h6>
                  <p><a href="mailto:info@eazyschool.com">info@eazyschool.com</a></p>
                </div>
                <div>
                  <h6><i className="fas fa-headphones-alt me-2 text-primary"></i>Customer Support</h6>
                  <p><a href="mailto:support@eazyschool.com">support@eazyschool.com</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830921454!2d-74.11976369744556!3d40.69766374856529"
          width="100%"
          height="400"
          frameBorder="0"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Eazy School Location"
        ></iframe>
      </div>
    </>
  );
};

export default Contact;
