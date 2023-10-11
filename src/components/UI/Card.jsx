const Card = (props) => {
	return (
		<div className="m-10 px-15 py-3 rounded-lg bg-white shadow-xl w-64 text-center">
			{props.children}
		</div>
	);
};

export default Card;
