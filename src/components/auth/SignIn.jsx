import React, { useRef } from 'react';
import Button from '../UI/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/services';

const SignIn = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        console.log(userCredential.user.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h2>Sign In</h2>
      <form>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
          id="email"
        ></input>
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
          id="password"
        ></input>
        <Button type={'submit'} onClick={submitHandler}>
          Sign In
        </Button>
      </form>
    </>
  );
};

export default SignIn;
