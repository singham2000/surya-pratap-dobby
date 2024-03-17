import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDXXB0TQpfCjlxbD4rJiJQp9mel3lbeq50",
  authDomain: "dobby-cefa6.firebaseapp.com",
  projectId: "dobby-cefa6",
  storageBucket: "dobby-cefa6.appspot.com",
  messagingSenderId: "387020560172",
  appId: "1:387020560172:web:c70a2ee86cce4095967e89",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://dobby-cefa6.appspot.com");
export default storage;
