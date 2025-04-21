import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Artists() {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/artists')
      .then(res => setArtists(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Popular Artists</h1>
        <button 
          className="bg-black text-white px-6 py-2 rounded-full"
          onClick={() => navigate('/artist/new')}
        >
          Add Artist
        </button>
      </div>

      {/* Trending Now Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
        <div className="bg-white p-6 rounded-2xl">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">Good Morning</h3>
            <div className="flex items-center space-x-4">
              <div className="bg-gray-200 p-4 rounded-lg">
                <img 
                  src="https://via.placeholder.com/100" 
                  alt="Andrew Ainsley" 
                  className="w-24 h-24 rounded-full"
                />
                <p className="font-semibold mt-2">Andrew Ainsley</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-4">Shades of Love -</h3>
              <div className="flex space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <img 
                    src="https://via.placeholder.com/100" 
                    alt="Ante Scarmach" 
                    className="w-24 h-24 rounded-full"
                  />
                  <p className="font-semibold mt-2">Ante Scarmach</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4">Without You - The Kid LARD!</h3>
              <div className="flex space-x-4">
                <div className="bg-gray-200 p-4 rounded-lg">
                  <img 
                    src="https://via.placeholder.com/100" 
                    alt="Steve V. The Wu" 
                    className="w-24 h-24 rounded-full"
                  />
                  <p className="font-semibold mt-2">Steve V. The Wu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popular Artists Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Popular Artists</h2>
        <div className="bg-white p-6 rounded-2xl space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Sex All', 'Top Charts', 'Top 80'].map((artist) => (
              <div key={artist} className="bg-gray-200 p-4 rounded-lg">
                <img 
                  src="https://via.placeholder.com/100" 
                  alt={artist} 
                  className="w-24 h-24 rounded-full mx-auto"
                />
                <p className="font-semibold mt-2 text-center">{artist}</p>
                <p className="text-gray-600 text-sm text-center">{
                  artist === 'Sex All' ? 'Almana Orande' : 
                  artist === 'Top Charts' ? 'The Weeknd - TOP 100' : 'Top 90 - Top 100'
                }</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Arena Orande Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Arena Orande</h2>
        <div className="bg-white p-6 rounded-2xl space-y-6">
          {artists.map(artist => (
            <div key={artist._id} className="flex items-center space-x-4 p-4 hover:bg-gray-50">
              <img 
                src={artist.image_url || 'https://via.placeholder.com/100'} 
                alt={artist.name} 
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{artist.name}</h3>
                <p className="text-gray-600 text-sm">{
                  artist.name === 'The Weeknd' ? 'Avelingo' : 
                  artist.name === 'Ryan Jones' ? 'Jamie Gray' : 'Dafn Park'
                }</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STAPROY Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">STAPROY</h2>
        <div className="bg-white p-6 rounded-2xl">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <span className="font-bold text-lg">THE WEEKND</span>
              <span className="text-gray-600">03:35</span>
              <span className="text-gray-600">03:50</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}