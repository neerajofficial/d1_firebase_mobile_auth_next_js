function TextInput({label, value, onChange }) {
	return (
		<div className="text-lg flex flex-row gap-x-6">
			<label htmlFor={label} className="w-1/3">{label}</label>
			<input 
				className="w-full text-black block h-10 w-full border border-slate-300 rounded-sm py-2 px-4 shadow-sm focus:outline-none focus:border-primary-300 sm:text-sm" 
				type="text" 
				id={label}
				value={value} 
				onChange={onChange} 
			/>
		</div>
	)
}

export default TextInput