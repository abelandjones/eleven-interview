import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card";

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
    /* 
    ** Fetch all basic Pokemon data (name and URL) from the API. This allows us 
    ** to search/filter on all names in the dataset.
    */
    const fetchAllPokemon = async () => {
      try {
        let allPokemon = [];
        let nextUrl = "https://pokeapi.co/api/v2/pokemon?limit=200";
        while (nextUrl) {
          const response = await axios.get(nextUrl);
          allPokemon = [...allPokemon, ...response.data.results];
          nextUrl = response.data.next;
        }
        setPokemonList(allPokemon);
        setFilteredPokemonList(allPokemon);
        setTotalPages(Math.ceil(allPokemon.length / itemsPerPage));
      } catch (err) {
        setError("Failed to fetch Pokémon data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllPokemon();
  }, []);

  const handleSearch = async (event) => {
    /*
    ** Filter our list of Pokemon based on their name.
    */
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filteredList = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(query)
    );
  
    if (filteredList.length > 0) {
      /*
      ** Dynamically fetch detailed Pokemon data for the filtered search 
      ** results.
      */
      try {
        const detailedData = await Promise.all(
          filteredList.map(async (pokemon) => {
            const detailsResponse = await axios.get(pokemon.url);
            return detailsResponse.data;
          })
        );
        setFilteredPokemonList(detailedData);
        setTotalPages(Math.ceil(detailedData.length / itemsPerPage));
      } catch (err) {
        setError("Failed to fetch Pokémon details for the search results. Please try again later.");
      }
    } else {
      setFilteredPokemonList([]);
      setTotalPages(0);
    }
  
    setCurrentPage(1);
  };

  const fetchPokemonDetails = async (startIndex, endIndex) => {
    /*
    ** Dynamically fetch detailed Pokemon data for the current page.
    */
    try{
      const currentPagePokemon = pokemonList.slice(startIndex, endIndex);
      const detailedData = await Promise.all(
        currentPagePokemon.map(async (pokemon) => {
          const detailsResponse = await axios.get(pokemon.url);
          return detailsResponse.data;
        })
      );
      setFilteredPokemonList(detailedData);
    } catch (err) {
      setError("Failed to fetch Pokémon details. Please try again later.");
    }
  };

  useEffect(() => {
    if (!searchQuery && pokemonList.length > 0) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = currentPage * itemsPerPage;
      fetchPokemonDetails(startIndex, endIndex);
    }
  }, [currentPage, pokemonList, searchQuery]);

  const displayedPokemon = filteredPokemonList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container page-width">
      <h1 className="mb-10">Pokémon - Gotta Catch 'Em All</h1>
      {loading && <div className="text-center text-xl font-bold">Loading...</div>}
      {error && <div className="text-center text-red-600 text-lg">{error}</div>}
      {!loading && !error && (
        <>
          <div className="mb-6 flex justify-center">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Find me a Pokémon..."
              className="border border-gray-300 rounded p-2 w-full"
            />
          </div>
          {displayedPokemon.length === 0 ? (
            <div className="text-center text-xl font-bold">No Pokémon found.</div>
          ) : (
            <>
              <div className="flex flex-wrap -mx-3">
                {displayedPokemon.map((pokemon) => (
                  <div key={pokemon.name} className="w-full sm:w-1/2 lg:w-1/4 xl:w-1/5 px-3 mb-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-center capitalize">{pokemon.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="w-full h-32 object-contain mb-4 flex items-center justify-center text-gray-500">
                          {pokemon.sprites?.front_default ? (
                            <img
                              src={pokemon.sprites.front_default}
                              alt={pokemon.name || "Image Unavailable"}
                              className="h-full"
                            />
                          ) : (
                            <span>No Image Available</span>
                          )}
                        </div>
                        <CardDescription>
                          <strong>Height:</strong> {pokemon.height || "N/A"} | <strong>Weight:</strong>{" "}
                          {pokemon.weight || "N/A"}
                        </CardDescription>
                        <CardDescription>
                          <strong>Types:</strong>{" "}
                          {pokemon.types
                            ? pokemon.types.map((type) => type.type.name).join(", ")
                            : "N/A"}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              <div className="flex justify-center items-center mt-8">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  First
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="mx-4 text-lg font-semibold">
                  {currentPage}/{totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="mx-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Next
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                  Last
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );  
}
