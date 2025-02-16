import React, { useState } from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { toast } from 'react-toastify';
import api from './api';

const ContactUs = () => {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiry_type: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const validateForm = () => {
    // Name validation (at least 2 characters, only letters and spaces)
    if (!/^[A-Za-z\s]{2,}$/.test(formData.name.trim())) {
      toast.error('Please enter a valid name (minimum 2 characters, letters only)');
      return false;
    }

    // Phone validation (must be 10 digits)
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      toast.error('Please enter a valid phone number (10 digits)');
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // Inquiry type validation
    if (!formData.inquiry_type) {
      toast.error('Please select an inquiry type');
      return false;
    }

    // Subject validation (minimum 5 characters)
    if (formData.subject.trim().length < 5) {
      toast.error('Subject must be at least 5 characters long');
      return false;
    }

    // Message validation (minimum 20 characters)
    if (formData.message.trim().length < 20) {
      toast.error('Message must be at least 20 characters long');
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return; // Prevent duplicate submissions
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ loading: true, success: false, error: null });

    try {
      await axios.post(`${api}contacts/`, formData);
      
      setFormStatus({
        loading: false,
        success: true,
        error: null
      });

      toast.success('Message sent successfully!');

      // Reset form after successful submission
      setTimeout(() => {
        setShowForm(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          inquiry_type: '',
          subject: '',
          message: ''
        });

        setFormStatus({
          loading: false,
          success: false,
          error: null
        });
        setIsSubmitting(false);
      }, 2000);
    } catch (err) {
      let errorMessage = 'Failed to submit form. Please try again.';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          errorMessage = Object.entries(err.response.data)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      }

      setFormStatus({
        loading: false,
        success: false,
        error: errorMessage
      });

      toast.error(errorMessage);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full pt-24 lg:pt-[120px] md:pt-[120px] md:pb-0 pb-8">
      {/* Title Section */}
      <div className="w-full px-4 lg:px-14 md:px-10 border-b border-gray-400 lg:pb-8 md:pb-5 pb-4">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
          {t("contact.contact_us_title")}
        </h2>
      </div>
      
      <div className="px-4 md:px-10 lg:px-14 pb-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {/* Left Section */}
        <div className='px-2'>
          <p className="mt-8 mb-6 lg:mb-8 text-sm lg:text-xl md:text-base capitalize font-light">
            {t("contact.contact_us_description")}
          </p>
          <div className='lg:mb-8'>
            <h3 className="uppercase text-lg lg:text-3xl md:text-2xl font-semibold lg:mb-6 mb-4">
              {t("contact.contact_details")}
            </h3>
            <div className="flex flex-col space-y-3 lg:space-y-4">
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-lg lg:text-2xl text-gray-600" />
                <p className="text-sm lg:text-xl md:text-base text-[#502380] hover:underline font-light">
                <a href="mailto:director@starktechventures.com">{t("contact.email")}</a>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <FaPhoneAlt className="text-lg lg:text-2xl text-gray-600" />
                <p className="text-sm lg:text-xl text-[#502380] hover:underline capitalize md:text-base font-light">
                <a href="tel:7620864615">{t("contact.phone")}</a>
                </p>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-3xl text-gray-600" />
                <p className="text-sm lg:text-xl capitalize md:text-base font-light">
                  {t("contact.address")}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 mt-5 bg-[#502380] text-white rounded-full font-light uppercase hover:bg-[#3b1a60] transition-colors duration-300"
          >
            {t("contact.submit_button")}
          </button>
        </div>

        {/* Right Section */}
        <div className="md:mt-8">
          <h3 className="uppercase lg:text-3xl text-lg md:text-2xl font-semibold mb-4">
            {t("contact.visit_us")}
          </h3>
          <div className="w-full flex items-center justify-center lg:h-[400px] h-60">
            <iframe
              className="w-80 lg:w-[80%] lg:h-[400px] h-72 pt-8 md:py-8"
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d655.8077509884325!2d74.2809060083107!3d17.060580320028464!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1753c4e06b1bb%3A0x52d0e209197483ae!2sStarktech%20Ventures%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1734764280701!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full lg:mt-[90px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">Contact Form</h3>
              <button 
                onClick={() => setShowForm(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Full Name *"
                  required
                  className="p-2 border rounded w-full"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  required
                  className="p-2 border rounded w-full"
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email *"
                required
                className="w-full p-2 border rounded"
              />

              <select
                name="inquiry_type"
                value={formData.inquiry_type}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded"
              >
                <option value="">Select Inquiry Type *</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales Inquiry</option>
                <option value="support">Technical Support</option>
                <option value="demo">Demo Request</option>
                <option value="complaint">Complaint</option>
                <option value="feedback">Feedback</option>
              </select>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Subject *"
                required
                className="w-full p-2 border rounded"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Message *"
                required
                className="w-full p-2 border rounded h-32"
              />

              <button
                type="submit"
                disabled={isSubmitting || formStatus.loading}
                className="w-full py-3 bg-[#502380] text-white rounded hover:bg-[#3b1a60] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
              >
                {formStatus.loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;