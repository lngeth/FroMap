import db from "@/firebase-config";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const getDocumentByIDFromDatabase = async (database, documentID) => {
    const docRef = doc(db.db, database, documentID);
    const docSnap = await getDoc(docRef);
    return docSnap;
}

export const setDocumentByIDFromDatabase = async (database, documentID, elementToAdd) => {
    await setDoc(doc(db.db, database, documentID), elementToAdd);
}

//export const addCollection = async (database, collectionID, )