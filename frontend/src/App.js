import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null); 
  const [refresh, setRefresh] = useState(false); 

  const handleUserAdded = () => {
    setRefresh(!refresh); 
    setSelectedUser(null); 
  };

  const resetSelectedUser = () => {
    setSelectedUser(null); 
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Gestion des utilisateurs</h1>

      {}
      <nav className="mb-4">
        <Link to="/" className="btn btn-primary me-2" onClick={resetSelectedUser}>
          Ajouter un utilisateur
        </Link>
        <Link to="/users" className="btn btn-secondary">Liste des utilisateurs</Link>
      </nav>

      {}
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
              setSelectedUser={setSelectedUser} 
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
