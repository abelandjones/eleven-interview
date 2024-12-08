import React, { useEffect, useState } from "react";
import axios from "axios";

export function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${(currentPage - 1) * itemsPerPage}`
        );
        const pokemonDetails = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );
        setPokemonList(pokemonDetails);
        setFilteredPokemonList(pokemonDetails);
        setTotalPages(Math.ceil(response.data.count / itemsPerPage));
      } catch (err) {
        setError("Failed to fetch Pokémon data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
    setFilteredPokemonList(filteredList);
  };

  if (loading) return <div className="text-center text-xl font-bold">Loading...</div>;

  if (error) return <div className="text-center text-red-600 text-lg">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Pokémon - Gotta Catch 'Em All</h1>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Find me a Pokémon..."
          className="border border-gray-300 rounded p-2 w-full max-w-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemonList.map((pokemon) => (
          <div key={pokemon.id} className="bg-white rounded-lg shadow-md p-4">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-full h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold text-center capitalize mb-2">{pokemon.name}</h2>
            <p className="text-sm text-gray-700">
              <strong>Height:</strong> {pokemon.height} | <strong>Weight:</strong> {pokemon.weight}
            </p>
            <p className="text-sm text-gray-700">
              <strong>Types:</strong> {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="mx-4 text-lg font-semibold">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
