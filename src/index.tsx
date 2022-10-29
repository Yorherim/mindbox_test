import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import { AppContextProvider } from './context/app.context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<AppContextProvider>
		<App />
	</AppContextProvider>,
);
