import clsx from 'clsx';
import React, { useContext } from 'react';

import { AppContext } from '../../context/app.context';
import styles from './FilterButton.module.scss';
import { FilterButtonPropsType } from './types';

/**
 * filter button in todolist
 * @component
 */
export const FilterButton: React.FC<FilterButtonPropsType> = ({ title, filter }) => {
	const {
		filter: currentFilter,
		actions: { changeFilter },
	} = useContext(AppContext);

	return (
		<button
			className={clsx(currentFilter === filter && styles.active)}
			onClick={() => changeFilter(filter)}
		>
			{title}
		</button>
	);
};
