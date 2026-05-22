// src/App.jsx
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header style={styles.header}>
        <h1>🚀 React Integrasi API</h1>
        <p>Data dari JSONPlaceholder API (dummy backend)</p>
      </header>
      <main>
        <UserList />
      </main>
    </div>
  );
}

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center',
  },
};

export default App;
