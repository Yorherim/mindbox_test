import { Todolist } from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('Todolist should be render', () => {
	render(<Todolist />);

	const todolist = screen.getByTestId('todolist');

	expect(todolist).toBeInTheDocument();
	expect(screen.getByText('todos')).toBeDefined();
});

test('Input in Todolist should be changed when user prints', () => {
	render(<Todolist />);

	const todolistInput = screen.getByTestId('todolist input');

	expect(todolistInput).toBeInTheDocument();
	expect(todolistInput).toHaveAttribute('type', 'text');
	expect(todolistInput).toHaveValue('');

	userEvent.type(todolistInput, 'hello there');
	expect(todolistInput).toHaveValue('hello there');
});

test('filter buttons should be render', () => {
	render(<Todolist />);

	const filterAll = screen.getByTestId('filter all');
	const filterActive = screen.getByTestId('filter active');
	const filterCompleted = screen.getByTestId('filter completed');

	expect(filterAll).toBeInTheDocument();
	expect(filterActive).toBeInTheDocument();
	expect(filterCompleted).toBeInTheDocument();
});

test('clear completed button should be render', () => {
	render(<Todolist />);

	const clearButton = screen.getByTestId('clear button');
	expect(clearButton).toBeInTheDocument();
});
