import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsCaretLeftFill } from "react-icons/bs";
import { GrCircleAlert } from "react-icons/gr";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import { toast } from 'react-toastify';
import { ImSpinner11 } from "react-icons/im";


function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const initialProduct =
    JSON.parse(localStorage.getItem("selectedProduct")) || null;
  
  // Consolidated state management
  const [state, setState] = useState({
    product: initialProduct,
    loading: true,
    error: null,
    mainImage: initialProduct?.main_image || null,
    modals: {
      booking: false,
      technical: false,
      features: false,
      customers: false,
    },
  });

  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    alternate_phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    quantity: "",
    product: initialProduct?.id || "",
    unit_price: initialProduct?.price || "",
  });

  const [bookingStatus, setBookingStatus] = useState({
    loading: false,
    success: false,
    error: null,
  });

  // Fetch product details - optimized with error handling and cleanup
  useEffect(() => {
    let isSubscribed = true;
    const userLang = sessionStorage.getItem("currentLanguage") || "en";

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${api}products/${id}/?lang=${userLang}`
        );

        if (isSubscribed) {
          setState((prev) => ({
            ...prev,
            product: response.data,
            mainImage: response.data.main_image,
            loading: false,
          }));

          // Update booking form with new product details
          setBookingForm((prev) => ({
            ...prev,
            product: response.data.id,
            unit_price: response.data.price,
          }));
        }
      } catch (err) {
        if (isSubscribed) {
          setState((prev) => ({
            ...prev,
            error: "Failed to fetch product details. Please try again later.",
            loading: false,
          }));
        }
      }
    };

    window.scrollTo(0, 0);
    fetchProductDetails();

    return () => {
      isSubscribed = false;
    };
  }, [id]);

  // Modal handlers consolidated into a single function
  const toggleModal = (modalName) => {
    setState((prev) => ({
      ...prev,
      modals: {
        ...prev.modals,
        [modalName]: !prev.modals[modalName],
      },
    }));
  };
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add this function for image swapping
  const handleImageSwap = (newImage) => {
    setState((prev) => ({
      ...prev,
      mainImage: newImage,
    }));
  };

  // Optimized form submission with better error handling and success feedback
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Disable form submission while processing
    if (bookingStatus.loading) return;
    
    setBookingStatus({ loading: true, success: false, error: null });

    try {
      const response = await axios.post(`${api}bookings/`, bookingForm, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        // Show success toast
        toast.success('Booking submitted successfully! Our team will contact you shortly.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Reset form and close modal
        setBookingForm({
          name: "",
          email: "",
          phone: "",
          alternate_phone: "",
          address: "",
          city: "",
          state: "",
          pincode: "",
          quantity: "",
          product: state.product.id,
          unit_price: state.product.price,
        });
        
        // Close modal and reset status
        toggleModal("booking");
        setBookingStatus({ loading: false, success: false, error: null });
      }
    } catch (err) {
      let errorMessage;
      
      if (err.response?.status === 400) {
        // Handle validation errors
        errorMessage = err.response.data
          ? typeof err.response.data === "object"
            ? Object.entries(err.response.data)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")
            : err.response.data
          : "Please check your input and try again.";
      } else if (err.response?.status === 500) {
        // Handle server errors
        errorMessage = "Server error occurred. Please try again later.";
      } else {
        // Handle other errors
        errorMessage = "Failed to create booking. Please try again.";
      }

      // Show error toast
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setBookingStatus({
        loading: false,
        success: false,
        error: null,
      });
    }
};

  // Loading and error states
  if (state.loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
<ImSpinner11 className="animate-spin text-4xl text-[#502380]" />

      </div>
    );
  }

  if (state.error) {
    return (
      <div className="w-full pt-24 lg:pt-[120px] md:pt-[120px] pb-8 md:px-10 lg:px-14 px-4">
        <button
          onClick={() => navigate("/products")}
          className="flex text-lg md:text-2xl mt-4 md:mt-0 font-light capitalize items-center gap-2 mb-6 text-black"
        >
          <BsCaretLeftFill className="w-8 h-8" />
          Back to Products
        </button>
        <div className="w-full h-64 flex items-center justify-center">
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg max-w-lg mx-4">
            <div className="flex items-center gap-4 mb-3">
              <GrCircleAlert className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-red-700">Error</h3>
            </div>
            <p className="text-red-600">{state.error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }



  const { product, mainImage, modals } = state;

  return (
    <div className="w-full bg-white mt-10 lg:pt-[110px] lg:mt-0 md:mt-20 pb-8 pt-10 md:px-10 lg:px-14 px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        className="flex text-lg md:text-2xl mt-4 md:mt-0 font-light capitalize items-center gap-2 mb-6 text-black"
      >
        <BsCaretLeftFill className="w-8 h-8" />
        Back to Products
      </button>

      {/* Product Images Section */}
      <div className="grid lg:px-10 lg:grid-cols-3 md:grid-cols-[53%,48%] gap-10 md:gap-8 mb-12 mx-auto lg:h-[370px]">
        <div className="space-y-5 lg:space-y-0 lg:space-x-8 lg:flex lg:flex-row place-content-evenly lg:col-span-2 lg:h-[370px]">
          <div className="w-full lg:w-[70%] h-[300px] lg:h-[100%] overflow-hidden rounded-lg border border-gray-600">
            <img
              src={mainImage || "/api/placeholder/800/600"}
              alt={product.name_display}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid lg:grid-cols-1 grid-cols-3 gap-6 md:gap-4 md:place-content-end lg:gap-y-10">
            {[
              product.main_image,
              ...(product.additional_images || []).map((img) => img.image),
            ].map((img, index) => (
              <img
                key={index}
                src={img || "/api/placeholder/200/150"}
                alt={`${product.name_display} view ${index + 1}`}
                className="w-full h-20 lg:w-full lg:h-24 object-cover lg:rounded-md rounded-lg border border-gray-600 cursor-pointer hover:opacity-75 transition-opacity"
                onClick={() => handleImageSwap(img)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 lg:space-y-4 md:space-y-0 place-items-start lg:place-content-evenly place-content-end">
          <h1 className="text-4xl font-bold text-[#502380]">
            {product.name_display}
          </h1>
          <h2 className="text-2xl md:text-xl lg:text-2xl text-gray-700 md:pb-4 lg:pb-0">
            {product.model_display}
          </h2>

          <div className="text-3xl md:pb-0 pb-3 font-bold text-[#502380]">
            ₹{product.price}
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-2 md:w-[82%] lg:w-full">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => toggleModal("booking")}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg bg-[#3b1a60] text-white hover:bg-white hover:text-black transition-colors"
              >
                Book Now
              </button>
              <button
                onClick={() => toggleModal("technical")}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg hover:bg-[#3b1a60] hover:text-white transition-colors"
              >
                Technical Details
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => toggleModal("features")}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg hover:bg-[#3b1a60] hover:text-white transition-colors"
              >
                Features & Benefits
              </button>

              <button
                onClick={() => toggleModal("customers")}
                className="w-full px-5 py-2 border-[1px] border-zinc-400 rounded-full uppercase font-light text-lg hover:bg-[#3b1a60] hover:text-white transition-colors"
              >
                Happy Customers
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-2 lg:pl-16 md:px-0 -mt-6">
        <h1 className="text-xl md:text-2xl lg:py-2">Description : </h1>
        <p className="text-gray-900 text-lg md:text-xl font-light">
          {product.description_display}
        </p>
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

      {/* Modals */}
      {modals.booking && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white mt-6 md:mt-20 p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        {/* Keep the existing header section */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#502380]">Book Your Product</h3>
          <button
            onClick={() => toggleModal("booking")}
            className="text-2xl md:text-3xl font-semibold text-black"
          >
            ✕
          </button>
        </div>

        {/* Keep the existing product info section */}
        <div className="text-center mb-6">
          <h4 className="text-xl mb-2">Book {product.name_display}</h4>
          <h5 className="text-lg font-semibold text-[#502380]">
            {product.model_display} @ ₹{product.price}
          </h5>
          <p className="text-sm text-gray-800 mt-2">
            *Including taxes & accessories (Delivery Charges Extra)
          </p>
          <p className="text-sm text-gray-800">
            *{product.warrenty} Warranty. T&C Apply
          </p>
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
                  className="p-2 border rounded placeholder:text-gray-800"
                />
                <input
                  type="tel"
                  name="phone"
                  value={bookingForm.phone}
                  onChange={handleInputChange}
                  placeholder="Phone *"
                  required
                  className="p-2 border rounded placeholder:text-gray-800"
                />
                <input
                  type="email"
                  name="email"
                  value={bookingForm.email}
                  onChange={handleInputChange}
                  placeholder="Email *"
                  required
                  className="p-2 border rounded placeholder:text-gray-800"
                />
                <input
                  type="tel"
                  name="alternate_phone"
                  value={bookingForm.alternate_phone}
                  onChange={handleInputChange}
                  placeholder="Alternate Phone"
                  className="p-2 border rounded placeholder:text-gray-800"
                />
              </div>

              {/* Address Information */}
              <textarea
                name="address"
                value={bookingForm.address}
                onChange={handleInputChange}
                placeholder="Address *"
                required
                className="w-full p-2 border rounded h-24 placeholder:text-gray-800"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="city"
                  value={bookingForm.city}
                  onChange={handleInputChange}
                  placeholder="City *"
                  required
                  className="p-2 border rounded placeholder:text-gray-800"                />
                <input
                  type="text"
                  name="state"
                  value={bookingForm.state}
                  onChange={handleInputChange}
                  placeholder="State *"
                  required
                  className="p-2 border rounded placeholder:text-gray-800"
                />
                <input
                  type="text"
                  name="pincode"
                  value={bookingForm.pincode}
                  onChange={handleInputChange}
                  placeholder="Pincode *"
                  required
                  className="p-2 border rounded placeholder:text-gray-800"
                />
                <input
                  type="number"
                  name="quantity"
                  value={bookingForm.quantity}
                  onChange={handleInputChange}
                  placeholder="Quantity *"
                  min="1"
                  required
                  className="p-2 border rounded placeholder:text-gray-800"
                />
              </div>

              <button
            type="submit"
            disabled={bookingStatus.loading}
            className="w-full py-3 bg-[#502380] text-white rounded hover:bg-[#3b1a60] disabled:bg-gray-400 transition-colors duration-200 ease-in-out"
          >
            {bookingStatus.loading ? (
              <div className="flex items-center justify-center">
             <ImSpinner11 className="animate-spin w-5 h-5 text-[#502380]" />
                Processing...
              </div>
            ) : (
              "Submit Booking Request"
            )}
          </button>
        </form>
      </div>
    </div>
  )}
     

      {/* Technical Details Modal */}
      {state.modals.technical && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white mt-6  p-8 max-w-4xl w-full max-h-[80vh] overflow-y-auto md:mt-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-[#502380]">
                {product.technical_details_brand_name_display}
              </h3>
              <button
                onClick={() => toggleModal("technical")}
                className="md:text-3xl text-2xl  font-semibold text-black"
              >
                ✕
              </button>
            </div>
            <div className="mb-6 ">
              <h4 className="text-xl mb-4">{product.name_display}</h4>
              <p className="mb-2">
                <span className="md:text-xl font-semibold">Model Name : </span>{" "}
                {product.technical_details_model_name_display}
              </p>
              <p className="mb-2">
                <span className="md:text-xl font-semibold">Brand Name : </span>{" "}
                {product.technical_details_brand_name_display}
              </p>
              <p className="mb-4">
                <span className="md:text-xl font-semibold">Application : </span>
                {product.technical_details_application_display}
              </p>
            </div>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Description</th>
                  <th className="border p-2 text-left">Details</th>
                </tr>
              </thead>
              <tbody>
                {product.technical_details_display?.description?.map(
                  (desc, index) => (
                    <tr key={index}>
                      <td className="border p-2">{desc}</td>
                      <td className="border p-2">
                        {product.technical_details_display.details[index]}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Features Modal */}
      {state.modals.features && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white mt-6 p-8 max-w-4xl w-full  max-h-[80vh] overflow-y-auto lg:mt-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">
                Features & Benefits
              </h3>
              <button
                onClick={() => toggleModal("features")}
                className="md:text-3xl text-2xl  font-semibold text-black"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.feature_images?.map((image, index) => (
                <div key={index} className="space-y-4">
                  <h4 className="text-xl font-semibold">
                    {image.caption_display}
                  </h4>
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
      {state.modals.customers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white mt-6 p-8 max-w-4xl w-full  max-h-[80vh] overflow-y-auto lg:mt-20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#502380]">
                Happy Customers
              </h3>
              <button
                onClick={() => toggleModal("customers")}
                className="md:text-3xl text-2xl  font-semibold text-black"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <h4 className="text-xl text-center">
                {product.demo_tagline_display}
              </h4>
              {product.demo_yt_link && (
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={product.demo_yt_link}
                    title="Customer Testimonial"
                    className="w-full rounded-xl h-[200px] md:h-[400px]"
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
