// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsTable from './pages/ClientsTable';
import RechercheClient from './pages/RechercheClient';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import TransactionList from './pages/TransactionList';
import TransactionSearch from './pages/TransactionSearch';
import Solde from './pages/Solde';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="min-vh-100"> {/* Contenu principal */}
        <Routes>
          <Route path="/" element={<ClientsTable />} />
          <Route path="/recherche" element={<RechercheClient />} />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/recherchet" element={<TransactionSearch />} />
          <Route path="/solde" element={<Solde />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
