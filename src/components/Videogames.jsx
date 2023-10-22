import { useCallback, useEffect, useState } from 'react';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';

const Videogames = () => {
  const [addedVideogames, setAddedVideogames] = useState([]);

  const fetchVideogamesHandler = useCallback(async () => {
    const response = await fetch(
      'https://react-http-f4cc2-default-rtdb.europe-west1.firebasedatabase.app/videogames.json',
    );
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
  }, []);

  useEffect(() => {
    fetchVideogamesHandler();
  }, [fetchVideogamesHandler, addVideogameHandler]);

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
        <ul>{videogamesList}</ul>
      </section>
    </div>
  );
};

export default Videogames;
