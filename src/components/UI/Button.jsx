const Button = (props) => {
    return (
        <button
            onClick={props.onClick}
            type={props.type | 'button'}
            className="rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
            {props.children}
        </button>
    );
};

export default Button;
