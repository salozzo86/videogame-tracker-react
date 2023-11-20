const Card = (props) => {
  return (
    <div className="relative m-2 flex w-72 flex-col rounded-lg bg-white text-center shadow-xl hover:shadow-2xl hover:shadow-blue-700">
      {props.children}
    </div>
  );
};

export default Card;
