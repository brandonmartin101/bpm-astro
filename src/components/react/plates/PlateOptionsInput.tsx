import React, { createContext, useState } from 'react';

type PlateOptionsInputProps = {
	label: string;
	name: string;
	type: string;
	defaultValue?: number;
};

const PlateOptionsInput = (props: PlateOptionsInputProps) => {
	const { label, name, type, defaultValue } = props;

	const PlateOptionsContext = createContext(defaultValue);

	// const [value, setValue] = useState(defaultValue ?? 0);
	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	setValue(Number(event.target.value));
	// };

	return (
		<div className='plate-option'>
			<label className='plate-options-input-label' htmlFor={name}>
				{label}:
			</label>
			{/* <input className='plate-options-input' type={type} id={name} name={name} value={value} onChange={handleChange} /> */}
			<input className='plate-options-input' type={type} id={name} name={name} value={defaultValue} />
		</div>
	);
};

export default PlateOptionsInput;
