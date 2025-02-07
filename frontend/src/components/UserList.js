import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const UserList = ({ refresh, setSelectedUser }) => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  // Charger la liste des utilisateurs
  useEffect(() => {
    axios
      .get('http://localhost:5000/api/users')
      .then((response) => setUsers(response.data))
      .catch(() => {
        setMessage("Erreur lors du chargement des utilisateurs.");
        setMessageType('error');
      });
  }, [refresh]);

  // Supprimer un utilisateur
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        setMessage('Utilisateur supprimé avec succès.');
        setMessageType('success');
      })
      .catch(() => {
        setMessage("Erreur lors de la suppression de l'utilisateur.");
        setMessageType('error');
      });
  };

  // Télécharger les données d'un utilisateur en Excel
  const handleDownloadExcel = (user) => {
    const worksheet = XLSX.utils.json_to_sheet([user]); // Créer une feuille avec une seule ligne
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Utilisateur');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `${user.name}_details.xlsx`); // Nommer le fichier avec le nom de l'utilisateur
  };

  // Afficher un message de notification
  const renderMessage = () => {
    if (!message) return null;
    const alertClass =
      messageType === 'success' ? 'alert alert-success' : 'alert alert-danger';
    return (
      <div className={alertClass} role="alert">
        {message}
      </div>
    );
  };

  // Gérer la modification
  const handleEdit = (user) => {
    setSelectedUser(user); // Définir l'utilisateur sélectionné
    navigate('/'); // Rediriger vers le formulaire
  };

  return (
    <div>
      <h2 className="mb-3">Liste des utilisateurs</h2>

      {/* Message de notification */}
      {renderMessage()}

      {/* Tableau des utilisateurs */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Âge</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => handleDelete(user.id)}
                >
                  Supprimer
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownloadExcel(user)}
                >
                  Télécharger Excel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/" className="btn btn-success mt-3">
        Retour à l'ajout
      </Link>
    </div>
  );
};

export default UserList;
