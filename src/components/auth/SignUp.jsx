import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRef } from 'react';
import { auth } from '../../services/services';
import Button from '../UI/Button';
import React from 'react';
import { push, child, ref, set } from 'firebase/database';
import { db } from '../../services/services';

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
      .then((userCredential) => {
        const newUserKey = userCredential.user.uid;
        set(ref(db, 'users/' + newUserKey), {
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
          videogames: {},
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <h2>Sign Up</h2>
      <form>
        <label htmlFor="signUpEmail">Email: </label>
        <input
          type="email"
          placeholder="Enter your email"
          ref={emailRef}
          id="signUpEmail"
        ></input>
        <label htmlFor="signUpPassword">Password: </label>
        <input
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
          id="signUpPassword"
        ></input>
        <Button type={'submit'} onClick={submitHandler}>
          Create Account
        </Button>
      </form>
    </>
  );
};

export default SignUp;
