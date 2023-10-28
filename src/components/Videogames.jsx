import { useCallback, useEffect, useState } from 'react';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';
import { db } from '../services/services';
import { onValue, ref, set, push, child } from 'firebase/database';

const Videogames = () => {
  const [addedVideogames, setAddedVideogames] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideogames = (query) => {
    setIsLoading(true);
    onValue(query, (snapshot) => {
      const data = snapshot.val();
      const loadedVideogames = [];
      for (const key in data) {
        loadedVideogames.push({
          id: key,
          name: data[key]['name'],
          status: data[key]['status'],
        });
      }
      setAddedVideogames(loadedVideogames);
      setIsLoading(false);
    });
  };

  const addVideogameHandler = (videogameData) => {
    const newVideogameKey = push(child(ref(db), 'videogames')).key;
    set(ref(db, 'videogames/' + newVideogameKey), videogameData);
  };

  useEffect(() => {
    const query = ref(db, 'videogames');
    fetchVideogames(query);
  }, []);

  const videogamesList = addedVideogames.map((item) => (
    <VideogameItem key={item.id} name={item.name} status={item.status} />
  ));

  return (
    <div className="flex flex-col items-center">
      <div className="py-10">
        <NewVideogame onAddedVideogames={addVideogameHandler} />
      </div>
      <section>
        {error && <p>{error}</p>}
        {!error && !isLoading && videogamesList.length > 0 && (
          <ul className="flex flex-row flex-wrap">{videogamesList}</ul>
        )}
        {isLoading && <p>Loading...</p>}
      </section>
    </div>
  );
};

export default Videogames;
