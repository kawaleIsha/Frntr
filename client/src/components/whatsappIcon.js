// WhatsAppIcon.js

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppIcon = () => {
  const openWhatsApp = () => {
    // Replace '1234567890' with the actual WhatsApp number
    const phoneNumber = '9405643702';
    window.open(`https://wa.me/${phoneNumber}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#25d366',
        color: '#fff',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        zIndex: '1000',
      }}
      onClick={openWhatsApp}
    >
      <FaWhatsapp size={30} />
    </div>
  );
};

export default WhatsAppIcon;
