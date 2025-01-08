import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsCaretLeftFill } from "react-icons/bs";
import api from '../api';

function Details({ product: initialProduct, onBack }) {
  // State management
  const [product, setProduct] = useState(initialProduct);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showTechnical, setShowTechnical] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showCustomers, setShowCustomers] = useState(false);

  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    alternate_phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    quantity: 1,
    product: initialProduct.id,
    unit_price: initialProduct.price,
  });

  // Booking status state
  const [bookingStatus, setBookingStatus] = useState({
    loading: false,
    success: false,
    error: null
  });

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const userLang = sessionStorage.getItem('currentLanguage') || 'en';
        const response = await axios.get(
          `https://${api}products/${initialProduct.id}/?lang=${userLang}`
        );
        setProduct(response.data);
        setMainImage(response.data.main_image);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [initialProduct.id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingStatus({ loading: true, success: false, error: null });
  
    try {
      const response = await axios.post(`https://${api}bookings/`, bookingForm, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      setBookingStatus({
        loading: false,
        success: true,
        error: null
      });
  
      // Reset form after successful submission
      setTimeout(() => {
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          alternate_phone: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          quantity: 1,
          product: initialProduct.id,
          unit_price: initialProduct.price
        });
        setShowBooking(false);
        setBookingStatus({ loading: false, success: false, error: null });
      }, 2000);
    } catch (err) {
      let errorMessage = 'Failed to create booking. Please try again.';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'object') {
          errorMessage = Object.entries(err.response.data)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ');
        } else if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        }
      }
      
      setBookingStatus({
        loading: false,
        success: false,
        error: errorMessage
      });
    }
  };

  // Handle image swap
  const handleImageSwap = (newImage) => {
    setMainImage(newImage);
  };

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="w-full h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="w-full bg-white mt-10 lg:pt-[110px] lg:mt-0 md:mt-20 pb-8 pt-10 md:px-10 lg:px-14 px-4">
      {/* Back Button */}
      <button 
        onClick={onBack}
        className="flex text-lg md:text-xl font-light capitalize items-center gap-2 mb-6 text-black"
      >
        <BsCaretLeftFill className="w-8 h-8" />
        Back to Products
      </button>

      {/* Product Images Section */}
      <div className="grid lg:px-10 lg:grid-cols-3 md:grid-cols-[53%,48%] gap-10 md:gap-8 mb-12 mx-auto">
        <div className="space-y-5 lg:space-y-0 lg:space-x-8 lg:flex lg:flex-row place-content-evenly lg:col-span-2 lg:h-[430px]">
          <div className="w-full lg:w-[70%] h-[300px] lg:h-[100%] overflow-hidden rounded-lg">
            <img
              src={mainImage || "/api/placeholder/800/600"}
              alt={product.name_display}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid lg:grid-cols-1 grid-cols-4 gap-4 place-content-between lg:gap-y-0">
            {[product.main_image, ...(product.additional_images || []).map(img => img.image)].map((img, index) => (
              <img
                key={index}
                src={img || "/api/placeholder/200/150"}
                alt={`${product.name_display} view ${index + 1}`}
                className="w-full h-16 lg:w-full lg:h-24 object-cover lg:rounded-md rounded-lg cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => handleImageSwap(img)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4 md:space-y-0 place-items-start lg:place-content-end place-content-end">
          <h1 className="text-4xl font-bold text-[#502380]">{product.name_display}</h1>
          <h2 className="text-2xl md:text-xl lg:text-2xl text-gray-700 md:pb-4 lg:pb-0">{product.model_display}</h2>

          <div className="text-3xl md:pb-2 pb-3 font-bold text-[#502380]">
            ₹{product.price}
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-2 md:w-[82%] lg:w-full">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowBooking(!showBooking)}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg bg-[#3b1a60] text-white hover:bg-white hover:text-black transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={() => setShowTechnical(!showTechnical)}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg hover:bg-[#3b1a60] hover:text-white transition-colors"
              >
                Technical Details
              </button>
            </div>
            
            <div className="flex flex-col gap-3">
              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg hover:bg-[#3b1a60] hover:text-white transition-colors"
              >
                Features & Benefits
              </button>
              <button
                onClick={() => setShowCustomers(!showCustomers)}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg hover:bg-[#3b1a60] hover:text-white transition-colors"
              >
                Happy Customers
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 lg:pl-16 md:px-0 -mt-6">
        <h1 className="text-lg md:text-xl lg:py-2">Description : </h1>
        <p className="text-gray-600 text-sm md:text-base font-light">{product.description_display}</p>
      </div>

      {/* YouTube Video Section */}
      {product.yt_link && (
        <div className="my-12">
          <h3 className="text-2xl font-semibold text-left lg:pl-16 lg:mb-10 mb-6">
            {product.yt_tagline_display}
          </h3>
          <div className="aspect-w-16 aspect-h-9">
            <iframe 
              src={product.yt_link}
              title="Product Video"
              className="w-full h-[250px] md:h-[350px] md:w-[80%] lg:w-[70%] lg:h-[70vh] rounded-xl lg:mx-auto md:mx-auto"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {showBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full lg:mt-[90px] max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">Book Your Product</h3>
              <button onClick={() => setShowBooking(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="text-center mb-6">
              <h4 className="text-xl mb-2">Book {product.name_display}</h4>
              <h5 className="text-lg font-semibold text-[#502380]">
                {product.model_display} @ ₹{product.price}
              </h5>
              <p className="text-sm text-gray-600 mt-2">*Including taxes & accessories (Delivery Charges Extra)</p>
              <p className="text-sm text-gray-600">*{product.warrenty} Warranty. T&C Apply</p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={bookingForm.name}
                  onChange={handleInputChange}
                  placeholder="Name *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="tel"
                  name="alternate_phone"
                  value={bookingForm.alternate_phone}
                  onChange={handleInputChange}
                  placeholder="Alternate Phone"
                  className="p-2 border rounded"
                />
              </div>

              {/* Address Information */}
              <textarea
                name="address"
                value={bookingForm.address}
                onChange={handleInputChange}
                placeholder="Address *"
                required
                className="w-full p-2 border rounded h-24"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  value={bookingForm.city}
                  onChange={handleInputChange}
                  placeholder="City *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="state"
                  value={bookingForm.state}
                  onChange={handleInputChange}
                  placeholder="State *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="text"
                  name="pincode"
                  value={bookingForm.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode *"
                  required
                  className="p-2 border rounded"
                />
                <input
                  type="number"
                  name="quantity"
                  value={bookingForm.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity *"
                  min="1"
                  required
                  className="p-2 border rounded"
                />
              </div>

              {/* Form Status Messages */}
              {bookingStatus.error && (
                <div className="text-red-500 text-sm">{bookingStatus.error}</div>
              )}
              {bookingStatus.success && (
                <div className="text-green-500 text-sm">Booking created successfully!</div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={bookingStatus.loading}
                className="w-full py-3 bg-[#502380] text-white rounded hover:bg-[#3b1a60] disabled:bg-gray-400"
              >
                {bookingStatus.loading ? 'Processing...' : 'Submit Booking Request'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Technical Details Modal */}
      {showTechnical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#502380]">
                {product.technical_details_brand_name_display}
              </h3>
              <button onClick={() => setShowTechnical(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="mb-6">
              <h4 className="text-xl mb-4">{product.name_display}</h4>
              <p className="mb-2">Model Name: {product.technical_details_model_name_display}</p>
              <p className="mb-2">Brand Name: {product.technical_details_brand_name_display}</p>
              <p className="mb-4">Application: {product.technical_details_application_display}</p>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {product.technical_details_display?.description?.map((desc, index) => (
                  <tr key={index}>
                    <td className="border p-2">{desc}</td>
                    <td className="border p-2">{product.technical_details_display.details[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Features Modal */}
      {showFeatures && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">Features & Benefits</h3>
              <button onClick={() => setShowFeatures(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.feature_images?.map((image, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xl font-semibold">{image.caption_display}</h4>
                  <img 
                    src={image.image || "/api/placeholder/400/300"} 
                    alt={image.caption_display}
                    className="w-full h-auto rounded-lg"
                  />
                  <p className="text-sm text-gray-600">{image.type}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Happy Customers Modal */}
      {showCustomers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">Happy Customers</h3>
              <button onClick={() => setShowCustomers(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl text-center">{product.demo_tagline_display}</h4>
              {product.demo_yt_link && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe 
                    src={product.demo_yt_link}
                    title="Customer Testimonial"
                    className="w-full h-[250px] rounded-2xl"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;