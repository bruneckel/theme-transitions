import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@bruneckel/theme-transitions-core/style.css';
import './assets/main.css';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div>react-demo scaffold</div>
	</StrictMode>,
);
