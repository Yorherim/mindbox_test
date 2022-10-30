import React, { ChangeEvent, useContext, useState, KeyboardEvent } from 'react';

import { AppContext } from '../../context/app.context';
import { FilterButton } from '../filter-button';
import { Task } from '../task';

import styles from './Todolist.module.scss';

export const Todolist: React.FC = () => {
	const {
		tasks,
		filter,
		actions: { createTask, toggleTaskCompleted, clearCompletedTasks },
	} = useContext(AppContext);
	const [newTaskTitle, setNewTaskTitle] = useState<string>('');

	const actions = {
		/**
		 * change a new task title in input todolist
		 * @param e - e.currentTarget.value
		 */
		changeNewTaskTitle: (e: ChangeEvent<HTMLInputElement>) => {
			setNewTaskTitle(e.currentTarget.value);
		},

		/**
		 * create a new task, when click button **"+"** in todolist
		 *
		 * the new task title in todolist input can't be empty (handler will not working)
		 */
		createTaskHandler: () => {
			if (!!newTaskTitle.trim()) {
				createTask!(newTaskTitle);
				setNewTaskTitle('');
			}
		},

		/**
		 * create a new task, when press **"Enter"** on keyboard
		 *
		 * the new task title in todolist input can't be empty (handler will not working)
		 */
		createTaskKeyboardHandler: (e: KeyboardEvent<HTMLInputElement>) => {
			if (e.key === 'Enter') actions.createTaskHandler();
		},
	};

	/**
	 * filtering tasks depending on the filter
	 */
	const filterTasks =
		filter === 'all'
			? tasks
			: filter === 'active'
			? tasks.filter((task) => !task.completed)
			: tasks.filter((task) => task.completed);

	return (
		<div className={styles.todolist} data-testid="todolist">
			<span className={styles.title} data-testid="todolist title">
				todos
			</span>
			<div className={styles.tasks}>
				<div className={styles.textField}>
					<input
						type="text"
						value={newTaskTitle}
						onChange={actions.changeNewTaskTitle}
						onKeyDown={actions.createTaskKeyboardHandler}
						placeholder="What's need to be done?"
						data-testid="todolist input"
					/>
					<button
						className={styles.button}
						onClick={actions.createTaskHandler}
						data-testid="add a new task btn"
					>
						+
					</button>
				</div>

				{filterTasks.map((task) => (
					<Task
						key={task.id}
						taskId={task.id}
						title={task.title}
						completed={task.completed}
						toggleTaskCompleted={toggleTaskCompleted}
					/>
				))}

				<div className={styles.bottom}>
					<span className={styles.itemsCount}>
						{tasks.length} {tasks.length > 1 ? 'items' : 'item'} left
					</span>
					<div className={styles.buttonsFilter}>
						<FilterButton title={'All'} filter={'all'} dataTestId="filter all" />
						<FilterButton title={'Active'} filter={'active'} dataTestId="filter active" />
						<FilterButton title={'Completed'} filter={'completed'} dataTestId="filter completed" />
					</div>
					<button onClick={() => clearCompletedTasks()} data-testid="clear button">
						Clear completed
					</button>
				</div>
			</div>
		</div>
	);
};
