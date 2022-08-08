import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAOEY36KPNcXm6XP9dSmZuGt-0wKscGw3U",
    authDomain: "disney-clone-nik.firebaseapp.com",
    projectId: "disney-clone-nik",
    storageBucket: "disney-clone-nik.appspot.com",
    messagingSenderId: "422633354430",  
    appId: "1:422633354430:web:eaa37bfaee0958026bdaef",
    measurementId: "G-30L4XV16F7"
  };
  

const firebaseApp = initializeApp(firebaseConfig);
const db=getFirestore(firebaseApp);
const auth=getAuth(firebaseApp)
const provider=new GoogleAuthProvider();


// const storage=firebase.storage()

export {auth,provider}
export default db;