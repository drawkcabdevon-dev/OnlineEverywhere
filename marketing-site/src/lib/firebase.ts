import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const submitLead = async (type: 'early-access' | 'audit' | 'contact', data: any) => {
    try {
        const leadsRef = collection(db, "leads");
        await addDoc(leadsRef, {
            ...data,
            type,
            status: 'new',
            createdAt: serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error("Error submitting lead:", error);
        return { success: false, error };
    }
};
