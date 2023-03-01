import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Home } from "./Home";

export const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDMb06aKF1ZcVbt3h8VX7v46xiwNQAck98",
    authDomain: "enlear-notification-test.firebaseapp.com",
    projectId: "enlear-notification-test",
    storageBucket: "enlear-notification-test.appspot.com",
    messagingSenderId: "780186431639",
    appId: "1:780186431639:web:6569447a6e13f7faf2f9d2"
  };
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(app);

  return (
    <div>
      {auth !== undefined && <Home auth={auth} />}
    </div>
  );
}
