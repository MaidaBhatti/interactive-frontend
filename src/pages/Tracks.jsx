import { useEffect, useState } from 'react';
import { fetchTracks } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Tracks() {
  const [tracks, setTracks] = useState([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const navigate = useNavigate();

  // Fetch tracks
  useEffect(() => {
    const loadTracks = async () => {
      try {
        const data = await fetchTracks();
        setTracks(data);
      } catch (err) {
        console.error('Failed to fetch tracks:', err);
      }
    };
    loadTracks();
  }, []);

  // Add new track
  const handleAddTrack = async () => {
    if (!title || !artist || !album || !duration) {
      return alert('Please fill in all fields.');
    }

    const durationNum = Number(duration);
    if (isNaN(durationNum) || durationNum <= 0) {
      return alert('Please enter a valid duration.');
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/tracks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          artist: { name: artist },
          album: { title: album },
          duration: durationNum,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to add track');

      setTracks((prev) => [...prev, data]);
      setTitle('');
      setArtist('');
      setAlbum('');
      setDuration('');
    } catch (err) {
      console.error('Error adding track:', err);
      alert(err.message || 'Error adding track');
    } finally {
      setLoading(false);
    }
  };

  // Delete track
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this track?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/tracks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Failed to delete track');
      }

      setTracks((prev) => prev.filter((track) => track._id !== id));
      setFavorites((prev) => {
        const updated = new Set(prev);
        updated.delete(id);
        return updated;
      });
    } catch (err) {
      console.error('Error deleting track:', err);
      alert(err.message || 'Error deleting track');
    }
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  return (
    <div className="bg-gray-950 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold mb-10 text-center">🎵 Track Manager</h1>

      {/* Add Track Form */}
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-xl mx-auto mb-12 space-y-4">
        <h2 className="text-2xl font-semibold mb-2">Add New Track</h2>
        <input
          type="text"
          placeholder="Track Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="text"
          placeholder="Album Title"
          value={album}
          onChange={(e) => setAlbum(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <input
          type="number"
          placeholder="Duration (seconds)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
        />
        <button
          onClick={handleAddTrack}
          disabled={loading}
          className={`w-full py-3 rounded font-semibold transition ${
            loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Adding...' : 'Add Track'}
        </button>
      </div>

      {/* Track List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No tracks found.</p>
        ) : (
          tracks.map((track) => (
            <div
              key={track._id}
              className="bg-gray-800 p-5 rounded-lg transition relative"
            >
              <div className="cursor-pointer" onClick={() => navigate(`/track/${track._id}`)}>
                <h3 className="text-lg font-semibold">{track.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {track.artist?.name} — {track.album?.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{track.duration}s</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4 space-x-2">
                <button
                  onClick={() => toggleFavorite(track._id)}
                  className={`text-sm px-3 py-1 rounded-full ${
                    favorites.has(track._id)
                      ? 'bg-yellow-500 text-black'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  {favorites.has(track._id) ? '★ Fav' : '☆ Fav'}
                </button>
                <button
                  onClick={() => handleDelete(track._id)}
                  className="text-sm px-3 py-1 rounded-full bg-red-600 hover:bg-red-700"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
