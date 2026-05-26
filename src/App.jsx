// src/App.jsx
import CharacterList from './components/CharacterList';
import EpisodeList from './components/EpisodeList';

function App() {
  return (
    // Tambahin overflow-x-hidden dan w-full di sini biar gak bocor ke samping
    <div className="min-h-screen bg-gray-900 text-white font-sans pb-10 overflow-x-hidden w-full">
      {/* Header Dashboard */}
      {/* Padding dikecilin di HP (p-4), gedein di laptop (md:p-6) */}
      <header className="bg-gray-800 p-4 md:p-6 text-center shadow-lg border-b border-green-500 mb-8 w-full">
        {/* Ukuran font dikecilin di HP (text-3xl), gedein di laptop (md:text-4xl) */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-green-400 tracking-wider break-words">
          🛸 Rick & Morty Dashboard
        </h1>
        <p className="text-gray-400 mt-2 text-sm md:text-lg">
          Tugas Mandiri Integrasi API
        </p>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 md:px-6">
        <EpisodeList />

        <h2 className="text-xl md:text-2xl font-bold text-green-400 mb-4 border-b border-gray-700 pb-2">
          👽 Karakter Multiverse
        </h2>
        <CharacterList />
      </main>
    </div>
  );
}

export default App;