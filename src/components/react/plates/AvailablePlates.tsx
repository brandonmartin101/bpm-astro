import * as React from 'react';
import Plate from './Plate';

const AvailablePlates = () => {
	const plateWeights = [45, 25, 10, 5, 2.5, 1.25];
	return (
		<div className='available-plates'>
			{plateWeights.map((weight, index) => (
				<Plate key={index} weight={weight} />
			))}
		</div>
	);
};

export default AvailablePlates;
