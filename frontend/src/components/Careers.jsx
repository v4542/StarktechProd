import React, { useState, useEffect } from 'react';
import axios from 'axios';
import career from '.././assets/careers/career.jpg';
import { useTranslation } from 'react-i18next';
import { GrCircleAlert } from "react-icons/gr";
import api from './api';

function Careers() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    phone: '',
    address: '',
    position: '',
    skills: '',
    education_level: '',
    years_experience: '',
    additional_info: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setFormData(prev => ({
      ...prev,
      position: job.title_display
    }));
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });
  
    try {
      await axios.post(`https://${api}job-applications/`, formData);
  
      setFormStatus({
        loading: false,
        success: true,
        error: null
      });
  
      setTimeout(() => {
        setShowForm(false);
        setSelectedJob(null);
        setFormData({
          first_name: '',
          last_name: '',
          email: '',
          gender: '',
          phone: '',
          address: '',
          position: '',
          skills: '',
          education_level: '',
          years_experience: '',
          additional_info: ''
        });
  
        setFormStatus({
          loading: false,
          success: false,
          error: null
        });
      }, 2000);
    } catch (err) {
      let errorMessage = 'Failed to submit application. Please try again.';
  
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
    }
  };

  useEffect(() => {
    const fetchJobOpenings = async () => {
      try {
        const userLang = sessionStorage.getItem('currentLanguage') || 'en';
        const response = await axios.get(`https://${api}job-openings/?lang=${userLang}`);
        setJobOpenings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch job openings. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobOpenings();
  }, []);

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedJob(null);
    setFormData(prev => ({
      ...prev,
      position: ''
    }));
    setFormStatus({
      loading: false,
      success: false,
      error: null
    });
  };

  const renderHeader = () => (
    <>
      <div className="w-full px-4 lg:px-14 md:px-10 lg:pb-8 border-b border-gray-400 md:pb-5 py-4">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
          {t("careers.careers_title")}
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row px-4 lg:px-14 md:px-10 pt-8 gap-8">
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-[3.5vw] leading-tight tracking-tight">
            {t("careers.careers_subtitle_1")}
          </h1>
          <h1 className="text-3xl md:text-[3.5vw] leading-tight tracking-tight">
            {t("careers.careers_subtitle_2")}
          </h1>
          <div className="space-y-2">
            <h1 className="text-2xl md:text-[2.5vw] text-[#502380]">#JoinWithUs</h1>
            <h1 className="text-2xl md:text-[2.5vw] text-[#502380]">#IStark</h1>
          </div>
        </div>
        <div className="md:w-1/2">
          <img 
            className="w-full h-[250px] md:h-[400px] object-cover rounded-lg shadow-lg" 
            src={career} 
            alt="Careers at IStark" 
          />
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="w-full pt-20 md:pt-[120px] pb-8">
        {renderHeader()}
        <div className="mt-16 px-4 lg:px-14 md:px-10">
          <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase mb-8">
            {t("careers.open_positions_title")}
          </h2>
          <div className="w-full py-6 h-fit bg-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#502380]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full pt-20 md:pt-[120px] pb-8">
        {renderHeader()}
        <div className="mt-16 px-4 lg:px-14 md:px-10">
          <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase mb-8">
            {t("careers.open_positions_title")}
          </h2>
          <div className="w-full h-fit p-8 bg-white flex items-center justify-center">
            <div className="text-red-600">{error}</div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full pt-20 md:pt-[120px] pb-8">
      {renderHeader()}
      <div className="mt-16 px-4 lg:px-14 md:px-10">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase mb-8">
          {t("careers.open_positions_title")}
        </h2>

        {jobOpenings.length === 0 ? (
          <div className="w-full py-16 bg-gray-50 rounded-xl flex flex-col items-center justify-center text-center">
            <GrCircleAlert className="text-9xl" />
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              No Open Positions
            </h3>
            <p className="text-gray-600 max-w-md">
              We currently don't have any open positions. Please check back later or follow us on social media for updates about new opportunities.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobOpenings.map((job) => (
              <div 
                key={job.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={job.image_url}
                    alt={job.title_display}
                    className="w-full h-64 object-cover"
                  />
                </div>
                
                <div className="p-6 space-y-4">
                  <h3 className="text-2xl font-semibold text-[#502380]">
                    {job.title_display}
                  </h3>
                  <p className="text-gray-700 line-clamp-4">
                    {job.description_display}
                  </p>
                  
                  <button 
                    onClick={() => handleApplyClick(job)}
                    className="w-full px-6 py-3 bg-[#502380] text-white rounded-full 
                      font-medium uppercase hover:bg-[#3b1a60] transition-colors duration-300"
                  >
                    {t("careers.apply_now")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Application Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full lg:mt-[90px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">Job Application</h3>
              <button onClick={handleCloseForm} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>

            {selectedJob && (
              <div className="bg-gray-50 p-4 rounded mb-6">
                <p className=" text-sm md:text-xl text-gray-600">Position: {selectedJob.title_display}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  placeholder="First Name *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  placeholder="Last Name *"
                  required
                  className="p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  required
                  className="p-2 border rounded"
                />
              </div>

              <div className="grid grid-cols-5 gap-4">
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="p-2 border rounded"
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>

                <select
                  name="education_level"
                  value={formData.education_level}
                  onChange={handleInputChange}
                  required
                  className="p-2 border rounded col-span-2"
                >
                  <option value="">Select Education Level *</option>
                  <option value="high_school">12th</option>
                  <option value="polytechnic">Diploma</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="other">Other</option>
                </select>
                <input
                  type="number"
                  name="years_experience"
                  value={formData.years_experience}
                  onChange={handleInputChange}
                  placeholder="Years of Experience *"
                  required
                  min="0"
                  className="p-2 border rounded col-span-2"
                />
              </div>

              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="w-full p-2 border rounded h-24"
              />

                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="Skills and Qualifications *"
                  required
                  className="w-full p-2 border rounded h-24"
                />

                

              <textarea
                name="additional_info"
                value={formData.additional_info}
                onChange={handleInputChange}
                placeholder="Additional Information"
                className="w-full p-2 border rounded h-24"
              />

              {formStatus.error && (
                <div className="text-red-500 text-sm">{formStatus.error}</div>
              )}
              {formStatus.success && (
                <div className="text-green-500 text-sm">Application submitted successfully!</div>
              )}

              <button
                type="submit"
                disabled={formStatus.loading}
                className="w-full py-3 bg-[#502380] text-white rounded hover:bg-[#3b1a60] disabled:bg-gray-400"
              >
                {formStatus.loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Careers;
