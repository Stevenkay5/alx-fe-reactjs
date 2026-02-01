import { useState } from "react";
import { searchUsers } from "../services/githubService";

const Search = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  const handleSearch = async (e, newPage = 1) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    try {
      const data = await searchUsers({
        query,
        location,
        minRepos,
        page: newPage,
      });

      setUsers(newPage === 1 ? data.items : [...users, ...data.items]);
      setPage(newPage);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        GitHub User Search
      </h1>

      {/* Search Form */}
      <form
        onSubmit={(e) => handleSearch(e)}
        className="grid gap-3 md:grid-cols-3 mb-6"
      >
        <input
          className="border p-2 rounded"
          placeholder="Username or keyword"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Location (e.g. Rwanda)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          className="border p-2 rounded"
          type="number"
          placeholder="Min repos"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="md:col-span-3 bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Search
        </button>
      </form>

      {/* States */}
      {loading && <p className="text-center">Loading...</p>}
      {error && (
        <p className="text-center text-red-500">
          Looks like we cant find the user
        </p>
      )}

      {/* Results */}
      <div className="grid gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-4 border p-4 rounded"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 rounded-full"
            />

            <div>
              <h3 className="font-semibold">{user.login}</h3>
              <a
                href={user.html_url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      {users.length > 0 && !loading && (
        <button
          onClick={(e) => handleSearch(e, page + 1)}
          className="block mx-auto mt-6 px-6 py-2 border rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Search;
