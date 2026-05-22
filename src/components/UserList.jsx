// src/components/UserList.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import UserTable from './UserTable';
import LoadingSpinner from './LoadingSpinner';

export default function UserList() {
    // STATE untuk manajemen data API
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // useEffect untuk mengambil data saat komponen pertama kali dimuat
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fungsi untuk mengambil data dari API
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            setUsers(response.data);
        } catch (err) {
            setError('Gagal mengambil data. Periksa koneksi internet Anda.');
            console.error('API Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Filter data berdasarkan search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // CONDITIONAL RENDERING berdasarkan state
    if (loading) return <LoadingSpinner />;

    if (error) return (
        <div style={styles.errorContainer}>
            <p style={styles.errorText}> {error}</p>
            <button onClick={fetchUsers} style={styles.retryButton}>
                Coba Lagi
            </button>
        </div>
    );

    return (
        <div style={styles.container}>
            <h2> Daftar Pengguna</h2>

            {/* Input Pencarian */}
            <input
                type="text"
                placeholder=" Cari nama atau email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
            />

            {/* Informasi jumlah data */}
            <p>Menampilkan {filteredUsers.length} dari {users.length} pengguna</p>

            {/* Tabel Data */}
            <UserTable users={filteredUsers} />

            {/* Tombol Refresh */}
            <button onClick={fetchUsers} style={styles.refreshButton}>
                Refresh Data
            </button>
        </div>
    );
}

const styles = {
    container: {
        padding: '1.5rem',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        marginBottom: '1rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
    },
    errorContainer: {
        textAlign: 'center',
        padding: '2rem',
    },
    errorText: {
        color: 'red',
        marginBottom: '1rem',
    },
    retryButton: {
        padding: '8px 16px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    refreshButton: {
        marginTop: '1rem',
        padding: '8px 16px',
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};
