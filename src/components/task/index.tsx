import React from 'react';
import clsx from 'clsx';

import styles from './Task.module.scss';
import { TaskPropsType } from './types';

export const Task: React.FC<TaskPropsType> = ({
	title,
	taskId,
	completed,
	toggleTaskCompleted,
}) => {
	return (
		<div className={styles.task}>
			<input
				type="checkbox"
				checked={completed}
				className={styles.checkBox}
				onChange={() => toggleTaskCompleted(taskId)}
			/>
			{completed && <div className={styles.checkIcon}></div>}
			<span className={clsx(styles.taskTitle, completed && styles.checked)}>{title}</span>
		</div>
	);
};
