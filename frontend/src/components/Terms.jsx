import React from 'react';
import { useTranslation } from 'react-i18next';

function TermsAndConditions() {
  const { t } = useTranslation();

  return (
    <div className="w-full pt-20 md:pt-[100px] pb-8">
      {/* Header Section */}
      <div className="w-full px-4 lg:px-14 md:pt-5 md:px-10 lg:pb-8 border-b border-gray-400 md:pb-5 pb-5 pt-4">
        <h2 className="text-4xl lg:text-7xl md:text-6xl text-[#502380] tracking-tight font-bold uppercase">
          Terms & Conditions
        </h2>
      </div>

      {/* Content Section */}
      <div className="mt-8 px-4 lg:px-14 md:px-10">
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          {/* Introduction */}
          <div className="space-y-4">
            <p className="text-gray-700">
              By placing an order with Starktech Ventures Pvt.Ltd., you are agreeing to be bound by the following terms and conditions of sale. Please read these Terms carefully before placing your order.
            </p>
          </div>

          {/* Order Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#502380]">Order Acceptance and Cancellation</h3>
            <p className="text-gray-700">
              Your receipt of an electronic or other forms of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. Starktech Ventures Pvt. Ltd. reserves the right at any time after receipt of your order to accept or decline your order for any reason. If we cancel an order, it will be without charge to you.
            </p>
          </div>

          {/* Pricing Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#502380]">Pricing and Payment</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Prices for our products are subject to change without notice.</li>
              <li>We reserve the right to correct any errors or omissions in the pricing of our products.</li>
              <li>All prices are in Indian Rupees.</li>
              <li>Payment must be made in full at the time of placing the order.</li>
              <li>We accept payment by credit card or bank transfer.</li>
            </ul>
          </div>

          {/* Shipping Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#502380]">Shipping and Delivery</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Shipping and delivery charges will be added to your order total.</li>
              <li>We will provide an estimated delivery date.</li>
              <li>Risk of loss and title for all products pass to you up on delivery.</li>
            </ul>
          </div>

          {/* Warranty Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#502380]">Warranty</h3>
            <p className="text-gray-700">
              Starktech Ventures Pvt.Ltd. warrants that the products it sells will be free from defects in Electric Motor for a period of one year from the date of purchase of product. This warranty does not cover damages caused by misuse, abuse, accident, or modification of the product. If a product is found to be defective within the warranty period, Starktech Ventures Pvt.Ltd. will repair or replace the product at its discretion.
            </p>
          </div>

          {/* Returns Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#502380]">Returns and Refunds</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Starktech Ventures Pvt.Ltd. will accept returns of products that are in new and unused condition within 7 days of the date of purchase.</li>
              <li>Products must be returned in the original packaging, along with all accessories and documentation.</li>
              <li>In case return of product, the cost of shipping charges is applicable to the customers.</li>
              <li>Upon receipt of a returned product, Starktech Ventures Pvt.Ltd. will issue a refund for the purchase price of the product, minus any applicable restocking fees.</li>
              <li>The refund amount will be credited in customer's bank account within 15 working days.</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-[#502380]">Contact Us</h3>
            <p className="text-gray-700">
              If you have any questions about the Terms or the products, please contact us at:
            </p>
            <ul className="list-none space-y-1 text-gray-700">
              <li>Email: starktechindia.office@gmail.com</li>
              <li>Website: www.starktechventures.com</li>
              <li>Phone: +91 7620864615</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;