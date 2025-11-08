import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Solde = () => {
  const [transactions, setTransactions] = useState([]);
  const [clients, setClients] = useState([]);
  const [numeroCompte, setNumeroCompte] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionsRes, clientsRes] = await Promise.all([
          axios.get('http://localhost:8000/api/transactions'),
          axios.get('http://localhost:8000/api/clients'),
        ]);

        setTransactions(transactionsRes.data);
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

  const calculerSolde = (numeroCompte) => {
    const transactionsClient = transactions.filter(t => t.numero_compte === numeroCompte);
    const totalVersements = transactionsClient
      .filter(t => t.type === 'versement')
      .reduce((acc, curr) => acc + parseFloat(curr.montant), 0);
    const totalRetraits = transactionsClient
      .filter(t => t.type === 'retrait')
      .reduce((acc, curr) => acc + parseFloat(curr.montant), 0);
    return (totalVersements - totalRetraits).toFixed(2);
  };

  const comptesFiltres = [...new Set(
    transactions
      .filter(t => t.numero_compte.toLowerCase().includes(numeroCompte.toLowerCase()))
      .map(t => t.numero_compte)
  )];

  return (
    <div className="container mt-5">
      <h3>Recherche de solde par client</h3>

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

      {loading ? (
        <p>Chargement des données...</p>
      ) : numeroCompte.trim() === '' ? (
        <p className="text-muted">Veuillez entrer un numéro de compte pour lancer la recherche.</p>
      ) : comptesFiltres.length === 0 ? (
        <p>Aucun client trouvé.</p>
      ) : (
        <table className="table table-bordered table-hover w-90">
          <thead className="table-light">
            <tr>
              <th>Numéro de compte</th>
              <th>Nom</th>
              <th>Solde Disponible</th>
            </tr>
          </thead>
          <tbody>
            {comptesFiltres.map(compte => (
              <tr key={compte}>
                <td>{compte}</td>
                <td>{getNomClient(compte)}</td>
                <td>{calculerSolde(compte)} FCFA</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Solde;
