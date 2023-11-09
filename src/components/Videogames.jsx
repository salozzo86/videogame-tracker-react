import { useCallback, useEffect, useState } from 'react';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';
import { auth, db } from '../services/services';
import {
  collection,
  getDocs,
  addDoc,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';
import Button from './UI/Button';

const Videogames = () => {
  const [addedVideogames, setAddedVideogames] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const videogamesCollectionRef = collection(db, 'videogames');

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
      await addDoc(videogamesCollectionRef, videogameData);
      fetchVideogames();
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchVideogames();
  }, []);

  // TODO implement useMemo
  const videogamesList = addedVideogames.map((item) => {
    return (
      <VideogameItem key={item.id} name={item.name} status={item.status} />
    );
  });

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
      </section>
    </div>
  );
};

export default Videogames;
