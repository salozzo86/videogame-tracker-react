import { useCallback, useEffect, useState } from 'react';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';

const Videogames = () => {
  const [addedVideogames, setAddedVideogames] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideogamesHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        'https://react-http-f4cc2-default-rtdb.europe-west1.firebasedatabase.app/videogames.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const data = await response.json();
      const loadedVideogames = [];

      for (const key in data) {
        loadedVideogames.push({
          id: key,
          name: data[key].name,
          status: data[key].status,
        });
      }
      setAddedVideogames(loadedVideogames);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideogamesHandler();
  }, [fetchVideogamesHandler]);

  async function addVideogameHandler(videogame) {
    const response = await fetch(
      'https://react-http-f4cc2-default-rtdb.europe-west1.firebasedatabase.app/videogames.json',
      {
        method: 'POST',
        body: JSON.stringify(videogame),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
    fetchVideogamesHandler();
  }

  const videogamesList = addedVideogames.map((item) => (
    <VideogameItem key={item.id} name={item.name} status={item.status} />
  ));

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="py-10">
        <NewVideogame onAddedVideogames={addVideogameHandler} />
      </div>
      <section>
        {error && <p>{error}</p>}
        {!error && !isLoading && videogamesList.length > 0 && (
          <ul>{videogamesList}</ul>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </div>
  );
};

export default Videogames;
