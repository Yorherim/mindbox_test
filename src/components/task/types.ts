export type TaskPropsType = {
	taskId: string;
	title: string;
	completed: boolean;
	toggleTaskCompleted: (taskId: string) => void;
};
