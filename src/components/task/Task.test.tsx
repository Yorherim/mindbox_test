import { Task } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const toggleTaskCompleted = jest.fn();

test('Task should be render', () => {
	render(
		<Task
			completed={false}
			taskId="1"
			title="test task"
			toggleTaskCompleted={toggleTaskCompleted}
		/>,
	);

	const task = screen.getByTestId('task');
	const checkboxTask = screen.getByTestId('checkbox task') as HTMLInputElement;

	expect(task).toBeInTheDocument();
	expect(screen.getByText('test task')).toBeDefined();
	expect(checkboxTask).toBeInTheDocument();
});

test('Completed Task should be render with completed task icon', () => {
	render(
		<Task
			completed={true}
			taskId="1"
			title="test task"
			toggleTaskCompleted={toggleTaskCompleted}
		/>,
	);

	const task = screen.getByTestId('task');
	const checkboxTask = screen.getByTestId('checkbox task');
	const completedTaskIcon = screen.getByTestId('completed task icon');

	expect(task).toBeInTheDocument();
	expect(screen.getByText('test task')).toBeDefined();
	expect(checkboxTask).toBeInTheDocument();
	expect(completedTaskIcon).toBeInTheDocument();
});

test(`Checkbox in Task, when the user clicks it, 
	should be call the toggleTaskCompleted function`, () => {
	render(
		<Task
			completed={true}
			taskId="1"
			title="test task"
			toggleTaskCompleted={toggleTaskCompleted}
		/>,
	);

	const checkboxTask = screen.getByTestId('checkbox task');

	expect(checkboxTask).toBeInTheDocument();

	userEvent.click(checkboxTask);
	expect(toggleTaskCompleted).toBeCalledTimes(1);
	userEvent.click(checkboxTask);
	expect(toggleTaskCompleted).toBeCalledTimes(2);
});
