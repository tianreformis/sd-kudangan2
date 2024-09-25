// lib/crud.ts
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, DocumentData, QuerySnapshot, limit, query, startAfter, endBefore, orderBy, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase/init';

// Define types for the data model (for example, User)
export interface Teachers {
  id?: string;
  name: string;
  role: string;
  address: string;
  email: string;
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

export const getCollectionWithPagination = async <T>(
  collectionName: string,
  pageSize: number,
  lastVisibleDoc: QueryDocumentSnapshot | null,
  isNext: boolean
): Promise<{ users: T[]; lastDoc: QueryDocumentSnapshot | null; firstDoc: QueryDocumentSnapshot | null }> => {
  const collectionRef = collection(db, collectionName);

  let q;
  if (isNext) {
    if (lastVisibleDoc) {
      q = query(collectionRef, orderBy('name'), startAfter(lastVisibleDoc), limit(pageSize));
    } else {
      q = query(collectionRef, orderBy('name'), limit(pageSize));
    }
  } else {
    // For backward pagination, use `endBefore` to fetch the previous set
    q = query(collectionRef, orderBy('name'), endBefore(lastVisibleDoc), limit(pageSize));
  }

  const querySnapshot = await getDocs(q);

  const users = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as T[];

  const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;
  const firstDoc = querySnapshot.docs[0] || null;

  return { users, lastDoc, firstDoc };
};