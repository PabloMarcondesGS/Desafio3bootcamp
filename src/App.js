import React, { useState, useEffect } from "react";
import api from './services/api';


import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    
    const response = await api.post('repositories', {
        title: `Novo projeto ${Date.now()}`,
        owner: "Pablo Marcondes"
    });

    const repositorie = response.data;

    setRepositories([...repositories, repositorie]);
  }

  async function handleRemoveRepository({id}) {
    const response = await api.delete(`repositories/${id}`, {
    });

    setRepositories(repositories.filter((repository) => repository.id !== id));
    // const noDeleted = repositories.filter((repository) => repository.id !== id);
    // setRepositories(noDeleted);
  }

  return (
    <div>
      <ul data-testid="repository-list">
            {repositories.map(
              repositories => (
              <li key={repositories.id}>
                {repositories.title}
              <button onClick={() => handleRemoveRepository(repositories)}>
                Remover
              </button>
            </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
