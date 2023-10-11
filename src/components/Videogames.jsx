import { useState } from 'react';
import NewVideogame from './NewVideogame';
import VideogameItem from './VideogameItem';
import Card from './UI/Card';

const Videogames = () => {
    const [addedVideogames, setAddedVideogames] = useState([]);
    const addedVideogamesHandler = (addedVideogameData) => {
        setAddedVideogames((prevState) => {
            return [addedVideogameData, ...prevState];
        });
    };
    const videogamesList = addedVideogames.map((item) => (
        <VideogameItem key={item.id} name={item.name} status={item.status} />
    ));

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="py-10">
                <NewVideogame onAddedVideogames={addedVideogamesHandler} />
            </div>
            <section>
                <ul>{videogamesList}</ul>
            </section>
        </div>
    );
};

export default Videogames;
