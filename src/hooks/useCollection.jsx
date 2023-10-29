import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // if we do not use useRef --> infinite loop
  // useRef returns us like a cached value that will not change
  // otherwise arrays and objects are reference types
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    setError(null);
    let ref = projectFirestore.collection(collection);

    if (query) {
      ref = ref.where(...query);
    }

    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const subscribe = ref.onSnapshot(
      (snapshot) => {
        // declare an empty results array
        let results = [];

        // real time database
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // set Documents and error
        setError(null);
        setDocuments(results);
      },
      (error) => {
        console.log(error.message);
        setError("No Transactions To Display");
      }
    );

    // cleanup function
    return () => subscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
