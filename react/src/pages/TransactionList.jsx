import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    numero_compte: '',
    type: '',
    montant: ''
  });
  const [nomClient, setNomClient] = useState(''); // état séparé pour nom client affiché uniquement
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  const fetchTransactions = () => {
    axios.get('http://localhost:8000/api/transactions')
      .then(response => {
        // Tri décroissant par id
        const sortedTransactions = response.data.sort((a, b) => b.id - a.id);
        setTransactions(sortedTransactions);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur de chargement des transactions');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'numero_compte') {
      if (value.length > 0) {
        // Appeler API pour récupérer nom client
        axios.get(`http://localhost:8000/api/client-nom/${value}`)
          .then(response => {
            setNomClient(response.data.nom_client || '');
          })
          .catch(() => {
            setNomClient('');
          });
      } else {
        setNomClient('');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    axios.post('http://localhost:8000/api/transactions', formData)
      .then(() => {
        setMessage('Transaction enregistrée avec succès');
        setFormData({ numero_compte: '', type: '', montant: '' });
        setNomClient('');
        fetchTransactions();
        setCurrentPage(1);
      })
      .catch(() => {
        setError('Erreur lors de l’enregistrement');
      });
  };

  // Pagination logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="container mt-4">
      <h2>Nouvelle Transaction</h2>
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <label>Numéro de Compte</label>
            <input
              type="text"
              className="form-control"
              name="numero_compte"
              value={formData.numero_compte}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label>Nom du Client</label>
            <input
              type="text"
              className="form-control"
              value={nomClient}
              readOnly
              placeholder="Nom du client s'affichera ici"
            />
          </div>

          <div className="col-md-4">
            <label>Type transaction</label>
            <select
              className="form-control"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">--choisir--</option>
              <option value="versement">Versement</option>
              <option value="retrait">Retrait</option>
            </select>
          </div>

          <div className="col-md-4 mt-3">
            <label>Montant</label>
            <input
              type="number"
              step="0.01"
              className="form-control"
              name="montant"
              value={formData.montant}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-3">Enregistrer</button>
      </form>

      <h2>Liste des Transactions</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Numéro de Compte</th>
                <th>Type</th>
                <th>Montant</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((tx, index) => (
                <tr key={tx.id} className={index % 2 === 0 ? 'table-light' : 'table-secondary'}>
                  <td>{tx.id}</td>
                  <td>{tx.numero_compte}</td>
                  <td>{tx.type}</td>
                  <td>{parseFloat(tx.montant).toLocaleString('fr-FR', { minimumFractionDigits: 2 })} FCFA</td>
                  <td>{new Date(tx.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="d-flex justify-content-between">
            <button
              className="btn btn-outline-primary"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              Précédent
            </button>
            <span className="align-self-center">
              Page {currentPage} sur {totalPages}
            </span>
            <button
              className="btn btn-outline-primary"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              Suivant
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionList;
