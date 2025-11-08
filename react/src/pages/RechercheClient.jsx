import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RechercheClient = () => {
  const [clients, setClients] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/clients')
      .then(response => {
        const sortedClients = response.data.sort((a, b) => b.id - a.id);
        setClients(sortedClients);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors du chargement des clients :', error);
        setLoading(false);
      });
  }, []);

  const clientsFiltres = clients.filter(client =>
    client.nom.toLowerCase().includes(recherche.toLowerCase()) ||
    client.numero_compte.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h3>Recherche de client</h3>
      <input
        type="text"
        className="form-control mb-4 w-50"
        placeholder="Rechercher par nom ou numéro de compte..."
        value={recherche}
        onChange={(e) => setRecherche(e.target.value)}
      />

      {loading ? (
        <p>Chargement des clients...</p>
      ) : recherche.trim() === '' ? (
        <p className="text-muted">Saisissez un nom ou un numéro de compte pour lancer la recherche.</p>
      ) : clientsFiltres.length === 0 ? (
        <p>Aucun client correspondant trouvé.</p>
      ) : (
        <table className="table table-bordered table-hover w-75">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Numéro de compte</th>
              <th>Date de création</th>
            </tr>
          </thead>
          <tbody>
            {clientsFiltres.map(client => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.nom}</td>
                <td>{client.numero_compte}</td>
                <td>{new Date(client.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RechercheClient;
