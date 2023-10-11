import Card from "./UI/Card";

const VideogameItem = (props) => {
	return (
		<Card>
			<h4>{props.name}</h4>
			<p>{props.status}</p>
		</Card>
	);
};

export default VideogameItem;
