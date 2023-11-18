import { useEffect, useMemo } from 'react';
import { useFetch } from './hooks/useFetch';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';
import { db } from '../services/services';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Videogames = () => {
  const {
    error,
    isLoading,
    fetchedData: addedVideogames,
    fetchData: fetchVideogames,
  } = useFetch('videogames', 'createdAt');
  const videogamesCollectionRef = collection(db, 'videogames');
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const addVideogameHandler = async (videogameData) => {
    try {
      const response = await fetch(
        `https://api.rawg.io/api/games/${videogameData.name}?key=${API_KEY}`,
      );
      if (!response.ok) {
        throw new Error('Something wrong happened');
      }
      const data = await response.json();
      const videogame_image = data['background_image'];
      const realName = data['name'];
      const platformsList = data['parent_platforms'].map(
        (item) => item.platform.name,
      );
      const newVideogameData = {
        ...videogameData,
        name: realName,
        img: videogame_image,
        platforms: platformsList,
        createdAt: serverTimestamp(),
      };
      await addDoc(videogamesCollectionRef, newVideogameData);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  const videogamesList = useMemo(() => {
    if (!addedVideogames) {
      return null;
    }
    return addedVideogames.map((item) => (
      <VideogameItem
        key={item.id}
        name={item.name}
        status={item.status}
        img={item.img}
        platforms={item.platforms}
      />
    ));
  }, [addedVideogames]);

  return (
    <div className="flex flex-col items-center">
      <div className="py-10">
        <NewVideogame onAddedVideogames={addVideogameHandler} />
      </div>
      <section>
        {error && <p>{error}</p>}
        {!error && !isLoading && (
          <ul className="flex flex-row flex-wrap justify-center pb-2">
            {videogamesList}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Videogames;
