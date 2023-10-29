import { useReducer } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        error: null,
        success: true,
        documents: action.payload,
      };
    case "PENDING":
      return { documents: null, error: null, success: false, isPending: true };
    case "DELETED_DOCUMENT":
      return {
        documents: null,
        error: action.payload,
        success: true,
        isPending: false,
      };
    case "ERROR":
      return {
        documents: null,
        isPending: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

const initialState = {
  isPending: false,
  documents: null,
  error: null,
  success: null,
};

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // reference to the firestore collection
  const ref = projectFirestore.collection(collection);

  // adding a document
  const addDocument = async (doc) => {
    dispatch({ type: "PENDING" });

    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatch({ type: "ADDED_DOCUMENT", payload: addedDocument });
    } catch (err) {
      dispatch({ type: "ERROR", payload: err.message });
    }
  };

  // deleting a document
  const deleteDocument = async (id) => {
    dispatch({ type: "PENDING" });
    try {
      await ref.doc(id).delete();
      dispatch({ type: "DELETED_DOCUMENT" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return { response, addDocument, deleteDocument };
};
