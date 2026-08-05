import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@brustack/theme-transitions-core/style.css';
import './assets/main.css';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
