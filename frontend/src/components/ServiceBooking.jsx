import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import { toast } from 'react-toastify';
import  api  from './api';

// Import your service images
import s1 from '../assets/services/1.jpg';
import s2 from '../assets/services/2.jpg';
import s3 from '../assets/services/3.jpg';
import s4 from '../assets/services/4.jpg';
import s5 from '../assets/services/5.jpg';
import s6 from '../assets/services/6.jpg';
import s7 from '../assets/services/7.jpg';
import s8 from '../assets/services/8.jpg';
import s9 from '../assets/services/9.jpg';
import s10 from '../assets/services/10.jpg';



const ServiceBooking = () => {
  // Carousel states
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselIntervalRef = useRef(null);

  // Form states
  const [formData, setFormData] = useState({
    farmer_name: '',
    service_name: '',
    poultry_farm_name: '',
    address: '',
    pincode: '',
    mobile: '',
    email: '',
    num_of_birds: '',
    shed_width: '',
    shed_length: '',
    shed_height: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    error: null
  });

  const carouselItems = [
    {
      id: 1,
      image: s1,
      title: "Modern Farming Technology",
      description: "Cutting-edge solutions for modern poultry farming"
   },
    {
      id: 2,
      image: s2,
      title: "Environmental Control (EC) Poultry Farm",
      description: "State-of-the-art climate controlled farming facilities"
    },
    {
      id: 3,
      image: s3,
      title: "Complete Farm Solutions",
      description: "End-to-end farming infrastructure"
    },
    {
      id: 4,
      image: s4,
      title: "Gawran Poultry Farm",
      description: "Traditional farming with modern technology"
    },
    {
      id: 5,
      image: s5,
      title: "Smart Farming Solutions",
      description: "Technology-driven farming for better productivity"
    },
    {
      id: 6,
      image: s6,
      title: "Energy Efficient Equipment",
      description: "Sustainable and eco-friendly farming solutions"
    },
    {
      id: 7,
      image: s7,
      title: "Advanced Farm Management",
      description: "Integrated systems for optimal farm operations"
    }, {
      id: 8,
      image: s9,
      title: "Curtain Installation",
      description: "300 microne side curtain installation with profile Strick"
    }, {
      id: 9,
      image: s10,
      title: "Poultry Shed Structural Development",
      description: "EC poultry shed structural development and fabrication"
    },{
      id: 10,
      image: s8,
      title: "Cooling Pad Installation",
      description: "Cooling pad installation with structural development"
    }
  ];
  const services = [
    "Construction work (civil work)",
    "Fabrication work",
    "All equipment installation",
    "Automation",
    "Customized curtains installation",
    "Consultancy"
  ];

  useEffect(() => {
    if (carouselItems.length === 0) return;

    const startCarouselInterval = () => {
      carouselIntervalRef.current = setInterval(() => {
        setCurrentSlide(prev => 
          prev === carouselItems.length - 1 ? 0 : prev + 1
        );
      }, 5000);
    };

    startCarouselInterval();

    return () => {
      if (carouselIntervalRef.current) {
        clearInterval(carouselIntervalRef.current);
      }
    };
  }, []);

  const handlePrevSlide = () => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    setCurrentSlide(prev => prev === 0 ? carouselItems.length - 1 : prev - 1);
  };

  const handleNextSlide = () => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    setCurrentSlide(prev => prev === carouselItems.length - 1 ? 0 : prev + 1);
  };

  const goToSlide = (index) => {
    if (carouselIntervalRef.current) {
      clearInterval(carouselIntervalRef.current);
    }
    setCurrentSlide(index);
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
    setFormStatus({ loading: true, error: null });

    try {
      await axios.post(`${api}ourservicebookings/`, formData);
      
      toast.success('Service booked successfully!', {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      // Reset form
      setFormData({
        farmer_name: '',
        service_name: '',
        poultry_farm_name: '',
        address: '',
        pincode: '',
        mobile: '',
        email: '',
        num_of_birds: '',
        shed_width: '',
        shed_length: '',
        shed_height: ''
      });
      
      setFormStatus({ loading: false, error: null });
    } catch (err) {
      let errorMessage = 'Failed to book service. Please try again.';

      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          errorMessage = Object.entries(err.response.data)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 1700,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });

      setFormStatus({ loading: false, error: errorMessage });
    }
  };

  return (
    <div className="w-full mt-20 md:mt-[105px]">
      {/* Header Section */}
      <div className="w-full px-4 lg:px-14 md:px-10 lg:pb-8 md:pb-5 py-4">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
          Our Services
        </h2>
      </div>

      {/* Carousel Section */}
      <div className="relative w-[90vw] lg:w-[75vw] h-[28vh] mx-auto border border-gray-700 rounded-xl lg:h-[65vh] shadow-2xl mb-6 sm:mb-8 overflow-hidden group">
        {carouselItems.map((item, index) => (
          <div
            key={item.id}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full bg-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h3 className="text-white text-xl md:text-3xl font-bold">{item.title}</h3>
              <p className="hidden md:block text-white text-xl mt-2">{item.description}</p>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
        >
          <FaChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNextSlide}
          className="absolute right-5 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full opacity-70 hover:opacity-100 transition-opacity"
        >
          <FaChevronRight className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-6' 
                  : 'bg-white/50 w-2 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>


      <div className="px-4 lg:px-14 md:px-10 pt-6 md:pt-14 ">
        <div className="max-w-6xl mx-auto space-y-8 border border-gray-700 bg-gradient-to-tr from-purple-100 to-white rounded-xl p-5 lg:p-12">
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#502380] text-center mb-6">
            STARKTECH VENTURES PRIVATE LIMITED
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            A leading company in Maharashtra manufacturing state-of-the-art technology for advanced and efficient poultry farming.
          </p>
          
          <p className="text-lg md:text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
            We have all types of fabrications and construction works like Open Boiler Poultry Farm, Environmental Control (EC) Poultry Farm, Layer Poultry Farm as well as Gawran Poultry Farm at reasonable rates along with its consultancy.
          </p>
          
          <p className="text-xl md:text-2xl font-semibold text-gray-800 text-center max-w-4xl mx-auto leading-relaxed">
            Starktech Ventures Pvt Ltd is India's leading technology-driven, future-proofing company for the agriculture and poultry industry.
          </p>

          <div className="grid grid-cols-1 text-center md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="bg-white p-6 rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-[#502380] mb-3">Smart Solutions for our Poultry Farm</h3>
              <p className="text-gray-700">Increases productivity, quality and saves time.</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-[#502380] mb-3">Our Equipments</h3>
              <p className="text-gray-700">Are energy saving, environment friendly and farmer friendly.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-[#502380] mb-3">Smart Technology</h3>
              <p className="text-gray-700">Our smart technology has changed the lives of farmers.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-[#502380] mb-3">Farm Management</h3>
              <p className="text-gray-700">Poultry farm management has now become easier and more profitable.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form Section */}
      <div className="my-12 px-4 lg:px-14 md:px-10 bg-gradient-to-b from-purple-100 to-white pt-10">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase mb-8">
          Book A Service
        </h2>

        <div className="bg-white rounded-xl border border-gray-700 shadow-lg p-6 md:p-10 max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="farmer_name"
                value={formData.farmer_name}
                onChange={handleInputChange}
                placeholder="Farmer Name *"
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />

              <select
                name="service_name"
                value={formData.service_name}
                onChange={handleInputChange}
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              >
                <option value="">Select Service *</option>
                {services.map((service, index) => (
                  <option key={index} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="poultry_farm_name"
                value={formData.poultry_farm_name}
                onChange={handleInputChange}
                placeholder="Poultry Farm Name *"
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />

              <input
                type="text"
                name="pincode"
                maxLength={6}
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode *"
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="tel"
                name="mobile"
                maxLength={10}
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Mobile Number *"
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email *"
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />
            </div>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address *"
              required
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] h-24 placeholder:text-gray-800"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <input
                type="number"
                name="num_of_birds"
                value={formData.num_of_birds}
                onChange={handleInputChange}
                placeholder="Number of Birds *"
                required
                min="0"
                pattern="^[1-9]\d*$"

                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />

              <input
                type="number"
                name="shed_width"
                value={formData.shed_width}
                onChange={handleInputChange}
                placeholder="Shed Width (ft) *"
                required
                min="0"

                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />

              <input
                type="number"
                name="shed_length"
                value={formData.shed_length}
                onChange={handleInputChange}
                placeholder="Shed Length (ft) *"
                required
                min="0"
                pattern="^[1-9]\d*$"

                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />

              <input
                type="number"
                name="shed_height"
                value={formData.shed_height}
                onChange={handleInputChange}
                placeholder="Shed Height (ft) *"
                required
                min="0"
                pattern="^[1-9]\d*$"

                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#502380] placeholder:text-gray-800"
              />
            </div>

           

            <button
              type="submit"
              disabled={formStatus.loading}
              className="w-full py-4 bg-[#502380] text-white rounded-full text-lg font-medium 
                hover:bg-[#3b1a60] transition-colors duration-300 disabled:bg-gray-400"
            >
              {formStatus.loading ? 'Submitting...' : 'Book Service'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceBooking;