import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ClientsTable = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nom, setNom] = useState('');
  const [numeroCompte, setNumeroCompte] = useState('');
  const [error, setError] = useState('');
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingClientId, setEditingClientId] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 5;

  const fetchClients = () => {
    setLoading(true);
    axios.get('http://localhost:8000/api/clients')
      .then(response => {
        const sortedClients = response.data.sort((a, b) => b.id - a.id);
        setClients(sortedClients);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des clients :', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddOrUpdateClient = async (e) => {
    e.preventDefault();
    setError('');
    if (!nom.trim() || !numeroCompte.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setAdding(true);

    try {
      if (editingClientId) {
        await axios.put(`http://localhost:8000/api/clients/${editingClientId}`, {
          nom: nom.trim(),
          numero_compte: numeroCompte.trim(),
        });
      } else {
        await axios.post('http://localhost:8000/api/clients', {
          nom: nom.trim(),
          numero_compte: numeroCompte.trim()
        });
      }

      setNom('');
      setNumeroCompte('');
      setEditingClientId(null);
      fetchClients();
    } catch (err) {
      console.error('Erreur lors de la soumission du client :', err);
      setError('Erreur lors de la soumission du client. Veuillez réessayer.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm('Voulez-vous vraiment supprimer ce client ?')) return;

    setDeletingId(clientId);
    try {
      await axios.delete(`http://localhost:8000/api/clients/${clientId}`);
      fetchClients();
    } catch (err) {
      console.error('Erreur lors de la suppression du client :', err);
      alert('Erreur lors de la suppression du client. Veuillez réessayer.');
    } finally {
      setDeletingId(null);
    }
  };

  const handleEditClient = (client) => {
    setNom(client.nom);
    setNumeroCompte(client.numero_compte);
    setEditingClientId(client.id);
  };

  const handleCancelEdit = () => {
    setNom('');
    setNumeroCompte('');
    setEditingClientId(null);
    setError('');
  };

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClient, indexOfLastClient);
  const totalPages = Math.ceil(clients.length / clientsPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return <p>Chargement des clients...</p>;
  }

  return (
    <div>
      <div className="container mt-5 w-50 mx-auto">
        <h3>{editingClientId ? 'Modifier un client' : 'Ajouter un nouveau client'}</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleAddOrUpdateClient}>
          <div className="mb-3">
            <label htmlFor="nom" className="form-label">Nom</label>
            <input
              type="text"
              id="nom"
              className="form-control"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              disabled={adding}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="numeroCompte" className="form-label">Numéro de compte</label>
            <input
              type="text"
              id="numeroCompte"
              className="form-control"
              value={numeroCompte}
              onChange={(e) => setNumeroCompte(e.target.value)}
              disabled={adding}
              required
            />
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-primary" disabled={adding}>
              {adding ? (editingClientId ? 'Modification...' : 'Ajout en cours...') : (editingClientId ? 'Modifier' : 'Ajouter')}
            </button>
            {editingClientId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancelEdit} disabled={adding}>
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      <h2 style={{ marginLeft: '20%', marginTop: '40px' }}>Liste des clients</h2>
      <div className="container mt-4">
        <table className="table table-striped table-bordered w-75 mx-auto">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Nom complet</th>
              <th>Numéro de compte</th>
              <th>Date de création</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentClients.length === 0 ? (
              <tr><td colSpan="5" className="text-center">Aucun client trouvé.</td></tr>
            ) : (
              currentClients.map(client => (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.nom}</td>
                  <td>{client.numero_compte}</td>
                  <td>{new Date(client.created_at).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-outline-warning btn-sm me-2"
                      onClick={() => handleEditClient(client)}
                      title="Modifier"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteClient(client.id)}
                      disabled={deletingId === client.id}
                      title="Supprimer"
                    >
                      {deletingId === client.id ? (
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      ) : (
                        <FaTrash />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-secondary me-2"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            Précédent
          </button>
          <span className="align-self-center">Page {currentPage} / {totalPages}</span>
          <button
            className="btn btn-secondary ms-2"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Suivant
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;
