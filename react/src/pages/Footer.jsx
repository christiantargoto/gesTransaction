// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">
        &copy; {new Date().getFullYear()} Chrislink - Tous droits réservés.
        <br />
        Application Fullstack Laravel-React (API Rest) Développée par TARGOTO CHRISTIAN
      </p>
      
    </footer>
  );
};

export default Footer;
