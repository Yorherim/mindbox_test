import { ReactNode } from 'react';

export type TaskType = {
	id: string;
	title: string;
	completed: boolean;
};

export type FilterType = 'all' | 'active' | 'completed';

export type AppContextActionsTypes = {
	/**
	 * create a new task
	 * @param title - a title for task
	 */
	createTask: (title: string) => void;

	/**
	 * change the task filter
	 * @param filter - a new filter for task: **all**, **active** or **completed**
	 */
	changeFilter: (filter: FilterType) => void;

	/**
	 * toggle complete task (set task active or completed)
	 * @param taskId
	 */
	toggleTaskCompleted: (taskId: string) => void;

	/**
	 * delete completed tasks from todolist
	 */
	clearCompletedTasks: () => void;
};

export type AppContextType = {
	tasks: TaskType[];
	filter: FilterType;
	actions: AppContextActionsTypes;
};

export type AppContextProviderPropsType = {
	children: ReactNode;
};
