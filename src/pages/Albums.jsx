import { useEffect, useState } from 'react';
import { fetchAlbums } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAlbums = async () => {
      const data = await fetchAlbums();
      setAlbums(data);
    };
    loadAlbums();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-8">Albums</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map(album => (
          <div
            key={album._id}
            className="bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition cursor-pointer"
            onClick={() => navigate(`/album/${album._id}`)}
          >
            <img
              src={album.cover_url}
              alt={album.title}
              className="w-full aspect-square object-cover rounded mb-3"
            />
            <h3 className="font-semibold text-center">{album.title}</h3>
            <p className="text-gray-400 text-sm text-center">{album.artist.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}