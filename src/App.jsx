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
  const [authStateLoaded, setAuthStateLoaded] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
      setAuthStateLoaded(true);
    });

    return () => {
      listen();
    };
  }, [setAuthUser, setAuthStateLoaded]);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        setAuthUser(null);
      })
      .catch((error) => console.log(error));
  };

  if (!authStateLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-t-4 border-solid border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Header />
      <section>
        {authUser ? (
          <>
            <section>
              <p>{authUser.email}</p>
              <Button onClick={userSignOut}>Sign Out</Button>
            </section>

            <Videogames />
          </>
        ) : (
          <section className="relative m-2 flex w-72 flex-col space-y-6 rounded-lg bg-white p-4 text-center ">
            <SignIn /> <SignUp />
          </section>
        )}
      </section>
      {/* {!authUser && authStateLoaded && (
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
      )} */}
    </div>
  );
}

export default App;
