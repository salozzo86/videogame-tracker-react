import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Videogames from './components/Videogames';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './services/services';
import Button from './components/UI/Button';

function App() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('user signed out successfully');
        setAuthUser(null);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="flex flex-col">
      <Header />
      {!authUser && (
        <>
          <SignIn /> <SignUp />
        </>
      )}
      {authUser && (
        <>
          <section>
            <p>{authUser.email}</p>
            <Button onClick={userSignOut}>Sign Out</Button>
          </section>

          <Videogames />
        </>
      )}
    </div>
  );
}

export default App;
