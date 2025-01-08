import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed md:bottom-8 bottom-4 right-4 md:right-8 bg-green-500 hover:bg-green-600 text-white rounded-full p-[10px] shadow-lg transition-all duration-300 ease-in-out z-50 flex items-center justify-center cursor-pointer"
      aria-label="Contact us on WhatsApp"
    >
      <FaWhatsapp className="w-10 h-10" />
    </a>
  );
};

export default WhatsAppButton;