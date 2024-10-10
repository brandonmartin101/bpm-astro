import * as React from 'react';
import PlateOptionsInput from './PlateOptionsInput';
import PlateOptionsUnits from './PlateOptionsUnits';

const PlateOptions = () => {
	const targetWeight = {
		label: 'Target Weight',
		name: 'targetWeight',
		type: 'number',
		defaultValue: 200,
	};
	const barbellWeight = {
		label: 'Barbell Weight',
		name: 'barbellWeight',
		type: 'number',
		defaultValue: 45,
	};
	const collarWeight = {
		label: 'Collar Weight',
		name: 'collarWeight',
		type: 'number',
		defaultValue: 0,
	};

	return (
		<div className='plate-options'>
			<PlateOptionsInput
				label={targetWeight.label}
				name={targetWeight.name}
				type={targetWeight.type}
				defaultValue={targetWeight.defaultValue}
			/>
			<PlateOptionsInput
				label={barbellWeight.label}
				name={barbellWeight.name}
				type={barbellWeight.type}
				defaultValue={barbellWeight.defaultValue}
			/>
			<PlateOptionsInput
				label={collarWeight.label}
				name={collarWeight.name}
				type={collarWeight.type}
				defaultValue={collarWeight.defaultValue}
			/>
			{/* <PlateOptionsUnits /> */}
		</div>
	);
};

export default PlateOptions;
