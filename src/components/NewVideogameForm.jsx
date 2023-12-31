import { useRef, useState } from 'react';
import Button from './UI/Button';
import { auth } from '../services/services';
import Card from './UI/Card';

const NewVideogameForm = (props) => {
  const nameRef = useRef();
  const statusPlayedRef = useRef();
  const statusPlayingRef = useRef();
  const statusWantRef = useRef();

  const [isValid, setIsValid] = useState(true);

  const inputChangeHandler = () => {
    setIsValid(true);
  };

  const statusChangeHandler = () => {
    setIsValid(true);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userId = auth?.currentUser?.uid;
    const enteredName = nameRef.current.value.trim();
    const cleanedName = enteredName.toLowerCase().replace(/\s+/g, '-');
    const enteredStatus = statusPlayedRef.current.checked
      ? 'Played'
      : statusPlayingRef.current.checked
      ? 'Playing'
      : statusWantRef.current.checked
      ? 'Want to Play'
      : '';
    if (cleanedName === '' || enteredStatus === '') {
      setIsValid(false);
      return;
    }
    const inputData = {
      name: cleanedName,
      status: enteredStatus,
      userId: userId,
    };
    props.onFormSubmit(inputData);
    nameRef.current.value = '';
    statusPlayedRef.current.checked = '';
    statusPlayingRef.current.checked = '';
    statusWantRef.current.checked = '';
  };

  return (
    <Card>
      <form className="p-2">
        <div>
          <label>Videogame Name: </label>
          <input
            className="rounded-md border-black pl-1"
            type="text"
            ref={nameRef}
            onFocus={inputChangeHandler}
          ></input>
        </div>
        <div className="flex items-center py-1">
          <label htmlFor="played" className="pr-1">
            Played
          </label>
          <input
            type="radio"
            id="played"
            value="Played"
            name="videogame_status"
            ref={statusPlayedRef}
            onChange={statusChangeHandler}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
          ></input>
        </div>
        <div className="flex items-center py-1">
          <label htmlFor="playing" className="pr-1">
            Playing
          </label>
          <input
            type="radio"
            id="playing"
            value="Playing"
            name="videogame_status"
            ref={statusPlayingRef}
            onChange={statusChangeHandler}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
          ></input>
        </div>
        <div className="flex items-center py-1">
          <label htmlFor="want" className="pr-1">
            Want to Play
          </label>
          <input
            type="radio"
            id="want"
            value="Want to Play"
            ref={statusWantRef}
            name="videogame_status"
            onChange={statusChangeHandler}
            className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
          ></input>
        </div>
        <div>
          <Button onClick={submitHandler} type={'submit'}>
            Add
          </Button>
          {!isValid && <span className="px-4 text-red-600">Invalid input</span>}
        </div>
      </form>
    </Card>
  );
};

export default NewVideogameForm;
