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
		<div className={styles.todolist}>
			<span className={styles.title}>todos</span>
			<div className={styles.tasks}>
				<div className={styles.textField}>
					<input
						type="text"
						value={newTaskTitle}
						onChange={actions.changeNewTaskTitle}
						onKeyDown={actions.createTaskKeyboardHandler}
						placeholder="What's need to be done?"
					/>
					<button className={styles.button} onClick={actions.createTaskHandler}>
						+
					</button>
				</div>

				{/* здесь можно было бы сделать список li, но я не сделал это намеренно, т.к. делал
				плюс-минус по дизайну картинки в тз, и там сложно выделить какие-либо css свойства
				для списка, чтобы оборачивать таски в отдельный тег, да и семантика неважна, т.к. у
				нас CPA, а не SSR или SSG. Ну и не было пункта делать приложение для людей с
				ограниченными возможностями */}
				{filterTasks.map((task) => (
					<Task
						key={task.id}
						taskId={task.id}
						title={task.title}
						completed={task.completed}
						toggleTaskCompleted={toggleTaskCompleted!}
					/>
				))}

				<div className={styles.bottom}>
					<span className={styles.itemsCount}>
						{tasks.length} {tasks.length > 1 ? 'items' : 'item'} left
					</span>
					<div className={styles.buttonsFilter}>
						<FilterButton title={'All'} filter={'all'} />
						<FilterButton title={'Active'} filter={'active'} />
						<FilterButton title={'Completed'} filter={'completed'} />
					</div>
					<button onClick={() => clearCompletedTasks()}>Clear completed</button>
				</div>
			</div>
		</div>
	);
};
