import NewVideogameForm from "./NewVideogameForm";

const NewVideogame = (props) => {
	const videogameDataHandler = (videogameData) => {
		props.onAddedVideogames(videogameData);
	};

	return (
		<>
			<NewVideogameForm onFormSubmit={videogameDataHandler}></NewVideogameForm>
		</>
	);
};

export default NewVideogame;
