import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // <-- Ajout de l'import

const TransactionSearch = () => {
  const [transactions, setTransactions] = useState([]);
  const [clients, setClients] = useState([]);
  const [numeroCompte, setNumeroCompte] = useState('');
  const [dateRecherche, setDateRecherche] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, clientsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/transactions'),
          axios.get('http://localhost:8000/api/clients'),
        ]);

        const sortedTransactions = transactionsRes.data.sort((a, b) => b.id - a.id);
        setTransactions(sortedTransactions);
        setClients(clientsRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données :', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getNomClient = (numeroCompte) => {
    const client = clients.find(c => c.numero_compte === numeroCompte);
    return client ? client.nom : 'Inconnu';
  };

  const transactionsFiltrees = transactions.filter(transaction => {
    const dateTransaction = transaction.created_at?.split('T')[0];
    return (
      transaction.numero_compte.toLowerCase().includes(numeroCompte.toLowerCase()) &&
      (dateRecherche === '' || dateTransaction === dateRecherche)
    );
  });

  return (
    <div className="container mt-5">
      

      {/* Boutons de navigation */}
      <div className="mb-4 d-flex gap-3">
        <Link to="/transaction" className="btn btn-primary">Enregistrer une Transaction</Link>
        <Link to="/solde" className="btn btn-secondary">Vérifier le Solde</Link>
      </div>
 <h3>Recherche de transactions</h3>
      {/* Formulaire de recherche */}
      <div className="mb-3 w-50">
        <label className="form-label">Numéro de compte</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ex : 123456"
          value={numeroCompte}
          onChange={(e) => setNumeroCompte(e.target.value)}
        />
      </div>

      <div className="mb-4 w-50">
        <label className="form-label">Date de transaction</label>
        <input
          type="date"
          className="form-control"
          value={dateRecherche}
          onChange={(e) => setDateRecherche(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Chargement des transactions...</p>
      ) : numeroCompte.trim() === '' && dateRecherche === '' ? (
        <p className="text-muted">Veuillez entrer un numéro de compte ou une date pour lancer la recherche.</p>
      ) : transactionsFiltrees.length === 0 ? (
        <p>Aucune transaction trouvée.</p>
      ) : (
        <table className="table table-bordered table-hover w-90">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Numéro de compte</th>
              <th>Nom</th>
              <th>Type</th>
              <th>Montant</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactionsFiltrees.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.numero_compte}</td>
                <td>{getNomClient(transaction.numero_compte)}</td>
                <td>{transaction.type}</td>
                <td>{parseFloat(transaction.montant).toFixed(2)} FCFA</td>
                <td>{new Date(transaction.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionSearch;
