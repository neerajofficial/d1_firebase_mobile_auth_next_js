function Button({ text, type, className, onClick, ...rest }) {
	return (
		<button
			className={`bg-blue-500 px-4 py-1 text-white rounded-md text-lg font-semibold hover:shadow-md uppercase ${className}`}
			type={type}
			onClick={onClick}
			{...rest}
		>
			{text}
		</button>
	);
}

export default Button;
