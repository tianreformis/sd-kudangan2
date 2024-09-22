// lib/crud.ts
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QuerySnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';

// Define types for the data model (for example, User)
export interface User {
    id?:string;
  name: string;
  age: number;
  address:string;
}

// CREATE: Add a new document to Firestore
export const createDocument = async <T>(collectionName: string, data: T): Promise<string | undefined> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// READ: Get all documents from a Firestore collection
export const getDocuments = async <T>(collectionName: string): Promise<T[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, collectionName));
    const docs: T[] = [];
    querySnapshot.forEach((doc) => {
      docs.push({ id: doc.id, ...doc.data() } as T);
    });
    return docs;
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return [];
  }
};

// UPDATE: Update a document in Firestore
export const updateDocument = async <T>(collectionName: string, docId: string, updatedData: Partial<T>): Promise<void> => {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
  } catch (error) {
    console.error("Error updating document: ", error);
  }
};

// DELETE: Delete a document from Firestore
export const deleteDocument = async (collectionName: string, docId: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, collectionName, docId));
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
};
