// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">Mon Application</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Enregistrement des Clients</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/recherche">Recherche d'un Client</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/transaction">Effectuer une Transaction</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/recherchet">Verifier une Transaction</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/solde">Solde Client</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
