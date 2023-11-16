import { useCallback, useEffect, useMemo, useState } from 'react';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';
import { auth, db } from '../services/services';
import {
  collection,
  addDoc,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';

const Videogames = () => {
  const [addedVideogames, setAddedVideogames] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videogamesCollectionRef = collection(db, 'videogames');
  const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

  const fetchVideogames = useCallback(async () => {
    setIsLoading(true);

    try {
      const q = query(
        collection(db, 'videogames'),
        where('userId', '==', auth.currentUser.uid),
      );
      onSnapshot(q, (snapshot) => {
        setAddedVideogames(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
        setIsLoading(false);
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }, [setAddedVideogames]);

  const addVideogameHandler = async (videogameData) => {
    try {
      const cleanedName = videogameData.name.toLowerCase().replace(/\s+/g, '-');
      const response = await fetch(
        `https://api.rawg.io/api/games/${cleanedName}?key=${API_KEY}`,
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
      };
      await addDoc(videogamesCollectionRef, newVideogameData);
      fetchVideogames();
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
            {addedVideogames.map((item) => (
              <VideogameItem
                key={item.id}
                name={item.name}
                status={item.status}
                img={item.img}
                platforms={item.platforms}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Videogames;
