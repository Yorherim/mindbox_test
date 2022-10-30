import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../app/App';
import { AppContextProvider } from './app.context';

test('A new task should be added in todolist', () => {
	render(
		<AppContextProvider>
			<App />
		</AppContextProvider>,
	);

	const todolistInput = screen.getByTestId('todolist input');
	const addNewTaskBtn = screen.getByTestId('add a new task btn');

	expect(addNewTaskBtn).toBeInTheDocument();
	expect(todolistInput).toBeInTheDocument();
	expect(screen.getAllByTestId('task')).toHaveLength(1);
	expect(screen.getByText('hello')).toBeInTheDocument();
	expect(screen.queryByText('new task')).not.toBeInTheDocument();

	userEvent.type(todolistInput, 'new task');
	expect(todolistInput).toHaveValue('new task');

	userEvent.click(addNewTaskBtn);
	expect(todolistInput).toHaveValue('');

	expect(screen.getAllByTestId('task')).toHaveLength(2);
	expect(screen.getByText('hello')).toBeInTheDocument();
	expect(screen.getByText('new task')).toBeInTheDocument();
});

test('task should be hide/open when the user clicks checkbox (toggle)', () => {
	render(
		<AppContextProvider>
			<App />
		</AppContextProvider>,
	);

	const taskCheckbox = screen.getByTestId('checkbox task') as HTMLInputElement;
	expect(taskCheckbox).toBeInTheDocument();

	userEvent.click(taskCheckbox);
	expect(taskCheckbox.checked).toBeTruthy();

	userEvent.click(taskCheckbox);
	expect(taskCheckbox.checked).toBeFalsy();
});

describe('Filter should be change', () => {
	test('active class in filter buttons should be change when the filter changes', () => {
		render(
			<AppContextProvider>
				<App />
			</AppContextProvider>,
		);

		const filterAll = screen.getByTestId('filter all');
		const filterActive = screen.getByTestId('filter active');
		const filterCompleted = screen.getByTestId('filter completed');

		expect(filterAll).toHaveClass('active');

		userEvent.click(filterActive);

		expect(filterAll).not.toHaveClass('active');
		expect(filterActive).toHaveClass('active');

		userEvent.click(filterCompleted);

		expect(filterAll).not.toHaveClass('active');
		expect(filterActive).not.toHaveClass('active');
		expect(filterCompleted).toHaveClass('active');
	});

	test('tasks should be hide/open wheh the filter changes', () => {
		render(
			<AppContextProvider>
				<App />
			</AppContextProvider>,
		);

		const filterAll = screen.getByTestId('filter all');
		const filterActive = screen.getByTestId('filter active');
		const filterCompleted = screen.getByTestId('filter completed');

		// #############################################################
		// create new tasks for correct test filter (rigth now only 1 task in context state)
		const todolistInput = screen.getByTestId('todolist input');
		const addNewTaskBtn = screen.getByTestId('add a new task btn');

		expect(screen.getAllByTestId('task')).toHaveLength(1);

		userEvent.type(todolistInput, 'new task');
		userEvent.click(addNewTaskBtn);
		expect(screen.getAllByTestId('task')).toHaveLength(2);

		userEvent.type(todolistInput, 'new task 2');
		userEvent.click(addNewTaskBtn);
		expect(screen.getAllByTestId('task')).toHaveLength(3);
		// #############################################################

		// #############################################################
		// did one task completed for test
		const firstTaskCheckbox = screen.getAllByTestId('checkbox task')[0] as HTMLInputElement;
		expect(firstTaskCheckbox).toBeInTheDocument();

		userEvent.click(firstTaskCheckbox);
		expect(firstTaskCheckbox.checked).toBeTruthy();
		// #############################################################

		userEvent.click(filterActive);
		expect(screen.getAllByTestId('task')).toHaveLength(2);

		userEvent.click(filterCompleted);
		expect(screen.getAllByTestId('task')).toHaveLength(1);

		userEvent.click(filterAll);
		expect(screen.getAllByTestId('task')).toHaveLength(3);
	});
});

test('clear completed task(s) when the user clicks cleat completed button in todolist', () => {
	render(
		<AppContextProvider>
			<App />
		</AppContextProvider>,
	);

	const clearBtn = screen.getByTestId('clear button');
	expect(clearBtn).toBeInTheDocument();

	// #############################################################
	// create new tasks for correct test filter (rigth now only 1 task in context state)
	const todolistInput = screen.getByTestId('todolist input');
	const addNewTaskBtn = screen.getByTestId('add a new task btn');

	expect(screen.getAllByTestId('task')).toHaveLength(1);

	userEvent.type(todolistInput, 'new task');
	userEvent.click(addNewTaskBtn);
	expect(screen.getAllByTestId('task')).toHaveLength(2);

	userEvent.type(todolistInput, 'new task 2');
	userEvent.click(addNewTaskBtn);
	expect(screen.getAllByTestId('task')).toHaveLength(3);
	// #############################################################

	// #############################################################
	// did two tasks completed for test
	const firstTaskCheckbox = screen.getAllByTestId('checkbox task')[0] as HTMLInputElement;
	const secondTaskCheckbox = screen.getAllByTestId('checkbox task')[1] as HTMLInputElement;

	expect(firstTaskCheckbox).toBeInTheDocument();
	expect(secondTaskCheckbox).toBeInTheDocument();

	userEvent.click(firstTaskCheckbox);
	expect(firstTaskCheckbox.checked).toBeTruthy();

	userEvent.click(secondTaskCheckbox);
	expect(secondTaskCheckbox.checked).toBeTruthy();
	// #############################################################

	userEvent.click(clearBtn);
	expect(screen.getAllByTestId('task')).toHaveLength(1);
});
