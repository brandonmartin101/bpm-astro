import * as React from 'react';

type PlateProps = {
	weight: number;
};

const Plate: React.FC<PlateProps> = (props) => {
	const { weight } = props;

	return <div className='plate'>Plate - {weight} lbs</div>;
};

export default Plate;
