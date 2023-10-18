import { useRef, useState } from 'react';
import Button from './UI/Button';

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
    const enteredName = nameRef.current.value;
    const enteredStatus = statusPlayedRef.current.checked
      ? 'Played'
      : statusPlayingRef.current.checked
      ? 'Playing'
      : statusWantRef.current.checked
      ? 'Want to Play'
      : '';
    if (enteredName === '' || enteredStatus === '') {
      setIsValid(false);
      return;
    }
    const inputData = {
      name: enteredName,
      status: enteredStatus,
      id: Math.floor(Math.random() * 10000),
    };
    props.onFormSubmit(inputData);
    nameRef.current.value = '';
    statusPlayedRef.current.checked = '';
    statusPlayingRef.current.checked = '';
    statusWantRef.current.checked = '';
  };

  return (
    <form>
      <div>
        <label>Videogame Name: </label>
        <input
          className="rounded-md pl-1"
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
  );
};

export default NewVideogameForm;
