import "./App.css";
import Header from "./components/Header";
import Videogames from "./components/Videogames";

function App() {
	return (
		<div className="flex flex-col">
			<Header />
			<Videogames />
		</div>
	);
}

export default App;
