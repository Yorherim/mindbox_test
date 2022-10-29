import { createContext, useState } from 'react';
import { nanoid } from 'nanoid';

import {
	AppContextActionsTypes,
	AppContextProviderPropsType,
	AppContextType,
	FilterType,
	TaskType,
} from './types';

export const AppContext = createContext<AppContextType>({
	tasks: [],
	filter: 'all',
	actions: {} as AppContextActionsTypes,
});

export const AppContextProvider: React.FC<AppContextProviderPropsType> = ({ children }) => {
	const [tasks, setTasks] = useState<TaskType[]>([
		{ id: nanoid(), title: 'hello', completed: false },
	]);
	const [filter, setFilter] = useState<FilterType>('all');

	const actions: AppContextActionsTypes = {
		createTask: (title: string) => {
			setTasks([...tasks, { id: nanoid(), title, completed: false }]);
		},

		changeFilter: (filter: FilterType) => setFilter(filter),

		toggleTaskCompleted: (taskId: string) => {
			setTasks(
				tasks.map((task) => (task.id === taskId ? { ...task, isDone: !task.completed } : task)),
			);
		},

		clearCompletedTasks: () => {
			setTasks(tasks.filter((task) => !task.completed));
		},
	};

	return <AppContext.Provider value={{ tasks, filter, actions }}>{children}</AppContext.Provider>;
};
