import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk Search & Filter
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                setLoading(true);
                // Ngambil data dari Endpoint 1: Characters
                const response = await axios.get('https://rickandmortyapi.com/api/character');
                setCharacters(response.data.results);
            } catch (err) {
                setError('Gagal mengambil data dari API Rick & Morty bro. Cek koneksi lu.');
            } finally {
                setLoading(false);
            }
        };
        fetchCharacters();
    }, []);

    // Logika buat Search dan Filter berjalan barengan
    const filteredCharacters = characters.filter((char) => {
        const matchName = char.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchStatus = statusFilter ? char.status === statusFilter : true;
        return matchName && matchStatus;
    });

    // Conditional Rendering untuk Loading dan Error
    if (loading) return <div className="text-center text-green-400 mt-10 text-2xl font-bold animate-pulse">Memuat portal dimensi... 🌀</div>;
    if (error) return <div className="text-center text-red-500 mt-10 text-xl bg-red-900/20 p-4 rounded-lg">{error}</div>;

    return (
        <div>
            {/* --- Fitur Search & Filter --- */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between w-full">
                <input
                    type="text"
                    placeholder="Cari nama karakter..."
                    className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-green-400 focus:outline-none focus:ring-1 focus:ring-green-400 w-full md:w-2/3"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select
                    className="p-3 rounded-lg bg-gray-800 text-white border border-gray-600 focus:border-green-400 focus:outline-none w-full md:w-1/3"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">Semua Status</option>
                    <option value="Alive">Hidup (Alive)</option>
                    <option value="Dead">Mati (Dead)</option>
                    <option value="unknown">Tidak Diketahui</option>
                </select>
            </div>

            {/* --- Tampilan Grid Cards --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCharacters.map((char) => (
                    <div key={char.id} className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 hover:border-green-400 hover:shadow-green-500/20 transition-all duration-300">
                        <img src={char.image} alt={char.name} className="w-full h-56 object-cover" />
                        <div className="p-5">
                            <h3 className="text-xl font-bold text-white truncate mb-2">{char.name}</h3>

                            <div className="flex items-center gap-2 mb-1">
                                <span className={`w-3 h-3 rounded-full ${char.status === 'Alive' ? 'bg-green-500' : char.status === 'Dead' ? 'bg-red-500' : 'bg-gray-400'}`}></span>
                                <p className="text-gray-300 text-sm font-medium">{char.status} - {char.species}</p>
                            </div>

                            <p className="text-gray-400 text-xs mt-3">Asal: {char.origin.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}