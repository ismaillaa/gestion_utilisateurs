import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UserForm = ({ user, onUserAdded }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(''); // 'success' ou 'error'
  const navigate = useNavigate();

  // Pré-remplir les champs si un utilisateur est fourni pour modification
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAge(user.age);
    }
  }, [user]);

  // Gérer la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = { name, email, age };

    if (user) {
      // Modifier un utilisateur existant
      axios
        .put(`http://localhost:5000/api/users/${user.id}`, newUser)
        .then(() => {
          setMessage('Utilisateur modifié avec succès.');
          setMessageType('success');
          setName('');
          setEmail('');
          setAge('');
          onUserAdded(); // Rafraîchir la liste
          setTimeout(() => navigate('/users'), 1000); // Rediriger après 1 seconde
        })
        .catch(() => {
          setMessage("Erreur lors de la modification de l'utilisateur.");
          setMessageType('error');
        });
    } else {
      // Ajouter un nouvel utilisateur
      axios
        .post('http://localhost:5000/api/users', newUser)
        .then(() => {
          setMessage('Utilisateur ajouté avec succès.');
          setMessageType('success');
          setName('');
          setEmail('');
          setAge('');
          onUserAdded(); // Rafraîchir la liste
          setTimeout(() => navigate('/users'), 1000); // Rediriger après 1 seconde
        })
        .catch(() => {
          setMessage("Erreur lors de l'ajout de l'utilisateur.");
          setMessageType('error');
        });
    }
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

  return (
    <div>
      <h2>{user ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h2>
      
      {/* Message de notification */}
      {renderMessage()}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            placeholder="Âge"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {user ? 'Modifier' : 'Ajouter'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
