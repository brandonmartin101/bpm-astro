import AvailablePlates from './AvailablePlates';
import PlateOptions from './PlateOptions';
import PlatesCalculate from './PlatesCalculate';
import PlatesResult from './PlatesResult';
import * as React from 'react';

export const PlatesCalculator = () => {
	return (
		<div className='plates-calculator'>
			<PlateOptions />
			{/* <AvailablePlates /> */}
			<PlatesCalculate />
			<PlatesResult />
		</div>
	);
};
