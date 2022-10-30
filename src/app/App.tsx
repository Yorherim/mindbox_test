import React from 'react';
import { Todolist } from '../components';

import styles from './App.module.scss';

export const App: React.FC = () => {
	return (
		<div className={styles.app}>
			<div className={styles.todolists}>
				<Todolist />
			</div>
		</div>
	);
};

export default App;
