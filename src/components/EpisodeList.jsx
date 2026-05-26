import { useState, useEffect } from 'react';
import axios from 'axios';

export default function EpisodeList() {
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEpisodes = async () => {
            try {
                setLoading(true);
                // Ngambil data dari Endpoint 2: Episodes
                const response = await axios.get('https://rickandmortyapi.com/api/episode');
                setEpisodes(response.data.results.slice(0, 6));
            } catch (err) {
                setError('Gagal mengambil data episode bro.');
            } finally {
                setLoading(false);
            }
        };
        fetchEpisodes();
    }, []);

    if (loading) return <div className="text-green-400 mt-4 animate-pulse">Memuat data episode... 🎬</div>;
    if (error) return <div className="text-red-500 mt-4">{error}</div>;

    return (
        <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-400 mb-4 border-b border-gray-700 pb-2">
                📺 Daftar Episode
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {episodes.map((eps) => (
                    <div key={eps.id} className="bg-gray-800 p-4 rounded-lg border border-gray-700 hover:border-green-400 transition-colors">
                        <h3 className="text-lg font-bold text-white truncate">{eps.name}</h3>
                        <p className="text-sm text-green-300 font-mono mt-1">{eps.episode}</p>
                        <p className="text-xs text-gray-400 mt-2">Tayang: {eps.air_date}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}