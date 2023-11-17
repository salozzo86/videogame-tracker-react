import { useCallback, useState } from 'react';
import { auth, db } from '../../services/services';
import {
  collection,
  where,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';

export function useFetch(collectionName, orderCriteria) {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState();

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, collectionName),
        where('userId', '==', auth.currentUser.uid),
        orderBy(orderCriteria, 'desc'),
      );
      onSnapshot(q, (snapshot) => {
        setFetchedData(
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
  }, [fetchedData]);

  return {
    error,
    isLoading,
    fetchedData,
    fetchData,
  };
}
