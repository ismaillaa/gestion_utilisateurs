import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null); // État pour l'utilisateur sélectionné
  const [refresh, setRefresh] = useState(false); // État pour rafraîchir la liste

  const handleUserAdded = () => {
    setRefresh(!refresh); // Forcer le rafraîchissement de la liste
    setSelectedUser(null); // Réinitialiser l'utilisateur sélectionné après modification/ajout
  };

  const resetSelectedUser = () => {
    setSelectedUser(null); // Efface l'utilisateur sélectionné
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des utilisateurs</h1>

      {/* Navigation */}
      <nav className="mb-4">
        <Link to="/" className="btn btn-primary me-2" onClick={resetSelectedUser}>
          Ajouter un utilisateur
        </Link>
        <Link to="/users" className="btn btn-secondary">Liste des utilisateurs</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route
          path="/"
          element={<UserForm user={selectedUser} onUserAdded={handleUserAdded} />}
        />
        <Route
          path="/users"
          element={
            <UserList
              refresh={refresh}
              setSelectedUser={setSelectedUser} // Transmettre la fonction à UserList
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
