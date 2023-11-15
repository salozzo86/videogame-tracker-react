const Card = (props) => {
  return (
    <div className="relative m-2 flex w-72 flex-col rounded-lg bg-white text-center shadow-xl">
      {props.children}
    </div>
  );
};

export default Card;
