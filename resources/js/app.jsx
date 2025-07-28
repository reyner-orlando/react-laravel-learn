import React from 'react';
import ReactDOM from 'react-dom/client';

function App() {
    return (
        <div>
            <p>Ini adalah bagian React yang interaktif</p>
        </div>
    );
}

const root = document.getElementById('app');
if (root) {
    ReactDOM.createRoot(root).render(<App />);
}
